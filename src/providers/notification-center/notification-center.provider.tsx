import { useState } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Notification, NotificationCenterContext } from "./notification-center.context";

export type NotificationCenterProviderProps = PropsWithChildren<{
  autoHideDuration?: number;
}>;

export const NotificationCenterProvider = ({
  children,
  autoHideDuration = 6000,
}: NotificationCenterProviderProps) => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const show = (notification: Notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  return (
    <NotificationCenterContext.Provider
      value={{
        show,
        hide,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={hide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hide}
          severity={notification?.severity}
          aria-label={notification?.severity}
          sx={{ width: "100%" }}
        >
          {notification?.title && <AlertTitle>{notification?.title}</AlertTitle>}
          {notification?.message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationCenterContext.Provider>
  );
};
