import { Meta, StoryObj } from "@storybook/react";
import { ValueText } from "./value-text";
import { withContainer } from "../../../storybook";

export default {
  title: "Components/Value displays/ValueText",
  component: ValueText,
  decorators: [withContainer({ width: 200 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ValueText>;
type Story = StoryObj<typeof ValueText>;

export const Default: Story = {
  args: {
    label: "Lorem",
    value: "ipsum sit",
  },
};

export const Dense: Story = {
  args: {
    label: "Lorem",
    value: "ipsum sit",
    dense: true,
  },
};

export const NumberAsValue: Story = {
  args: {
    label: "Lorem",
    value: 1000,
  },
};

export const TruncatedText: Story = {
  args: {
    label: "Lorem",
    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
};

export const Placeholder: Story = {
  args: {
    label: "Lorem",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    label: "Lorem",
    placeholder: ".",
  },
};

export const Editable: Story = {
  args: {
    label: "Lorem",
    value: "lorem ipsum",
    editable: true,
  },
};
