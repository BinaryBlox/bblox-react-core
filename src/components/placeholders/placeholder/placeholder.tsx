import React, { ReactElement } from "react";
import { Box, Typography, Button } from "@mui/material";

type IconColor =
  | "inherit"
  | "action"
  | "disabled"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export interface PlaceholderAction {
  id: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface PlaceholderIconArgs {
  size: number;
  color: IconColor;
}

export interface PlaceholderProps {
  title: string;
  subtitle: string;
  iconSize?: number;
  icon?: ({ size, color }: PlaceholderIconArgs) => ReactElement;
  actions?: PlaceholderAction[];
}

export const Placeholder = ({
  title,
  subtitle,
  icon,
  iconSize = 200,
  actions,
}: PlaceholderProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {icon && icon({ size: iconSize, color: "primary" })}
      <Typography variant="h4" role="heading" aria-level={1}>
        {title}
      </Typography>
      <Typography variant="subtitle1" role="heading" aria-level={2} sx={{ mt: 2 }}>
        {subtitle}
      </Typography>
      {actions && (
        <Box sx={{ pt: 2 }}>
          {actions.map(({ id, text, href, onClick }, index) => (
            <Button
              key={id}
              role="button"
              variant="contained"
              href={href}
              onClick={onClick}
              sx={{ mr: index < actions.length - 1 ? 2 : 0 }}
            >
              {text}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};
