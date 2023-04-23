import { Meta, StoryObj } from "@storybook/react";
import { ValueDatetime } from "./value-datetime";
import { withContainer, withLocalizationProvider } from "../../../storybook";

export default {
  title: "Components/Value displays/ValueDatetime",
  component: ValueDatetime,
  decorators: [withContainer({ width: 600 }), withLocalizationProvider],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ValueDatetime>;
type Story = StoryObj<typeof ValueDatetime>;

export const Default: Story = {
  args: {
    label: "Lorem",
    value: new Date(2022, 8, 22),
    format: "yyyy/MM/dd",
  },
};

export const Dense: Story = {
  args: {
    label: "Lorem",
    value: new Date(2022, 8, 22),
    format: "yyyy/MM/dd",
    dense: true,
  },
};

export const Placeholder: Story = {
  args: {
    label: "Lorem",
    format: "yyyy/MM/dd",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    label: "Lorem",
    format: "yyyy/MM/dd",
    placeholder: ".",
  },
};

export const EditableDatetime: Story = {
  args: {
    label: "Lorem",
    value: new Date(2022, 8, 22, 12, 25),
    format: "yyyy/MM/dd HH:mm",
    editable: true,
    editInputType: "datetime",
  },
};

export const EditableTime: Story = {
  args: {
    label: "Lorem",
    value: new Date(2022, 8, 22, 12, 25),
    format: "HH:mm",
    editable: true,
    editInputType: "time",
  },
};

export const EditableDate: Story = {
  args: {
    label: "Lorem",
    value: new Date(2022, 8, 22),
    format: "yyyy/MM/dd",
    editable: true,
    editInputType: "date",
  },
};
