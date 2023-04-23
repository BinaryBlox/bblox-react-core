import { Markdown } from "./markdown";
import { render, screen } from "~/tests/testing-library";
import React from "react";
import { mockMarkdownContent } from "~/tests/mocks/markdown.mock";

describe.skip("Markdown", () => {
  const renderComponent = () => {
    render(<Markdown content={mockMarkdownContent} />);
  };

  it.each(["Diu in illa Lavini atque de quoque"])(
    "should render the title '%s'",
    (title: string) => {
      renderComponent();

      expect(screen.getByRole("heading", { name: title, level: 5 })).toBeVisible();
    },
  );

  it.each([
    ["Secretaque nepos mentitis cupidine ponti dextramque nata"],
    ["Mota dixit"],
    ["Link section"],
    ["List section"],
  ])("should render the subtitle '%s'", (subtitle: string) => {
    renderComponent();

    expect(
      screen.getByRole("heading", {
        name: subtitle,
        level: 6,
      }),
    ).toBeVisible();
  });

  it.each([
    "funesta opposuitque deus adloquitur reminiscitur manibus ales? Spumisque fulva, veneni, vicit dum? Ipse responsa equo!",
    "Deos debebat, in tenuit postquam candida errorem vires undis limina ignis pectora capere dant, in curvo",
    "Dum tot tum nunc, atque deae telum rustica tuebere tacti dat. Nunc quasi Tritonidos fluminis. Ulli regnat clamant luminis moenia; hoc numen accipe, indefletaeque artesque fores ales in concumbere. Boves humi regimen, vulnus ore adspicias, sit mutua nega, illud; quam fruges meritis.",
  ])("should render the content '%s'", (content: string) => {
    renderComponent();

    expect(screen.getByText(content)).toBeVisible();
  });

  it.each([["toto link"]])("should render the link '%s'", (link: string) => {
    renderComponent();

    expect(screen.getByRole("link", { name: link })).toBeVisible();
  });

  it.each([
    ["Cum bella cantato"],
    ["Sinistra maternos tamen Gorgonis sim aquis"],
    ["Quo orat dabitur Dianae ira timendi templi"],
    ["Cum oro Lycabas ultima"],
    ["Haut ad dedit reducit crimina adhaeret pectore"],
    ["Vulnere latebramque minima"],
  ])("should render the list item '%s'", (listItem: string) => {
    renderComponent();

    expect(screen.getByText(listItem)).toBeVisible();
  });
});
