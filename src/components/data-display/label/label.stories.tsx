import { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

export default {
  title: "Components/Data Display/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Label>;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    text: "lorem",
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    text: "lorem",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    text: "lorem",
    variant: "secondary",
  },
};

export const Info: Story = {
  args: {
    text: "lorem",
    variant: "info",
  },
};

export const Warning: Story = {
  args: {
    text: "lorem",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    text: "lorem",
    variant: "error",
  },
};
