import React from "react";
import { ModelForm } from "./model-form";
import { render, screen } from "~/tests/testing-library";
import {
  BirthDateFormat,
  createModelInstance,
  MockInstance,
  mockModel,
  ReturnTimeFormat,
  TradeDateFormat,
} from "../generators.mock";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { selectOption, typeNumericInput, pickDatetime, selectOptions } from "~/tests/actions";
import {
  expectModelFieldInputExist,
  expectModelFieldInputValue,
  expectToHaveBeenCalledOnceWithMockInstance,
} from "~/tests/assertions";

describe("ModelForm", () => {
  const renderComponent = ({
    initialValues = undefined,
  }: { initialValues?: MockInstance } = {}) => {
    const onSubmit = vi.fn();
    const instance = render(
      <ModelForm
        model={mockModel}
        initialValues={initialValues}
        saveButtonText="save"
        onSubmit={onSubmit}
      />,
    );

    return { ...instance, onSubmit };
  };

  it("would render a button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("would render an input for each model", () => {
    renderComponent();

    expectModelFieldInputExist(mockModel.fields);
  });

  it("would render the initial value if initialValues is provided", () => {
    const initialValues = createModelInstance<MockInstance>(mockModel);
    renderComponent({ initialValues });

    expectModelFieldInputValue(mockModel.fields, initialValues);
  });

  it("would call onSubmit if I fullfill all inputs and press the submit button", async () => {
    const { onSubmit } = renderComponent();
    const birthDate = new Date(2047, 11, 26);
    const returnTime = new Date(1970, 0, 1, 10, 12);
    const tradeDate = new Date(2047, 11, 26, 12, 50);

    await userEvent.type(screen.getByRole("textbox", { name: "Id" }), "Id-1");
    await userEvent.type(screen.getByRole("textbox", { name: /first name/i }), "Karianne");
    await userEvent.type(screen.getByRole("textbox", { name: /middle name/i }), "Noah");
    await userEvent.type(screen.getByRole("textbox", { name: /last name/i }), "Gorczany");
    await selectOption(screen.getByRole("button", { name: /gender/i }), "Cis man");
    typeNumericInput(screen.getByRole("spinbutton", { name: /age/i }), 37);
    pickDatetime(screen.getByRole("textbox", { name: /birth date/i }), birthDate, BirthDateFormat);
    await selectOption(screen.getByRole("button", { name: /model/i }), "Spyder");
    await selectOption(screen.getByRole("button", { name: /manufacturer/i }), "Bugatti");
    await userEvent.type(screen.getByRole("textbox", { name: /color/i }), "red");
    await selectOptions(screen.getByRole("button", { name: /type/i }), [
      "Coupe",
      "Hatchback",
      "Minivan",
    ]);
    await userEvent.type(screen.getByRole("textbox", { name: /vin/i }), "46N6UE4VJ2XL28828");
    await userEvent.type(screen.getByRole("textbox", { name: /vrm/i }), "NE51AFH");
    pickDatetime(
      screen.getByRole("textbox", { name: /return time/i }),
      returnTime,
      ReturnTimeFormat,
    );
    typeNumericInput(screen.getByRole("spinbutton", { name: /q/i }), 9);
    await userEvent.click(screen.getByRole("checkbox", { name: /available/i }));
    await userEvent.type(screen.getByRole("textbox", { name: /currency/i }), "mxn");
    pickDatetime(screen.getByRole("textbox", { name: /trade date/i }), tradeDate, TradeDateFormat);
    await userEvent.type(screen.getByRole("textbox", { name: /codes/i }), "foo,bar");
    await userEvent.type(screen.getByRole("textbox", { name: /identifiers/i }), "1,2,3");

    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expectToHaveBeenCalledOnceWithMockInstance(onSubmit, {
      id: "Id-1",
      firstName: "Karianne",
      middleName: "Noah",
      lastName: "Gorczany",
      gender: "Cis man",
      age: 37,
      birthDate,
      car: {
        model: "Spyder",
        manufacturer: "Bugatti",
        color: "red",
        type: ["Coupe", "Hatchback", "Minivan"],
        vin: "46N6UE4VJ2XL28828",
        vrm: "NE51AFH",
        returnTime,
      },
      quantity: 9,
      available: true,
      currency: "mxn",
      tradeDate,
      codes: ["foo", "bar"],
      identifiers: ["1", "2", "3"],
    });
  });
});
