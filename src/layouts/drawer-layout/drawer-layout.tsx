import React, { ReactNode } from "react";
import { DrawerAppBarElement, DrawerElement, DrawerMain } from "../../components/drawers";
import {
  DrawerProvider,
  DrawerProviderProps,
} from "../../components/drawers/drawer-provider/drawer.provider";

export interface DrawerLayoutProps {
  drawerProviderProps?: DrawerProviderProps;
  children: [DrawerElement, DrawerAppBarElement, ReactNode];
}

export const DrawerLayout = ({
  drawerProviderProps,
  children: childrenProps,
}: DrawerLayoutProps) => {
  const [appBar, drawer, children] = childrenProps;

  return (
    <DrawerProvider {...drawerProviderProps}>
      {appBar}
      {drawer}
      <DrawerMain>{children}</DrawerMain>
    </DrawerProvider>
  );
};
