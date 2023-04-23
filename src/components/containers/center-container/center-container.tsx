import React, { ReactNode } from "react";
import { Box, SxProps, Theme } from "@mui/material";

export interface CenterContainerProps {
  children: ReactNode | undefined;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  sx?: SxProps<Theme>;
}

export function CenterContainer({
  children,
  centerVertical = true,
  centerHorizontal = true,
  sx,
}: CenterContainerProps) {
  return (
    <Box
      width={1}
      height={1}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        justifyContent: centerVertical ? "center" : "flex-start",
        alignItems: centerHorizontal ? "center" : "flex-start",
      }}
    >
      {children}
    </Box>
  );
}
