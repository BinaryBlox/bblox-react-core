import React from "react";
import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export type ValueCardProps = PropsWithChildren;

/**
 * Container to show a labeled value
 */
export const ValueCard = ({ children }: ValueCardProps) => {
  return <Paper sx={{ p: 2 }}>{children}</Paper>;
};
