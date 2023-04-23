import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Placeholder, PlaceholderIconArgs } from "./placeholder";
import SearchIcon from "@mui/icons-material/Search";
import { actions } from "./placeholder.mock";

export default {
  title: "Components/Placeholders/Placeholder",
  component: Placeholder,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Placeholder>;
type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend at libero in tristique. Pellentesque bibendum arcu eget augue commodo, non convallis eros porttitor",
  },
};

export const WithIcon: Story = {
  args: {
    icon: ({ size, color }: PlaceholderIconArgs) => (
      <SearchIcon color={color} sx={{ fontSize: size }} />
    ),
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend at libero in tristique. Pellentesque bibendum arcu eget augue commodo, non convallis eros porttitor",
  },
};

export const WithActions: Story = {
  args: {
    icon: ({ size, color }: PlaceholderIconArgs) => (
      <SearchIcon color={color} sx={{ fontSize: size }} />
    ),
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend at libero in tristique. Pellentesque bibendum arcu eget augue commodo, non convallis eros porttitor",
    actions,
  },
};
