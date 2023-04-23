import React from "react";
import { render, screen } from "~/tests/testing-library";
import userEvent from "@testing-library/user-event";
import { DrawerSection } from "./drawer-section";
import { mockMenuDrawerNavigationSection } from "../drawer.mock";
import { DrawerProvider } from "../drawer-provider";
import { DrawerState } from "../drawer.types";

describe("DrawerSection", () => {
  const renderComponent = ({
    title,
    initialState = "open",
  }: {
    title?: string;
    initialState?: DrawerState;
  } = {}) => {
    return render(
      <DrawerProvider initialState={initialState}>
        <DrawerSection title={title} items={mockMenuDrawerNavigationSection.items} />
      </DrawerProvider>,
    );
  };

  describe("title", () => {
    it("should render if is set and state is open", () => {
      renderComponent({ title: "Item 1" });

      expect(screen.getByRole("heading", { name: /item 1/i })).toBeInTheDocument();
    });

    it.each([["collapse" as DrawerState], ["close" as DrawerState]])(
      "shouldn't render if is set and state isn't open",
      (initialState) => {
        renderComponent({ title: "Item 1", initialState });

        expect(screen.queryByRole("heading", { name: /item 1/i })).not.toBeInTheDocument();
      },
    );

    it("shouldn't render if it's not set and state is open", () => {
      renderComponent({ title: undefined });

      expect(screen.queryByRole("heading", { name: /item 1/i })).not.toBeInTheDocument();
    });
  });

  describe("expandable submenus", () => {
    it.each([["collapse" as DrawerState], ["open" as DrawerState]])(
      "should render the items if the drawer state is %s",
      async (initialState: DrawerState) => {
        renderComponent({ initialState });

        await userEvent.click(screen.getByRole("button", { name: /item 2.3/i }));

        expect(screen.getByRole("link", { name: /item 2.3.1/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /item 2.3.2/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /item 2.3.3/i })).toBeVisible();
      },
    );

    it.each([
      ["Item 2.3 popover submenu", "collapse" as DrawerState],
      ["Item 2.3 collapse submenu", "open" as DrawerState],
    ])(
      "should render a '%s' if the drawer state is %s",
      async (label: string, initialState: DrawerState) => {
        renderComponent({ initialState });

        await userEvent.click(screen.getByRole("button", { name: /item 2.3/i }));

        expect(screen.getByLabelText(label)).toBeVisible();
      },
    );
  });

  describe("click list item", () => {
    it.each([
      ["/items/2-1", /item 2.1/i],
      ["/items/2-2", /item 2.2/i],
    ])("should navigate to %s if %s is clicked", async (to: string, item: RegExp) => {
      const { history } = renderComponent();

      await userEvent.click(screen.getByRole("link", { name: item }));

      expect(history.location.pathname).toBe(to);
    });
  });
});
