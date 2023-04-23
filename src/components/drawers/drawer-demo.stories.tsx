import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DrawerContent } from "./drawer-content";
import { withMemoryRouter } from "~/storybook";
import { Drawer, DrawerProvider } from "./drawer-provider";
import { mockDrawerNavigation } from "./drawer.mock";
import { ContentPlaceholder } from "../placeholders";
import { DrawerState, DrawerVariant } from "./drawer.types";
import { DrawerAppBar } from "./drawer-app-bar";
import { DrawerMain } from "./drawer-main";

interface DrawerDemoArgs {
  initialState: DrawerState;
  variant: DrawerVariant;
  selectedItemId?: string;
  underAppBar?: boolean;
}

export default {
  title: "Components/Drawers/Drawer demo",
  decorators: [withMemoryRouter()],
  parameters: {
    layout: "fullscreen",
  },
  render: ({ initialState, variant, selectedItemId, underAppBar }) => (
    <DrawerProvider
      initialState={initialState}
      variant={variant}
      selectedItemId={selectedItemId}
      underAppBar={underAppBar}
    >
      <DrawerAppBar title="Drawer demo" />
      <Drawer>
        <DrawerContent nav={mockDrawerNavigation} />
      </Drawer>
      <DrawerMain>
        <ContentPlaceholder p={3} />
      </DrawerMain>
    </DrawerProvider>
  ),
} satisfies Meta<DrawerDemoArgs>;
type Story = StoryObj<DrawerDemoArgs>;

export const Temporary: Story = {
  args: {
    variant: "temporary",
    selectedItemId: "item2.3.2",
  },
};

export const TemporaryUnder: Story = {
  args: {
    ...Temporary.args,
    variant: "temporary",
    underAppBar: true,
  },
};

export const Persistent: Story = {
  args: {
    ...Temporary.args,
    variant: "persistent",
  },
};

export const PersistentUnder: Story = {
  args: {
    ...Temporary.args,
    variant: "persistent",
    underAppBar: true,
  },
};

export const Clipped: Story = {
  args: {
    ...Temporary.args,
    variant: "clipped",
  },
};

export const ClippedUnder: Story = {
  args: {
    ...Temporary.args,
    variant: "clipped",
    underAppBar: true,
  },
};

export const MiniDrawer: Story = {
  args: {
    ...Temporary.args,
    variant: "mini",
  },
};
