import React from "react";
import { BootstrapDialog } from "../bootstrap-dialog";
import { BootstrapDialogDialogProps } from "../dialog.types";

type OmitBaseDialogProps =
  | "cancelable"
  | "acceptable"
  | "onAccept"
  | "onCancel"
  | "onClose"
  | "actions"
  | "callCloseWhenCancel"
  | "component"
  | "acceptType";
export interface ConfirmDialogProps extends Omit<BootstrapDialogDialogProps, OmitBaseDialogProps> {
  confirmText?: string;
  canceText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  loading,
  disabled,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <BootstrapDialog
      title={title}
      loading={loading}
      disabled={loading || disabled}
      open={open}
      onClose={onCancel}
      acceptable
      cancelable
      callCloseWhenCancel={false}
      acceptText={confirmText}
      cancelText={cancelText}
      onCancel={onCancel}
      onAccept={onConfirm}
    >
      {children}
    </BootstrapDialog>
  );
};
