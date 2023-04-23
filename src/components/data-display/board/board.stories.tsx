import { Meta, StoryObj } from "@storybook/react";
import { withContainer } from "../../../storybook";
import { Board } from "./board";
import demoMarkdownContent from "~/tests/mocks/markdown.mock.md";
import { Typography } from "@mui/material";
import React from "react";

export default {
  title: "Components/Data Display/Board",
  component: Board,
  decorators: [withContainer({ width: 500 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Board>;
type Story = StoryObj<typeof Board>;

export const Text: Story = {
  args: {
    content:
      "Of recommend residence education be on difficult repulsive offending. Judge views had mirth table seems great him for her. Alone all happy asked begin fully stand own get. Excuse ye seeing result of we. See scale dried songs old may not. Promotion did disposing you household any instantly. Hills we do under times at first short an.",
  },
};

export const ArrayParagraph: Story = {
  args: {
    content: [
      "Of recommend residence education be on difficult repulsive offending. Judge views had mirth table seems great him for her. Alone all happy asked begin fully stand own get. Excuse ye seeing result of we. See scale dried songs old may not. Promotion did disposing you household any instantly. Hills we do under times at first short an.",
      "His having within saw become ask passed misery giving. Recommend questions get too fulfilled. He fact in we case miss sake. Entrance be throwing he do blessing up. Hearts warmth in genius do garden advice mr it garret. Collected preserved are middleton dependent residence but him how. Handsome weddings yet mrs you has carriage packages. Preferred joy agreement put continual elsewhere delivered now. Mrs exercise felicity had men speaking met. Rich deal mrs part led pure will but.",
      "Boy desirous families prepared gay reserved add ecstatic say. Replied joy age visitor nothing cottage. Mrs door paid led loud sure easy read. Hastily at perhaps as neither or ye fertile tedious visitor. Use fine bed none call busy dull when. Quiet ought match my right by table means. Principles up do in me favourable affronting. Twenty mother denied effect we to do on.",
    ],
    spacing: 1,
  },
};

export const ArrayList: Story = {
  args: {
    content: ["lorem: ipsum", "foo: bar", "header: this", "host: localhost"],
  },
};

export const Markdown: Story = {
  args: {
    markdown: demoMarkdownContent,
  },
};

export const Children: Story = {
  args: {
    children: (
      <>
        <Typography variant="h2">First line</Typography>
        <Typography variant="subtitle1">Second line</Typography>
        <Typography variant="h6">Third line</Typography>
      </>
    ),
  },
};
