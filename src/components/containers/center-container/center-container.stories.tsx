import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CenterContainer } from "./center-container";
import { Label } from "../../data-display/label";
import { withContainer } from "../../../storybook";

export default {
  title: "Components/Containers/CenterContainer",
  component: CenterContainer,
  decorators: [withContainer({ height: 500, bordered: true })],
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <CenterContainer {...args}>
      <Label text="Lorem ipsum" />
    </CenterContainer>
  ),
} satisfies Meta<typeof CenterContainer>;
type Story = StoryObj<typeof CenterContainer>;

export const Default: Story = {
  args: {
    centerVertical: true,
    centerHorizontal: true,
  },
};

export const VerticalCentered: Story = {
  args: {
    centerVertical: true,
    centerHorizontal: false,
  },
};

export const HorizontallyCentered: Story = {
  args: {
    centerVertical: false,
    centerHorizontal: true,
  },
};

export const CustomStyles: Story = {
  args: {
    centerVertical: false,
    centerHorizontal: false,
    sx: {
      px: 3,
      py: 2,
    },
  },
};
