import { render, screen } from "~/tests/testing-library";
import { ValueItem } from "./value-item";
import React from "react";
import { Typography } from "@mui/material";

describe("ValueItem", () => {
  const renderComponent = () => {
    render(
      <ValueItem>
        <Typography>test content</Typography>
      </ValueItem>,
    );
  };

  it("should render the children", () => {
    renderComponent();

    expect(screen.getByText(/test content/i)).toBeVisible();
  });
});
