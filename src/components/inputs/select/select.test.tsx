import React from "react";
import { SelectLoaded } from "./select.stories";
import { render, screen } from "~/tests/testing-library";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";
import { MenuItem } from "@mui/material";

describe("Select", () => {
  const renderComponent = ({
    label = SelectLoaded.args?.label || "invalid",
    loading = false,
    fetching = false,
  } = {}) => {
    const options = (SelectLoaded.args?.options as string[]) || [];
    const value = SelectLoaded.args?.value as string;

    render(
      <Select value={value} label={label} loading={loading} fetching={fetching}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>,
    );

    return {
      options,
      value,
    };
  };

  it("would render a select with a label", () => {
    renderComponent({ label: "Lorem ipsum" });

    expect(screen.getByRole("button", { name: /lorem ipsum/i })).toBeInTheDocument();
  });

  it("would render the value", () => {
    const { value } = renderComponent();

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  describe("when is loading", () => {
    it("would render a progress indicator", () => {
      renderComponent({ loading: true });

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("would render the value", () => {
      const { value } = renderComponent({ loading: true });

      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  describe("when is fetching", () => {
    it("would render a progress indicator", () => {
      renderComponent({ fetching: true });

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("wouldn't render the value", () => {
      const { value } = renderComponent({ fetching: true });

      expect(screen.queryByText(value)).not.toBeInTheDocument();
    });
  });

  describe("when is fetching and loading", () => {
    it("would render a progress indicator", () => {
      renderComponent({ fetching: true, loading: true });

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("wouldn't render the value", () => {
      const { value } = renderComponent({ fetching: true, loading: true });

      expect(screen.queryByText(value)).not.toBeInTheDocument();
    });
  });

  it("would render a menu item for each option", async () => {
    const { options } = renderComponent({ label: "Lorem ipsum" });

    await userEvent.click(screen.getByRole("button", { name: /lorem ipsum/i }));

    options.forEach((option) => {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    });
  });
});
