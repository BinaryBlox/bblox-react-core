import { styled, useTheme } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";
import { DrawerHeader, useDrawer } from "../drawer-provider";
import { DrawerVariant } from "../drawer.types";

const drawerSpace: Record<DrawerVariant, boolean> = {
  temporary: false,
  mini: true,
  clipped: true,
  persistent: true,
};

const StyledDiv = styled("div")(({ theme }) => {
  const { spacing } = useTheme();
  const { drawerWidth, state, variant } = useDrawer();

  const marginLeft = drawerSpace[variant]
    ? state === "open"
      ? drawerWidth
      : state === "collapse"
      ? spacing(8)
      : 0
    : 0;

  return {
    marginLeft,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };
});

export type DrawerMainProps = PropsWithChildren;

export const DrawerMain = ({ children }: DrawerMainProps) => (
  <StyledDiv>
    <DrawerHeader />
    {children}
  </StyledDiv>
);
