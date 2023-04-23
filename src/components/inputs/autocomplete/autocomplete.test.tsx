import { render, screen } from "~/tests/testing-library";
import { Autocomplete } from "./autocomplete";
import { faker } from "@faker-js/faker";
import React from "react";
import { selectOption } from "~/tests/actions";
import userEvents from "@testing-library/user-event";
import { expectProgressIndicator } from "~/tests/assertions";
import { vi } from "vitest";

const options: string[] = faker.definitions.vehicle?.model || [];

describe("Autocomplete", () => {
  const renderComponent = ({
    value,
    loading,
    fetching,
  }: { value?: string; loading?: boolean; fetching?: boolean } = {}) => {
    const onChangeValue = vi.fn();
    render(
      <Autocomplete
        label="Car model"
        loading={loading}
        fetching={fetching}
        value={value}
        options={options}
        onChangeValue={onChangeValue}
      />,
    );

    return { onChangeValue };
  };

  it("should render a label", () => {
    renderComponent();

    expect(screen.getByRole("combobox", { name: /car model/i })).toBeVisible();
  });

  it("should render the value if is defined", () => {
    const value = options[3];
    renderComponent({ value });

    expect(screen.getByRole("combobox")).toHaveValue(value);
  });

  it("should call onChange when the selected value changes", async () => {
    const { onChangeValue } = renderComponent();

    await selectOption(screen.getByRole("combobox"), "Model T");

    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith("Model T");
  });

  it("should filter the options if the user enters a search", async () => {
    renderComponent();

    await userEvents.type(screen.getByRole("combobox"), "Rang");

    expect(screen.getByRole("option", { name: "Durango" })).toBeVisible();
    expect(screen.getByRole("option", { name: "Wrangler" })).toBeVisible();
  });

  it("should render a loading indicator if is fetching", () => {
    renderComponent({ loading: true });

    expectProgressIndicator();
  });

  it("should render a loading indicator if is loading", () => {
    renderComponent({ fetching: true });

    expectProgressIndicator();
  });
});
