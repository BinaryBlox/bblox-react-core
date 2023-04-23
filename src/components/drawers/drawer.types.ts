import { FunctionComponent, ReactElement } from "react";
import { BulletVariant, LabelVariant } from "../data-display";
import { DrawerProps as MuiDrawerProps, Theme } from "@mui/material";
import { DrawerAppBarProps } from "./drawer-app-bar";

export type DrawerVariant = "temporary" | "mini" | "persistent" | "clipped";
export type DrawerState = "open" | "collapse" | "close";
export type DrawerSize = "small" | "medium";

export interface DrawerItemAvatar {
  src: string;
  alt: string;
}

export interface DrawerItemLabel {
  text: string;
  variant: LabelVariant;
}

export interface DrawerItemBullet {
  variant: BulletVariant;
}

export interface DrawerNavigationItemLink {
  id: string;
  text: string;
  href: string;
  icon?: ReactElement;
  avatar?: DrawerItemAvatar;
  label?: DrawerItemLabel;
  bullet?: DrawerItemBullet;
}

export type DrawerNavigationItemCollapsable = Pick<
  DrawerNavigationItemLink,
  "id" | "text" | "icon"
> & {
  items: DrawerNavigationItem[];
};

export type DrawerNavigationItem = DrawerNavigationItemLink | DrawerNavigationItemCollapsable;

export interface DrawerNavigationSection {
  title?: string;
  items: DrawerNavigationItem[];
}

export interface DrawerNavigation {
  items: DrawerNavigationSection[];
}

export interface DrawerContentProps {
  /**
   * Object with the content that has to be rendered
   */
  nav: DrawerNavigation;
  /**
   * Item size. default to medium
   */
  size?: DrawerSize;
}
export type DrawerContentComponent = FunctionComponent<DrawerContentProps>;
export type DrawerContentElement = ReactElement<DrawerContentProps, DrawerContentComponent>;

export interface DrawerProps extends MuiDrawerProps {
  children: DrawerContentElement;
}

export type DrawerComponent = FunctionComponent<DrawerProps>;
export type DrawerElement = ReactElement<DrawerProps, DrawerComponent>;

export const getDrawerItemColors = (theme: Theme, selected: boolean | undefined) => ({
  color: selected ? theme.palette.primary.main : undefined,
  fontWeight: selected ? theme.typography.fontWeightBold : theme.typography.fontWeightMedium,
});

export type DrawerAppBarComponent = FunctionComponent<DrawerAppBarProps>;
export type DrawerAppBarElement = ReactElement<DrawerAppBarProps, DrawerAppBarComponent>;
