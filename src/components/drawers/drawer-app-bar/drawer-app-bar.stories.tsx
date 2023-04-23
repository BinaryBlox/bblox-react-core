import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DrawerAppBar } from "./drawer-app-bar";
import { DrawerProvider } from "../drawer-provider";

export default {
  title: "Components/Drawers/DrawerAppBar",
  component: DrawerAppBar,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <DrawerProvider>
      <DrawerAppBar {...args} />
    </DrawerProvider>
  ),
} satisfies Meta<typeof DrawerAppBar>;
type Story = StoryObj<typeof DrawerAppBar>;

export const Default: Story = {
  args: {
    title: "Lorem ipsum",
  },
};

export const WithoutTitle: Story = {};
