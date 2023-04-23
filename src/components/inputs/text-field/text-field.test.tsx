import { render, screen } from "~/tests/testing-library";
import { TextField } from "./text-field";
import { faker } from "@faker-js/faker";
import React from "react";
import userEvent from "@testing-library/user-event";
import { expectProgressIndicator } from "~/tests/assertions";
import { vi } from "vitest";

const options: string[] = faker.definitions.vehicle?.model || [];

describe("TextField", () => {
  const renderComponent = ({
    value,
    loading,
    fetching,
  }: { value?: string; loading?: boolean; fetching?: boolean } = {}) => {
    const onChange = vi.fn();
    render(
      <TextField
        label="Car model"
        loading={loading}
        fetching={fetching}
        value={value}
        onChange={onChange}
      />,
    );

    return { onChange };
  };

  it("should render a label", () => {
    renderComponent();

    expect(screen.getByRole("textbox", { name: /car model/i })).toBeVisible();
  });

  it("should render the value if is defined", () => {
    const value = options[3];
    renderComponent({ value });

    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("should call onChange when we type something", async () => {
    const { onChange } = renderComponent();

    await userEvent.type(screen.getByRole("textbox"), "Model T");

    expect(onChange).toHaveBeenCalledTimes(7);
    expect(onChange.mock.calls[6][0].target.value).toBe("Model T");
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
