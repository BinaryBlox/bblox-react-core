import React from "react";
import { HeaderLayout } from "./header-layout";
import { render, screen } from "~/tests/testing-library";
import { Content, Header } from "../../components";
import { Typography } from "@mui/material";

describe("HeaderLayout", () => {
  const renderComponent = () => {
    return render(
      <HeaderLayout>
        <Header title="Lorem ipsum" subtitle="Dolor sit amet" />
        <Content>
          <Typography>Test content</Typography>
        </Content>
      </HeaderLayout>,
    );
  };

  it("would render the header", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 1, name: /lorem ipsum/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /dolor sit amet/i })).toBeInTheDocument();
  });

  it("would render a main element", () => {
    renderComponent();

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("would render the content", () => {
    renderComponent();

    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});
