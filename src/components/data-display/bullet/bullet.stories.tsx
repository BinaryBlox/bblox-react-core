import { Meta, StoryObj } from "@storybook/react";
import { Bullet } from "./bullet";

export default {
  title: "Components/Data Display/Bullet",
  component: Bullet,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Bullet>;
type Story = StoryObj<typeof Bullet>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
  },
};
