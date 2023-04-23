import { Meta, StoryObj } from "@storybook/react";
import { withContainer, withMemoryRouter } from "../../../storybook";
import { LinkCard } from "./link-card";

export default {
  title: "Components/Data Display/LinkCard",
  component: LinkCard,
  decorators: [withContainer({ width: 400 }), withMemoryRouter()],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LinkCard>;
type Story = StoryObj<typeof LinkCard>;

export const Primary: Story = {
  args: {
    title: "Lorem ipsum",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkText: "Learn more",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
  },
};

export const Info: Story = {
  args: {
    ...Primary.args,
    variant: "info",
  },
};

export const Warning: Story = {
  args: {
    ...Primary.args,
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    variant: "error",
  },
};

export const WithoutLinkButton: Story = {
  args: {
    title: "Lorem ipsum",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};
