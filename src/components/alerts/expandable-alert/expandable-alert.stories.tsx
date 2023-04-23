import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ExpandableAlert } from "./expandable-alert";
import { withContainer } from "~/storybook";
import { Box, Button, Snackbar } from "@mui/material";

export default {
  title: "Components/Alerts/ExpandableAlert",
  component: ExpandableAlert,
  decorators: [withContainer({ width: 500 })],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ExpandableAlert>;
type Story = StoryObj<typeof ExpandableAlert>;

export const Info: Story = {
  args: {
    severity: "info",
    title: "Lorem ipsum",
    message: "Lorem ipsum dolor sit amet",
    metadata: ["lorem: ipsum", "foo: bar", "header: this", "host: localhost"],
  },
};

export const Success: Story = {
  args: {
    ...Info.args,
    severity: "success",
  },
};

export const Error: Story = {
  args: {
    ...Info.args,
    severity: "error",
  },
};

export const Warning: Story = {
  args: {
    ...Info.args,
    severity: "warning",
  },
};

export const WihtoutMetadata: Story = {
  args: {
    severity: "info",
    title: "Lorem ipsum",
    message: "Lorem ipsum dolor sit amet",
  },
};

export const SnackbarAlert = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Snackbar
      </Button>
      <Snackbar open={open}>
        <ExpandableAlert
          severity="info"
          onClose={() => setOpen(false)}
          title="Lorem ipsum"
          message="Lorem ipsum dolor sit amet"
          metadata={["lorem: ipsum", "foo: bar", "header: this", "host: localhost"]}
        />
      </Snackbar>
    </Box>
  );
};
