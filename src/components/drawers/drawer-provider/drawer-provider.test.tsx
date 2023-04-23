import React from "react";
import { DrawerProvider, useDrawer } from "../drawer-provider";
import { render, screen } from "~/tests/testing-library";
import { Box, Button, Typography } from "@mui/material";
import { DrawerState, DrawerVariant } from "../drawer.types";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const TestContent = () => {
  const {
    selectedItemId,
    state,
    variant,
    drawerWidth,
    underAppBar,
    switchState,
    close,
    collapse,
    open,
    setState,
  } = useDrawer();

  return (
    <Box>
      <Typography>selectedItemId: ${selectedItemId}</Typography>
      <Typography>state: {state}</Typography>
      <Typography>variant: {variant}</Typography>
      <Typography>drawerWidth: {drawerWidth}</Typography>
      <Typography>underAppBar: {underAppBar.toString()}</Typography>
      <Button onClick={switchState}>switch</Button>
      <Button onClick={open}>open</Button>
      <Button onClick={collapse}>collapse</Button>
      <Button onClick={close}>close</Button>
      <Button onClick={() => setState("collapse")}>set state</Button>
    </Box>
  );
};

describe("DrawerProvider", () => {
  const renderComponent = ({
    initialState,
    variant,
    underAppBar,
  }: { initialState?: DrawerState; variant?: DrawerVariant; underAppBar?: boolean } = {}) => {
    const onStateChange = vi.fn();

    render(
      <DrawerProvider
        initialState={initialState}
        variant={variant}
        drawerWidth={400}
        underAppBar={underAppBar}
        onStateChange={onStateChange}
      >
        <TestContent />
      </DrawerProvider>,
    );

    return { onStateChange };
  };

  it("should pass the drawerWith", () => {
    renderComponent();

    expect(screen.getByText("drawerWidth: 400")).toBeVisible();
  });

  describe("underAppBar", () => {
    it.each([[true], [false]])("should pass the underAppBar=%s", (underAppBar) => {
      renderComponent({ underAppBar });

      expect(screen.getByText(`underAppBar: ${underAppBar.toString()}`)).toBeVisible();
    });
  });

  describe("variant", () => {
    it.each([["temporary"], ["persistent"], ["clipped"], ["mini"]] satisfies [DrawerVariant][])(
      "should pass the variant %s",
      (variant) => {
        renderComponent({ variant });

        expect(screen.getByText(`variant: ${variant}`)).toBeVisible();
      },
    );
  });

  describe("initialState", () => {
    it.each([["open"], ["collapse"], ["close"]] as [DrawerState][])(
      "should render with state=%s if it's its initialState",
      (initialState) => {
        renderComponent({ initialState });

        expect(screen.getByText(`state: ${initialState}`)).toBeVisible();
      },
    );

    it.each([
      ["temporary", "close"],
      ["persistent", "close"],
      ["clipped", "open"],
      ["mini", "collapse"],
    ] satisfies [DrawerVariant, DrawerState][])(
      "should render the %s variant default state",
      (variant, state) => {
        renderComponent({ variant });

        expect(screen.getByText(`state: ${state}`)).toBeVisible();
      },
    );
  });

  it("should change the state to open if open is called", async () => {
    renderComponent({ initialState: "close" });

    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    expect(screen.getByText("state: open")).toBeVisible();
  });

  it("should change the state to collapse if collapse is called", async () => {
    renderComponent({ initialState: "close" });

    await userEvent.click(screen.getByRole("button", { name: /collapse/i }));

    expect(screen.getByText("state: collapse")).toBeVisible();
  });

  it("should change the state to close if close is called", async () => {
    renderComponent({ initialState: "open" });

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.getByText("state: close")).toBeVisible();
  });

  describe("switchState", () => {
    it.each([
      ["close", "open", "temporary"],
      ["open", "close", "temporary"],
      ["close", "open", "persistent"],
      ["open", "close", "persistent"],
      ["open", "open", "clipped"],
      ["collapse", "open", "mini"],
      ["open", "collapse", "mini"],
    ] satisfies [DrawerState, DrawerState, DrawerVariant][])(
      "should change state to %s if state is %s and variant %s",
      async (expectedState, initialState, variant) => {
        renderComponent({ initialState, variant });

        await userEvent.click(screen.getByRole("button", { name: /switch/i }));

        expect(screen.getByText(`state: ${expectedState}`)).toBeVisible();
      },
    );
  });

  it("should call onStateChange when the state changes", async () => {
    const { onStateChange } = renderComponent({ initialState: "close" });

    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith("open");
  });
});
