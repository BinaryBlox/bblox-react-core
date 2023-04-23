import React from "react";
import { DummyTabs, TabCardDummy } from "./tab-card.dummy";
import { screen, render } from "~/tests/testing-library";
import userEvent from "@testing-library/user-event";

describe("TabCard", () => {
  function renderInstance(initialValue = 0) {
    return render(<TabCardDummy tabs={DummyTabs} initialTab={initialValue} />);
  }

  it('initialTab is not set the "panel 1" is displayed', () => {
    renderInstance();

    expect(screen.getByText(/panel 1/i)).toBeInTheDocument();
  });

  it('initialTab is set to 3 the "panel 3" is displayed', () => {
    renderInstance(3);

    expect(screen.getByText(/panel 3/i)).toBeInTheDocument();
  });

  it.each([
    [/tab 1/i, /panel 1/i],
    [/tab 2.1/i, /panel 2/i],
    [/tab 2.2/i, /panel 2/i],
    [/tab 3/i, /panel 3/i],
  ])(
    'click the tab "%s" the "%s" panel is displayed',
    async (tabName: RegExp, expectedText: RegExp) => {
      renderInstance();

      const tab = screen.getByRole("tab", { name: tabName });
      await userEvent.click(tab);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(tab).toHaveAttribute("aria-selected", "true");
    },
  );

  it('click the tab "tab 2" and click again the tab "tab 1" the "panel 1" is displayed', async () => {
    renderInstance();

    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    const tab2 = screen.getByRole("tab", { name: /tab 2.1/i });
    await userEvent.click(tab2);
    await userEvent.click(tab1);

    expect(screen.getByText(/panel 1/i)).toBeInTheDocument();
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
  });
});
