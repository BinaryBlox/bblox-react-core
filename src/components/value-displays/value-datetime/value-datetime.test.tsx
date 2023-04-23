import React from "react";
import { render, screen } from "~/tests/testing-library";
import { EditInputType, ValueDatetime } from "./value-datetime";
import userEvent from "@testing-library/user-event";
import { pickDatetime } from "~/tests/actions";
import { assertDatetimeInputValue } from "~/tests/assertions";
import { vi } from "vitest";

const DummyValue = new Date(2022, 7, 10, 0, 0);
const NewValue = new Date(2021, 8, 9, 11, 21);
const NewDateValue = new Date(2018, 2, 17);
const NewTimeValue = new Date(2021, 8, 9, 11, 21);
const datetimeFormat = "dd-MM-yyyy HH:mm";
const dateFormat = "dd-MM-yyyy";
const timeFormat = "HH:mm";

describe("ValueDatetime", () => {
  const renderComponent = ({
    value,
    placeholder,
    editable,
    fmt = datetimeFormat,
    editInputType = "datetime",
  }: {
    value?: Date;
    placeholder?: string;
    editable?: boolean;
    fmt?: string;
    editInputType?: EditInputType;
  }) => {
    const onEdit = vi.fn();
    render(
      <ValueDatetime
        label="Hello world"
        value={value}
        placeholder={placeholder}
        format={fmt}
        editable={editable}
        editInputType={editInputType}
        onEdit={onEdit}
      />,
    );
    return { onEdit };
  };

  it("would render the label", () => {
    renderComponent({ value: DummyValue });

    expect(screen.getByRole("label", { name: /hello world/i })).toBeInTheDocument();
  });

  it("would render the value", () => {
    renderComponent({ value: DummyValue });

    expect(screen.getByText(/10-08-2022/i)).toBeInTheDocument();
  });

  it("should render the placeholder if value is undefined", () => {
    renderComponent({ value: undefined });

    expect(screen.getByText(/-/i)).toBeInTheDocument();
  });

  it("should render the custom placeholder if value is undefined and placeholder has value", () => {
    renderComponent({ value: undefined, placeholder: "_" });

    expect(screen.getByText(/_/i)).toBeInTheDocument();
  });

  describe("editable", () => {
    it("shouldn't render an option to edit if editable is false", () => {
      renderComponent({ value: DummyValue, editable: false });

      expect(screen.queryByTestId("EditIcon")).not.toBeInTheDocument();
    });

    it("should render an option to edit if editable is true", () => {
      renderComponent({ value: DummyValue, editable: true });

      expect(screen.getByTestId("EditIcon")).toBeVisible();
    });

    it("should render an input with the value if the edit button is clicked", async () => {
      renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));

      assertDatetimeInputValue(screen.getByRole("textbox"), {
        value: DummyValue,
        fmt: datetimeFormat,
      });
    });

    it.each([
      ["datetime" as EditInputType, NewValue, new Date(2021, 8, 9, 11, 21), datetimeFormat],
      ["date" as EditInputType, NewDateValue, new Date(2018, 2, 17), dateFormat],
      ["time" as EditInputType, NewTimeValue, new Date(2022, 7, 10, 11, 21), timeFormat],
    ])(
      "should submit the new value if is edited with type %s",
      async (editInputType: EditInputType, newValue: Date, expectedDate: Date, fmt: string) => {
        const { onEdit } = renderComponent({
          value: DummyValue,
          editable: true,
          editInputType,
          fmt,
        });

        await userEvent.click(screen.getByTestId("EditIcon"));
        pickDatetime(screen.getByRole("textbox"), newValue, fmt);
        await userEvent.click(screen.getByTestId("CheckIcon"));

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith(expectedDate);
      },
    );

    it("should not call onEdit if the edition is cancelled", async () => {
      const { onEdit } = renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      pickDatetime(screen.getByRole("textbox"), NewValue, datetimeFormat);
      await userEvent.click(screen.getByTestId("ClearIcon"));

      expect(onEdit).not.toHaveBeenCalled();
    });

    it("should have the original value if is edited again after clear a change", async () => {
      renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      pickDatetime(screen.getByRole("textbox"), NewValue, datetimeFormat);
      await userEvent.click(screen.getByTestId("ClearIcon"));
      await userEvent.click(screen.getByTestId("EditIcon"));

      assertDatetimeInputValue(screen.getByRole("textbox"), {
        value: DummyValue,
        fmt: datetimeFormat,
      });
    });
  });
});
