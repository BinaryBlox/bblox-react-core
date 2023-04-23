import React from "react";
import { render, screen } from "~/tests/testing-library";
import { ValueText } from "./value-text";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const DummyValue = "Lorem ipsum sit amet";

describe("ValueText", () => {
  const renderComponent = ({
    value,
    placeholder,
    editable,
  }: {
    value?: string | number;
    placeholder?: string;
    editable?: boolean;
  }) => {
    const onEdit = vi.fn();
    render(
      <ValueText
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
    renderComponent({ value: DummyValue });

    expect(screen.getByRole("label", { name: /hello world/i })).toBeInTheDocument();
  });

  it("would render the value", () => {
    renderComponent({ value: DummyValue });

    expect(screen.getByText(/lorem ipsum sit amet/i)).toBeInTheDocument();
  });

  it("would render the value if is a number", () => {
    renderComponent({ value: 1000 });

    expect(screen.getByText(/1000/i)).toBeInTheDocument();
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

      expect(screen.getByRole("textbox")).toHaveValue(DummyValue);
    });

    it("should submit the new value if is edited", async () => {
      const { onEdit } = renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      await userEvent.clear(screen.getByRole("textbox"));
      await userEvent.type(screen.getByRole("textbox"), "new value");
      await userEvent.click(screen.getByTestId("CheckIcon"));

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith("new value");
    });

    it("should not call onEdit if the edition is cancelled", async () => {
      const { onEdit } = renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      await userEvent.clear(screen.getByRole("textbox"));
      await userEvent.type(screen.getByRole("textbox"), "new value");
      await userEvent.click(screen.getByTestId("ClearIcon"));

      expect(onEdit).not.toHaveBeenCalled();
    });

    it("should have the original value if is edited again after clear a change", async () => {
      renderComponent({ value: DummyValue, editable: true });

      await userEvent.click(screen.getByTestId("EditIcon"));
      await userEvent.clear(screen.getByRole("textbox"));
      await userEvent.type(screen.getByRole("textbox"), "new value");
      await userEvent.click(screen.getByTestId("ClearIcon"));
      await userEvent.click(screen.getByTestId("EditIcon"));

      expect(screen.getByRole("textbox")).toHaveValue(DummyValue);
    });
  });
});
