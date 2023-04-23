import React from "react";
import { render, screen } from "~/tests/testing-library";
import { DrawerAppBar } from "./drawer-app-bar";
import { DrawerProvider, useDrawer } from "../drawer-provider";
import { DrawerState, DrawerVariant } from "~/components/drawers";
import { Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";

describe("DrawerAppBar", () => {
  const renderComponent = ({
    title,
    initialState,
    variant = "temporary",
  }: {
    title?: string;
    initialState?: DrawerState;
    variant?: DrawerVariant;
  } = {}) => {
    const TestContent = () => {
      const { state } = useDrawer();
      return <Typography>state: {state}</Typography>;
    };
    render(
      <DrawerProvider initialState={initialState} variant={variant}>
        <DrawerAppBar title={title}>
          <Typography>test content</Typography>
        </DrawerAppBar>
        <TestContent />
      </DrawerProvider>,
    );
  };

  describe("menu button", () => {
    it.each([
      ["temporary" as DrawerVariant, "open" as DrawerState],
      ["temporary" as DrawerVariant, "close" as DrawerState],
      ["persistent" as DrawerVariant, "open" as DrawerState],
      ["persistent" as DrawerVariant, "close" as DrawerState],
      ["mini" as DrawerVariant, "collapse" as DrawerState],
    ])("should render a menu button if variant is %s", (variant, initialState) => {
      renderComponent({ variant, initialState });

      expect(screen.getByRole("button", { name: /open drawer/i })).toBeVisible();
    });

    it("should switch the drawer state if is clicked", async () => {
      renderComponent({ initialState: "open", variant: "temporary" });

      await userEvent.click(screen.getByTestId("MenuIcon"));

      expect(screen.getByText("state: close")).toBeVisible();
    });
  });

  it.each([
    ["clipped" as DrawerVariant, "open" as DrawerState],
    ["mini" as DrawerVariant, "open" as DrawerState],
  ])("should not render a menu button if variant is %s", (variant, initialState) => {
    renderComponent({ variant, initialState });

    expect(screen.queryByRole("button", { name: /open drawer/i })).not.toBeInTheDocument();
  });

  it("should render the children", () => {
    renderComponent();

    expect(screen.getByText(/test content/i)).toBeVisible();
  });

  describe("title", () => {
    it("shouldn't render a title if it's not defined", () => {
      renderComponent({ title: undefined });

      expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    });

    it("should render a title if it's defined", () => {
      renderComponent({ title: "Lorem ipsum" });

      expect(screen.queryByRole("heading", { level: 1, name: /lorem ipsum/i })).toBeInTheDocument();
    });
  });
});
