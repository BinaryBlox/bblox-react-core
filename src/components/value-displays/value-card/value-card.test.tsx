import React from "react";
import { ValueCard } from "./value-card";
import { render, screen } from "~/tests/testing-library";
import { ReactElement } from "react";
import { ValueText } from "../value-text";

describe("ValueCard", () => {
  const renderComponent = ({ children }: { children: ReactElement }) => {
    return render(<ValueCard>{children}</ValueCard>);
  };

  it("would render with a ValueText inside", () => {
    renderComponent({ children: <ValueText label="Hello world" value="Lorem ipsum sit amet" /> });

    expect(screen.getByRole("label", { name: /hello world/i })).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum sit amet/i)).toBeInTheDocument();
  });
});
