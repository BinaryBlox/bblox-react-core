import { grey } from "@mui/material/colors";
import { Meta, StoryObj } from "@storybook/react";
import { withContainer, withLocalizationProvider } from "~/storybook";
import { SearchInput } from "./search-input";

export default {
  title: "Components/Inputs/SearchInput",
  component: SearchInput,
  decorators: [
    withLocalizationProvider,
    withContainer({ width: 400, height: 400, backgroundColor: grey[100], padding: 5 }),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SearchInput>;
type Story = StoryObj<typeof SearchInput>;

export const Label: Story = {
  args: {
    label: "Lorem ipsum",
    fullWidth: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Lorem ipsum",
    fullWidth: true,
  },
};

export const HelperText: Story = {
  args: {
    placeholder: "Lorem ipsum",
    fullWidth: true,
    helperText: "this is a helper text",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Lorem ipsum",
    fullWidth: true,
    size: "small",
  },
};

export const WithFilters: Story = {
  args: {
    placeholder: "Lorem ipsum",
    fullWidth: true,
    filters: [
      { id: "subject", type: "text", label: "Subject" },
      { id: "amount", type: "number", label: "Amount" },
      { id: "hasSomething", type: "boolean", label: "Has something" },
      { id: "createdBefore", type: "datetime", label: "Created before" },
    ],
  },
};
