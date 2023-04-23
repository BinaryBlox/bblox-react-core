import React from "react";
import { ValueBoolean } from "./value-boolean";
import { render, screen } from "~/tests/testing-library";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("ValueBoolean", () => {
  const renderComponent = ({
    value,
    placeholder,
    editable,
  }: {
    value?: boolean;
    placeholder?: string;
    editable?: boolean;
  }) => {
    const onEdit = vi.fn();
    render(
      <ValueBoolean
        label="Hello world"
        value={value}
        placeholder={placeholder}
        editable={editable}
        onEdit={onEdit}
      />,
    );
    return { onEdit };
  };

  it("would render the label", () => {
    renderComponent({ value: true });

    expect(screen.getByRole("label", { name: /hello world/i })).toBeInTheDocument();
  });

  it("would render a check if value is true", () => {
    renderComponent({ value: true });

    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
  });

  it("would render a cross if value is false", () => {
    renderComponent({ value: false });

    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
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
      renderComponent({ value: true, editable: false });

      expect(screen.queryByTestId("EditIcon")).not.toBeInTheDocument();
    });

    it("should render an option to edit if editable is true", () => {
      renderComponent({ value: true, editable: true });

      expect(screen.getByTestId("EditIcon")).toBeVisible();
    });

    it("should render an input with the value if the edit button is clicked", async () => {
      renderComponent({ value: true, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));

      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it.each([
      [true, false],
      [false, true],
    ])(
      "should submit %s if is edited and the initial value is %s",
      async (expectedValue: boolean, initialValue: boolean) => {
        const { onEdit } = renderComponent({ value: initialValue, editable: true });

        await userEvent.click(screen.getByTestId("EditIcon"));
        await userEvent.click(screen.getByRole("checkbox"));
        await userEvent.click(screen.getByTestId("CheckIcon"));

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith(expectedValue);
      },
    );

    it("should not call onEdit if the edition is cancelled", async () => {
      const { onEdit } = renderComponent({ value: true, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByTestId("ClearIcon"));

      expect(onEdit).not.toHaveBeenCalled();
    });

    it("should have the original value if is edited again after clear a change", async () => {
      renderComponent({ value: true, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByTestId("ClearIcon"));
      await userEvent.click(screen.getByTestId("EditIcon"));

      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });
});
