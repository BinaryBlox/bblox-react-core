import { Box, Skeleton } from "@mui/material";
import React from "react";

export interface SkeletonCardProps {
  width?: number | string;
  animation?: "pulse" | "wave" | false;
}

export const SkeletonCard = ({ width = "100%", animation = false }: SkeletonCardProps) => {
  return (
    <Box width={width}>
      <Skeleton animation={animation} variant="rectangular" height={118} />
      <Skeleton animation={animation} variant="rectangular" height={16} sx={{ my: 1 }} />
      <Skeleton animation={animation} variant="rectangular" width="80%" height={16} />
    </Box>
  );
};
