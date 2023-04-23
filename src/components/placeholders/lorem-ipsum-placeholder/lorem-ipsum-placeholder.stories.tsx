import { Meta, StoryObj } from "@storybook/react";
import { LoremIpsumPlaceholder } from "./lorem-ipsum-placeholder";

export default {
  title: "Components/Placeholders/LoremIpsumPlaceholder",
  component: LoremIpsumPlaceholder,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoremIpsumPlaceholder>;
type Story = StoryObj<typeof LoremIpsumPlaceholder>;

export const Default: Story = {};
