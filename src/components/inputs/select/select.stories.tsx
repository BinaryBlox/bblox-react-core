import { Box, MenuItem, useTheme } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React, { ReactNode } from "react";
import { withContainer } from "../../../storybook";
import { Select, SelectProps, SelectSize } from "./select";
import { faker } from "@faker-js/faker";

const baseArgs = {
  label: "Car model",
  value: faker.vehicle.model(),
  size: "medium" as SelectSize,
  fetching: false,
  loading: false,
  fullWidth: true,
  options: faker.definitions.vehicle?.model || [],
};

interface TemplateProps<T extends ReactNode> extends SelectProps<T> {
  options: T[];
}

const DemoSelect = ({ options, ...rest }: TemplateProps<string>) => {
  return (
    <Select {...rest}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default {
  title: "Components/Inputs/Select",
  component: DemoSelect,
  decorators: [withContainer({ width: 200 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DemoSelect>;
type Story = StoryObj<typeof DemoSelect>;

export const WithoutFullWidth: Story = {
  args: {
    ...baseArgs,
    fullWidth: false,
  },
};

export const SelectLoaded: Story = {
  args: {
    ...baseArgs,
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
};

export const Fetching: Story = {
  args: {
    ...baseArgs,
    fetching: true,
  },
};

export const SizeSmall: Story = {
  args: {
    ...baseArgs,
    size: "small",
  },
};

type WithBackgroundProps = TemplateProps<string> & { bgcolor: "primary" | "secondary" };

export const WithBackground = {
  render: ({ options, bgcolor: bgcolorProp, ...rest }: WithBackgroundProps) => {
    const { palette } = useTheme();
    const BackgroundColors: Record<"primary" | "secondary", string> = {
      primary: palette.primary.main,
      secondary: palette.secondary.main,
    };
    const bgcolor = BackgroundColors[bgcolorProp];
    const selectColor = palette.getContrastText(bgcolor);

    return (
      <Box bgcolor={bgcolor} padding={3}>
        <Select {...rest} color={selectColor}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  },

  args: {
    bgcolor: "secondary",
    ...baseArgs,
  },
};
