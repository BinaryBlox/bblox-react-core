import { Meta, StoryObj } from "@storybook/react";
import { withContainer } from "../../../storybook";
import { Autocomplete } from "./autocomplete";
import { faker } from "@faker-js/faker";
import { Box, useTheme } from "@mui/material";
import React from "react";

export default {
  title: "Components/Inputs/Autocomplete",
  component: Autocomplete,
  decorators: [withContainer({ width: 300 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Autocomplete>;
type Story = StoryObj<typeof Autocomplete>;

const options: string[] = faker.definitions.vehicle?.model || [];

export const Default: Story = {
  args: {
    label: "Car model",
    options,
  },
};

export const HelperText: Story = {
  args: {
    ...Default.args,
    helperText: "This is a helper text",
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const LoadingWithValue: Story = {
  args: {
    ...Default.args,
    loading: true,
    value: options[0],
  },
};

export const Fetching: Story = {
  args: {
    ...Default.args,
    fetching: true,
  },
};

export const SizeSmall: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const SizeSmallLoading: Story = {
  args: {
    ...Default.args,
    size: "small",
    value: options[0],
    loading: true,
  },
};

export const SizeSmallFetching: Story = {
  args: {
    ...Default.args,
    size: "small",
    fetching: true,
    value: options[0],
  },
};

type WithBackgroundProps = {
  bgcolor: "primary" | "secondary";
  loading: boolean;
  fetching: boolean;
};

export const WithBackground = {
  render: ({ bgcolor: bgcolorProp, loading, fetching }: WithBackgroundProps) => {
    const { palette } = useTheme();
    const BackgroundColors: Record<"primary" | "secondary", string> = {
      primary: palette.primary.main,
      secondary: palette.secondary.main,
    };
    const bgcolor = BackgroundColors[bgcolorProp];
    const selectColor = palette.getContrastText(bgcolor);

    return (
      <Box bgcolor={bgcolor} padding={3}>
        <Autocomplete
          label="Car model"
          options={options}
          color={selectColor}
          loading={loading}
          fetching={fetching}
        />
      </Box>
    );
  },

  args: {
    bgcolor: "secondary",
    loading: true,
    fetching: true,
  },
};
