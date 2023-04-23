import { Meta, StoryObj } from "@storybook/react";
import { SignIn } from "./sign-in";

export default {
  title: "Components/Inputs/Sign In",
  component: SignIn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SignIn>;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  args: {
    title: "Sign in into Garmin Workouts",
    subtitle: "Enter your details below",
  },
};

export const Error: Story = {
  args: {
    title: "Sign in into Garmin Workouts",
    subtitle: "Enter your details below",
    error: {
      name: "InvalidCredentials",
      message: "Invalid user credentials",
    },
  },
};

export const Loading: Story = {
  args: {
    title: "Sign in into Garmin Workouts",
    subtitle: "Enter your details below",
    loading: true,
  },
};
