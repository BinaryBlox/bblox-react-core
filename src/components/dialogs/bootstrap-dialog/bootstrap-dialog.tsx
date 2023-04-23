import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  DialogContent,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { BootstrapDialogDialogProps } from "../dialog.types";

export const BootstrapDialog = ({
  open,
  title,
  component,
  componentProps = {},
  disabled,
  actions = [],
  children,
  loading,
  cancelable,
  callCloseWhenCancel = true,
  acceptable,
  acceptText = "Accept",
  cancelText = "Cancel",
  onAccept,
  onCancel = () => null,
  onClose,
  acceptType = "button",
}: BootstrapDialogDialogProps) => {
  const hasActions = actions.length > 0 || acceptable || cancelable;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {title}
        {loading && !acceptable && (
          <CircularProgress size={20} sx={{ ml: 2, color: (theme) => theme.palette.grey[500] }} />
        )}
        <IconButton
          disabled={disabled}
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component={component} {...componentProps}>
        <DialogContent dividers>{children}</DialogContent>
        {hasActions && (
          <DialogActions>
            {actions.map(({ id, text, type = "button", onClick, color = "primary" }) => (
              <Button key={id} type={type} disabled={disabled} onClick={onClick} color={color}>
                {text}
              </Button>
            ))}
            {cancelable && (
              <Button
                color="error"
                disabled={disabled}
                onClick={() => {
                  onCancel();
                  callCloseWhenCancel && onClose();
                }}
              >
                {cancelText}
              </Button>
            )}

            {acceptable && (
              <LoadingButton
                type={acceptType}
                loading={loading}
                disabled={disabled}
                onClick={onAccept}
              >
                {acceptText}
              </LoadingButton>
            )}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};
