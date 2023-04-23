import { Grid, Paper, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useGetDefaultThemeColor } from "../../../utils/theme";
import { ValueItemElement } from "../value-item/value-item";

export interface GroupValueCardProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children: ValueItemElement | ValueItemElement[];
  dense?: boolean;
}

export const GroupValueCard = ({
  title,
  subtitle,
  centered,
  children,
  dense,
}: GroupValueCardProps) => {
  const { typography } = useTheme();
  const defaultColor = useGetDefaultThemeColor({ lightWeight: 200, darkWeight: 800 });

  return (
    <Paper
      sx={{
        paddingBottom: dense ? 0 : 1,
      }}
    >
      <Box
        bgcolor={defaultColor}
        px={dense ? 1 : 2}
        py={dense ? 0.5 : 1}
        lineHeight={dense ? 0 : undefined}
      >
        <Typography variant={dense ? "body1" : "h6"} role="heading" aria-level={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant={dense ? "caption" : "body2"}
            role="heading"
            aria-level={2}
            lineHeight={dense ? typography.pxToRem(15) : undefined}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      <Grid
        container
        padding={1}
        rowSpacing={dense ? 1 : 2}
        justifyContent={centered ? "center" : "flex-start"}
      >
        {children}
      </Grid>
    </Paper>
  );
};
