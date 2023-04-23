import { PropsWithChildren } from "react";

export interface DialogAction {
  id: string;
  text: string;
  type?: "button" | "submit";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick?: () => void;
}
export type BootstrapDialogDialogProps = PropsWithChildren<{
  open: boolean;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  cancelable?: boolean;
  acceptable?: boolean;
  callCloseWhenCancel?: boolean;
  actions?: DialogAction[];
  cancelText?: string;
  acceptText?: string;
  acceptType?: "button" | "submit";
  onClose: () => void;
  onCancel?: () => void;
  onAccept?: () => void;
  component?: React.ElementType;
  componentProps?: any;
}>;
