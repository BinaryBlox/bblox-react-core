import { BootstrapDialog } from "../bootstrap-dialog";
import { FormEvent } from "react";
import React from "react";
import { BootstrapDialogDialogProps } from "../dialog.types";
import { getFormData } from "~/utils/forms";

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
export interface FormDialogProps<T> extends Omit<BootstrapDialogDialogProps, OmitBaseDialogProps> {
  submitText?: string;
  canceText?: string;
  onCancel: () => void;
  onSubmit: (data: T) => void;
}

export const FormDialog = <T,>({
  open,
  title,
  loading,
  disabled,
  submitText = "Submit",
  cancelText = "Cancel",
  children,
  onSubmit,
  onCancel,
}: FormDialogProps<T>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(getFormData<T>(e));
  };

  return (
    <BootstrapDialog
      component="form"
      componentProps={{
        onSubmit: handleSubmit,
      }}
      title={title}
      loading={loading}
      disabled={loading || disabled}
      open={open}
      onClose={onCancel}
      callCloseWhenCancel={false}
      cancelable
      acceptable
      cancelText={cancelText}
      onCancel={onCancel}
      acceptText={submitText}
      acceptType="submit"
    >
      {children}
    </BootstrapDialog>
  );
};
