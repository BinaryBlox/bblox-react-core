import { ListSubheader, ListSubheaderProps, styled } from "@mui/material";
import { DrawerSize } from "../drawer.types";

export interface DrawerSubheaderProps extends ListSubheaderProps {
  /**
   * Item size. default to medium
   */
  size?: DrawerSize;
}

export const DrawerSubheader = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== "size",
})<DrawerSubheaderProps>(({ size, theme }) => ({
  lineHeight: size === "small" ? theme.typography.pxToRem(40) : undefined,
}));
