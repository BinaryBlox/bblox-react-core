import React, { PropsWithChildren } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ValueCard } from "./value-card";
import { ValueText } from "../value-text";

export default {
  title: "Components/Value displays/ValueCard",
  component: ValueCard,
  parameters: {
    layout: "centered",
  },
  render: ({ children }: PropsWithChildren) => {
    return <ValueCard>{children}</ValueCard>;
  },
} satisfies Meta<typeof ValueCard>;
type Story = StoryObj<typeof ValueCard>;

export const ValueCardText: Story = {
  args: {
    children: <ValueText label="Hello world" value="Lorem ipsum sit amet" />,
  },
};
