import { render, screen } from "~/tests/testing-library";
import React from "react";
import { GroupValueCardDummy } from "./group-value-card.mock";
import { LoremIpsumPlaceholder } from "~/components/placeholders";

describe("GroupValueCard", () => {
  const renderComponent = ({
    title = "Hello world",
    subtitle = undefined,
  }: { title?: string; subtitle?: string } = {}) => {
    return render(
      <GroupValueCardDummy title={title} subtitle={subtitle}>
        <LoremIpsumPlaceholder />
      </GroupValueCardDummy>,
    );
  };
  it("would render a title", () => {
    renderComponent({ title: "Hello world" });

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  describe("subtitle", () => {
    it("would not render a subtitle if it's not provided", () => {
      renderComponent({ subtitle: undefined });

      expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
    });

    it("would render a subtitle if it's provided", () => {
      renderComponent({ subtitle: "Hi. I am batman" });

      expect(
        screen.getByRole("heading", { level: 2, name: /hi. i am batman/i }),
      ).toBeInTheDocument();
    });
  });

  it("would render all values", () => {
    renderComponent();

    expect(screen.getByRole("label", { name: /hello world/i })).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum sit amet/i)).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /enabled/i })).toBeInTheDocument();
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /quantity/i })).toBeInTheDocument();
    expect(screen.getByText(/1200/i)).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /currency/i })).toBeInTheDocument();
    expect(screen.getByText(/eur/i)).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /i am batman/i })).toBeInTheDocument();
    expect(screen.getByText(/does it come in black/i)).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /status/i })).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();

    expect(screen.getByRole("label", { name: /level/i })).toBeInTheDocument();
    expect(screen.getByText(/2144/i)).toBeInTheDocument();
  });
});
