import { Meta, StoryObj } from "@storybook/react";
import { ValueImage } from "./value-image";
import { withContainer } from "../../../storybook";
import workInProgressImg from "../../../stories/assets/work-in-progress.jpg";

export default {
  title: "Components/Value displays/ValueImage",
  component: ValueImage,
  decorators: [withContainer({ width: 200 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ValueImage>;
type Story = StoryObj<typeof ValueImage>;

export const Default: Story = {
  args: {
    label: "Lorem",
    value: workInProgressImg,
  },
};

export const Dense: Story = {
  args: {
    label: "Lorem",
    value: workInProgressImg,
    dense: true,
  },
};

export const CustomSize: Story = {
  args: {
    label: "Lorem",
    value: workInProgressImg,
    size: 250,
  },
};
