import { Meta, StoryObj } from "@storybook/react";
import { DrawerSubheader } from "./drawer-subheader";
import { withContainer } from "../../../storybook";

export default {
  title: "Components/Drawers/DrawerSubheader",
  component: DrawerSubheader,
  decorators: [withContainer({ width: 250 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DrawerSubheader>;
type Story = StoryObj<typeof DrawerSubheader>;

export const Medium: Story = {
  args: {
    children: "Lorem ipsum",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    children: "Lorem ipsum",
    size: "small",
  },
};
