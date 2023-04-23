import { DialogContentText } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BootstrapDialog } from "./bootstrap-dialog";
import { loremIpsum } from "lorem-ipsum";
import React from "react";
import { StoryDialogManager } from "~/storybook";

const onClickAction = action("On click dialog action");

export default {
  title: "Components/Dialogs/BootstrapDialog",
  component: BootstrapDialog,
  parameters: {
    layout: "centered",
  },
  render: (args) => <StoryDialogManager component={BootstrapDialog} args={args} />,
} satisfies Meta<typeof BootstrapDialog>;
type Story = StoryObj<typeof BootstrapDialog>;

export const Default: Story = {
  args: {
    title: "Lorem ipsum",
    children: <DialogContentText>{loremIpsum({ count: 1, units: "paragraph" })}</DialogContentText>,
  },
};

export const AcceptableAndCancelable: Story = {
  args: {
    ...Default.args,
    acceptable: true,
    cancelable: true,
  },
};

export const WithExtraActions: Story = {
  args: {
    ...Default.args,
    cancelable: true,
    actions: [
      {
        id: "action1",
        text: "Action 1",
        color: "error",
        onClick: onClickAction,
      },
      {
        id: "action2",
        text: "Action 2",
        onClick: onClickAction,
      },
    ],
  },
};

export const LoadingWithAcceptable: Story = {
  args: {
    ...Default.args,
    acceptable: true,
    loading: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...WithExtraActions.args,
    disabled: true,
  },
};

export const CustomTexts: Story = {
  args: {
    ...Default.args,
    acceptable: true,
    cancelable: true,
    cancelText: "Cancel updated",
    acceptText: "Accept updated",
  },
};
