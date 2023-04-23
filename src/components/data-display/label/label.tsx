import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React from "react";

export type LabelVariant = "primary" | "secondary" | "default" | "info" | "warning" | "error";

export const labelClasses = {
  root: "RdsLabel-root",
};

export interface LabelProps {
  /**
   * Content of the component
   */
  text: string;
  /**
   * Color palette used to draw the component
   */
  variant?: LabelVariant;

  /**
   * Custom styles
   */
  sx?: SxProps<Theme>;
}

/**
 * Compact element to represent a text
 */
export const Label = ({ text, variant = "default", sx }: LabelProps) => {
  const { palette } = useTheme();

  const backgroundColor: Record<LabelVariant, string> = {
    default: palette.mode === "light" ? palette.grey[100] : palette.grey[900],
    primary: palette.primary.main,
    secondary: palette.secondary.main,
    info: palette.info.main,
    warning: palette.warning.main,
    error: palette.error.main,
  };

  const textColor: Record<LabelVariant, string> = {
    default: palette.getContrastText(backgroundColor.default),
    primary: palette.primary.contrastText,
    secondary: palette.secondary.contrastText,
    info: palette.info.contrastText,
    warning: palette.warning.contrastText,
    error: palette.error.contrastText,
  };

  return (
    <Box
      px={1}
      sx={{ backgroundColor: backgroundColor[variant], ...sx }}
      borderRadius={1}
      color={textColor[variant]}
      className={labelClasses.root}
      role="label"
      aria-describedby={variant}
    >
      <Typography variant="caption" fontWeight={700}>
        {text.toUpperCase()}
      </Typography>
    </Box>
  );
};
