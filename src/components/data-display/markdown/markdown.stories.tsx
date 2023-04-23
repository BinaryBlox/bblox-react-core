import { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "./markdown";
import mockMarkdownContentFile from "~/tests/mocks/markdown.mock.md";
import { mockMarkdownContent } from "~/tests/mocks/markdown.mock";

export default {
  title: "Components/Data Display/Markdown",
  component: Markdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Markdown>;
type Story = StoryObj<typeof Markdown>;

export const File: Story = {
  args: {
    content: mockMarkdownContentFile,
  },
};

export const StringVariable: Story = {
  args: {
    content: mockMarkdownContent,
  },
};
