import React from "react";
import { DrawerMenuItem } from "./drawer-menu-item";
import { DrawerNavigationItem, DrawerSize } from "../drawer.types";
import { DrawerItemLink } from "./drawer-item-link";
import { useDrawer } from "../drawer-provider/drawer-context";

export interface DrawerItemProps {
  /**
   * Data to be rendered
   */
  item: DrawerNavigationItem;
  /**
   * Size of the item
   */
  size?: DrawerSize;
  /**
   * Deep level of this item inside the submenus
   */
  level?: number;
}

export const DrawerItem = ({ item, size = "medium", level = 0 }: DrawerItemProps) => {
  const { selectedItemId } = useDrawer();
  if ("items" in item) {
    const { id, text, icon, items } = item;
    const childrenSelected = items.some((item) => item.id === selectedItemId);
    return (
      <DrawerMenuItem
        size={size}
        selected={id === selectedItemId || childrenSelected}
        text={text}
        icon={icon}
        items={items}
        level={level}
      />
    );
  } else {
    const { id, text, icon, avatar, label, bullet, href } = item;
    return (
      <DrawerItemLink
        selected={id === selectedItemId}
        size={size}
        text={text}
        icon={icon}
        avatar={avatar}
        label={label}
        bullet={bullet}
        href={href}
        level={level}
      />
    );
  }
};
