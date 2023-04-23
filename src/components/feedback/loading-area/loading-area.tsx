import { CircularProgress, Box } from "@mui/material";
import React from "react";

/**
 * Displays a centered loading indicator
 */
export const LoadingArea = () => {
  return (
    <Box width={1} height={1} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};
