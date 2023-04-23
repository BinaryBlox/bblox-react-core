import { Meta, StoryObj } from "@storybook/react";
import { SkeletonCard } from "./skeleton-card";

export default {
  title: "Components/Placeholders/SkeletonCard",
  component: SkeletonCard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SkeletonCard>;
type Story = StoryObj<typeof SkeletonCard>;

export const Default: Story = {
  args: {
    width: 250,
  },
};
