import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DrawerLayout } from "./drawer-layout";
import { mockDrawerNavigation } from "../../components/drawers/drawer.mock";
import { ContentPlaceholder, DrawerContent, Drawer, DrawerAppBar } from "../../components";
import { withMemoryRouter } from "~/storybook";

export default {
  title: "Layouts/DrawerLayout",
  component: DrawerLayout,
  decorators: [withMemoryRouter()],
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <DrawerLayout {...args}>
      <Drawer>
        <DrawerContent nav={mockDrawerNavigation} />
      </Drawer>
      <DrawerAppBar title="Lorem ipsum" />
      <ContentPlaceholder p={3} />
    </DrawerLayout>
  ),
} satisfies Meta<typeof DrawerLayout>;
type Story = StoryObj<typeof DrawerLayout>;

export const Temporary: Story = {
  args: {
    drawerProviderProps: {
      variant: "temporary",
    },
  },
};

export const Persistent: Story = {
  args: {
    drawerProviderProps: {
      variant: "persistent",
    },
  },
};

export const Clipped: Story = {
  args: {
    drawerProviderProps: {
      variant: "clipped",
    },
  },
};

export const Mini: Story = {
  args: {
    drawerProviderProps: {
      variant: "mini",
    },
  },
};
