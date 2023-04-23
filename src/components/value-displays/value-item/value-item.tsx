import { GridProps, Grid, Box } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import React, { PropsWithChildren, FunctionComponent, ReactElement } from "react";
import { useGetDefaultThemeColor } from "~/utils";

export type ValueItemProps = PropsWithChildren<
  Omit<GridProps, "item" | "container"> & { bordered?: ResponsiveStyleValue<boolean> }
>;
export type ValueItemComponent = FunctionComponent<ValueItemProps>;
export type ValueItemElement = ReactElement<ValueItemProps, ValueItemComponent>;

export const valueItemClasses = {
  root: "RdsValueItem-root",
  content: "RdsValueItem-content",
};

const resolveBorderStyle = (bordered: ResponsiveStyleValue<boolean>, color: string) => {
  const borderStyle = `solid ${color} 1px`;
  const noBorder = "none";

  if (!bordered) {
    return undefined;
  }

  if (Array.isArray(bordered)) {
    return bordered.map((b) => (b ? borderStyle : noBorder));
  }

  if (typeof bordered === "object") {
    const style: Record<string, string | undefined> = {};
    Object.entries(bordered).forEach(([key, value]) => {
      style[key] = value ? borderStyle : noBorder;
    });
    return style;
  }

  return borderStyle;
};

export const ValueItem: ValueItemComponent = ({
  children,
  bordered = true,
  ...rest
}: ValueItemProps) => {
  const defaultColor = useGetDefaultThemeColor({ lightWeight: 200, darkWeight: 800 });
  const borderLeft = resolveBorderStyle(bordered, defaultColor);
  return (
    <Grid item className={valueItemClasses.root} {...rest}>
      <Box className={valueItemClasses.content} px={1} borderLeft={borderLeft}>
        {children}
      </Box>
    </Grid>
  );
};
