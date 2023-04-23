import React from "react";
import { DrawerSection } from "../drawer-section";
import { DrawerContentComponent, DrawerContentProps } from "../drawer.types";

/**
 * Content to be shown inside a navigation
 */
export const DrawerContent: DrawerContentComponent = ({
  nav: { items },
  size = "medium",
}: DrawerContentProps) => {
  return (
    <>
      {items.map(({ title, items }, i) => (
        <DrawerSection key={i} title={title} items={items} size={size} />
      ))}
    </>
  );
};
