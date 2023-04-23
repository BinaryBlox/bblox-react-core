import { Meta, StoryObj } from "@storybook/react";
import { ValueContent } from "./value-content";
import { withContainer } from "../../../storybook";
import { Typography } from "@mui/material";
import React from "react";

export default {
  title: "Components/Value displays/ValueContent",
  component: ValueContent,
  decorators: [withContainer({ width: 200 })],
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <ValueContent {...args} label="lorem ipsum">
      <Typography>Demo content</Typography>
    </ValueContent>
  ),
} satisfies Meta<typeof ValueContent>;
type Story = StoryObj<typeof ValueContent>;

export const Default: Story = {};
export const Dense: Story = {
  args: {
    dense: true,
  },
};
