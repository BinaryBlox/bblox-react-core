/* eslint-disable react/display-name */
import React, { FunctionComponent, useState } from "react";
import { Box, Button, SxProps, Theme } from "@mui/material";
import { MemoryRouter, Router, Navigator, Route, Routes } from "react-router-dom";
import { NotificationCenterProvider } from "./providers";
import { action } from "@storybook/addon-actions";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const replaceAction = action("navigator/replace");
const goAction = action("navigator/go");
const pushAction = action("navigator/push");
const closeDialogAction = action("dialog/close");

export const withActionRouter =
  ({ location = "/", path = "/" }: { location?: string; path?: string } = {}) =>
  (Story: FunctionComponent) => {
    const navigator: Navigator = {
      replace: (args) => replaceAction(args),
      go: (args) => goAction(args),
      push: (args) => pushAction(args),
      createHref: () => "",
    };

    return (
      <Router location={location} navigator={navigator}>
        <Routes>
          <Route path={path} element={<Story />} />
        </Routes>
      </Router>
    );
  };

export const withMemoryRouter =
  (initialEntries = ["/"]) =>
  (Story: FunctionComponent) => {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Story />
      </MemoryRouter>
    );
  };

export const withNotificationCenter = (Story: FunctionComponent) => {
  return (
    <NotificationCenterProvider>
      <Story />
    </NotificationCenterProvider>
  );
};

export const withFullHeight = (Story: FunctionComponent) => {
  return (
    <Box height="100vh">
      <Story />
    </Box>
  );
};

export const withContainer =
  ({
    width,
    height,
    bordered,
    backgroundColor,
    padding,
  }: {
    width?: number;
    height?: number;
    bordered?: boolean;
    backgroundColor?: string;
    padding?: number;
  }) =>
  (Story: FunctionComponent) => {
    let sx: SxProps<Theme> = {
      backgroundColor,
      padding,
    };
    if (bordered) {
      sx = {
        ...sx,
        border: "solid 1px black",
      };
    }
    return (
      <Box width={width} height={height} sx={sx}>
        <Story />
      </Box>
    );
  };

export const withPadding =
  (padding = 2) =>
  (Story: FunctionComponent) => {
    return (
      <Box padding={padding}>
        <Story />
      </Box>
    );
  };

export const withLocalizationProvider = (Story: FunctionComponent) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Story />
    </LocalizationProvider>
  );
};

export const StoryDialogManager = ({
  component: C,
  args,
}: {
  component: FunctionComponent<any>;
  args: any;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = (key: string) => {
    setOpen(false);
    closeDialogAction(key);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open
      </Button>
      <C
        {...args}
        open={open}
        onClose={() => handleClose("close")}
        onCancel={() => handleClose("cancel")}
        onAccept={() => handleClose("accept")}
        onConfirm={() => handleClose("confirm")}
        onSubmit={() => handleClose("submit")}
      />
    </Box>
  );
};
