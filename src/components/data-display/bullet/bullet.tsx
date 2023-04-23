import { Badge, SxProps, Theme } from "@mui/material";
import React from "react";

export type BulletVariant = "primary" | "secondary" | "default" | "info" | "warning" | "error";

export const bulletClasses = {
  root: "RdsBullet-root",
};

export interface BulletProps {
  /**
   * Color palette used to draw the component
   */
  variant?: BulletVariant;
  /**
   * Custom styles
   */
  sx?: SxProps<Theme>;
}

/**
 * Dot to attract the user attention
 */
export const Bullet = ({ variant = "primary", sx }: BulletProps) => {
  return (
    <Badge
      color={variant}
      variant="dot"
      className={bulletClasses.root}
      role="bullet"
      aria-describedby={variant}
      sx={sx}
    />
  );
};
