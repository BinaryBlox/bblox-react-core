import React from "react";
import { Bullet, BulletVariant } from "./bullet";
import { render, screen } from "~/tests/testing-library";

describe("Bullet", () => {
  const renderComponent = (variant: BulletVariant | undefined = undefined) => {
    return render(<Bullet variant={variant} />);
  };

  it("renders as primary without a variant", () => {
    renderComponent(undefined);

    expect(screen.getByRole("bullet")).toHaveAttribute("aria-describedby", "primary");
  });

  it.each([["primary"], ["secondary"], ["default"], ["info"], ["warning"], ["error"]])(
    "renders correctly with variant %s",
    (variant: string) => {
      renderComponent(variant as BulletVariant);

      expect(screen.getByRole("bullet")).toHaveAttribute("aria-describedby", variant);
    },
  );
});
