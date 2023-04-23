import { List, useTheme } from "@mui/material";
import React from "react";
import { DrawerNavigationItem, DrawerSize } from "../drawer.types";
import { DrawerSubheader } from "../drawer-subheader";
import { DrawerItem } from "../drawer-item/drawer-item";
import { useDrawer } from "../drawer-provider";

export interface DrawerSectionProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * List of items of that section
   */
  items: DrawerNavigationItem[];
  /**
   * Item size. default to medium
   */
  size?: DrawerSize;
}

/**
 * Render a group of items inside the drawer
 * with an optional title
 */
export const DrawerSection = ({ title, items, size = "medium" }: DrawerSectionProps) => {
  const { state } = useDrawer();
  const { spacing } = useTheme();
  return (
    <>
      {title && state === "open" && (
        <DrawerSubheader size={size} role="heading">
          {title}
        </DrawerSubheader>
      )}
      <List
        sx={{
          paddingTop: size === "small" ? spacing(0) : undefined,
          paddingY: state === "collapse" ? 0 : undefined,
        }}
      >
        {items.map((item) => (
          <DrawerItem key={item.id} item={item} size={size} />
        ))}
      </List>
    </>
  );
};
