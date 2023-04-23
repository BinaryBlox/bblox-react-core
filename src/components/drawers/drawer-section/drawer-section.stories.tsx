import { Meta, StoryObj } from "@storybook/react";
import { DrawerSection, DrawerSectionProps } from "./drawer-section";
import { withMemoryRouter } from "~/storybook";
import { mockMenuDrawerNavigationSection } from "../drawer.mock";
import { DrawerProvider } from "../drawer-provider";
import React from "react";
import { DrawerState } from "../drawer.types";

type DrawerSectionArgs = DrawerSectionProps & {
  initialState?: DrawerState;
  selectedItemId?: string;
};

export default {
  title: "Components/Drawers/DrawerSection",
  component: DrawerSection,
  decorators: [withMemoryRouter()],
  parameters: {
    layout: "centered",
  },
  render: ({ initialState = "open", selectedItemId, ...args }) => (
    <DrawerProvider initialState={initialState} selectedItemId={selectedItemId}>
      <DrawerSection {...args} />{" "}
    </DrawerProvider>
  ),
} satisfies Meta<DrawerSectionArgs>;
type Story = StoryObj<DrawerSectionArgs>;

export const WihtoutTitle = {
  args: {
    items: mockMenuDrawerNavigationSection.items,
    selectedItemId: "item2.3.2",
  },
};

export const Default: Story = {
  args: {
    ...WihtoutTitle.args,
    title: "Lorem ipsum",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    initialState: "collapse",
  },
};
