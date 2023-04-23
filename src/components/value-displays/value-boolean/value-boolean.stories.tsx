import { Meta, StoryObj } from "@storybook/react";
import { ValueBoolean } from "./value-boolean";
export default {
  title: "Components/Value displays/ValueBoolean",
  component: ValueBoolean,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ValueBoolean>;
type Story = StoryObj<typeof ValueBoolean>;

export const True: Story = {
  args: {
    label: "Lorem ipsum",
    value: true,
  },
};

export const False: Story = {
  args: {
    label: "Lorem ipsum",
    value: false,
  },
};

export const Editable: Story = {
  args: {
    label: "Lorem ipsum",
    value: false,
    editable: true,
  },
};

export const Dense: Story = {
  args: {
    label: "Lorem ipsum",
    value: true,
    dense: true,
  },
};
