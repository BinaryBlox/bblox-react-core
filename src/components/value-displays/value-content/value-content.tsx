import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";

export const getValueContentLabelId = (label: string): string =>
  `label-${label.replace(/ /g, "-")}`;

export interface ValueContentProps {
  /**
   * Name of the displayed value
   */
  label: string;

  /**
   * If defined, a tooltip is going to be added arround the children;
   */
  tooltip?: string;

  /**
   * Timeout before the tooltip appears when the user hovers the value
   */
  tooltipEnterDelay?: number;

  /**
   * Component that's going to be renderd under the label
   */
  children: React.ReactElement<any, any>;

  /**
   * The value has to be displayed as compact or not.
   * False by default
   */
  dense?: boolean;
}

/**
 * Displays a string value with a label
 */
export const ValueContent = ({
  label,
  tooltip,
  tooltipEnterDelay = 2000,
  children,
  dense,
}: ValueContentProps) => {
  const { typography } = useTheme();
  const id = getValueContentLabelId(label);

  return (
    <Box width={1} lineHeight={dense ? 0 : undefined}>
      <Typography
        variant={dense ? "caption" : "subtitle2"}
        role="label"
        id={id}
        lineHeight={dense ? typography.pxToRem(15) : undefined}
      >
        {label}
      </Typography>
      {tooltip ? (
        <Tooltip title={tooltip} placement="top" enterDelay={tooltipEnterDelay}>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </Box>
  );
};
