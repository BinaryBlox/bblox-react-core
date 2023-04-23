import React from "react";
import { Typography } from "@mui/material";
import { render, screen } from "~/tests/testing-library";
import { ValueContent } from "./value-content";
import userEvent from "@testing-library/user-event";

describe("ValueContent", () => {
  const renderComponent = ({ tooltip }: { tooltip?: string } = {}) => {
    render(
      <ValueContent label="lorem ipsum" tooltip={tooltip} tooltipEnterDelay={0}>
        <Typography>Test content</Typography>
      </ValueContent>,
    );
  };

  it("should render a label", () => {
    renderComponent();

    expect(screen.getByRole("label", { name: /lorem ipsum/i })).toBeInTheDocument();
  });

  describe("tooltip", () => {
    it("should render a tooltip if is defined and the user hovers the value", async () => {
      renderComponent({ tooltip: "dolor sit amet" });

      await userEvent.hover(screen.getByText(/test content/i));

      expect(await screen.findByRole("tooltip", { name: /dolor sit amet/i })).toBeInTheDocument();
    });

    it("shouldn't render a tooltip if it's not defined", () => {
      renderComponent({ tooltip: undefined });

      expect(screen.queryByRole("tooltip", { name: /dolor sit amet/i })).not.toBeInTheDocument();
    });
  });

  describe("children", () => {
    it("should render the children if tooltip is defined", () => {
      renderComponent({ tooltip: "dolor sit amet" });

      expect(screen.getByText(/test content/i)).toBeInTheDocument();
    });
    it("should render the children if tooltip is undefined", () => {
      renderComponent({ tooltip: undefined });

      expect(screen.getByText(/test content/i)).toBeInTheDocument();
    });
  });
});
