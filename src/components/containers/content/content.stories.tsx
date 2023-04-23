import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Content } from "./content";
import { SkeletonGrid } from "~/components/placeholders";

export default {
  title: "Components/Containers/Content",
  component: Content,
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <Content>
      <SkeletonGrid />
    </Content>
  ),
} satisfies Meta<typeof Content>;
type Story = StoryObj<typeof Content>;

export const Default: Story = {};
