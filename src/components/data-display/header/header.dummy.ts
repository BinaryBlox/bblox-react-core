import { action } from "@storybook/addon-actions";
import { HeaderBreadcrumb, HeaderAction, HeaderTab } from "./header.types";

export const breadcrumbs: HeaderBreadcrumb[] = [
  {
    id: "list",
    text: "Items",
    link: "/items",
  },
  {
    id: "item",
    text: "Item 1",
    link: "/items/1",
  },
];

export const actions: HeaderAction[] = [
  {
    id: "new",
    text: "Add",
    href: "/items/add",
  },
  {
    id: "edit",
    text: "Edit",
    onClick: action("click action edit"),
  },
  {
    id: "disabled",
    text: "Disabled",
    disabled: true,
    onClick: action("click action disabled"),
  },
  {
    id: "delete",
    text: "Delete",
    onClick: action("click action delete"),
  },
];

export const tabs: HeaderTab[] = [
  {
    id: "tab1",
    label: "Tab 1",
  },
  {
    id: "tab2",
    label: "Tab 2",
    disabled: true,
  },
  {
    id: "tab3",
    label: "Tab 3",
  },
];
export const linkedTabs = tabs.map((tab) => ({ ...tab, href: `/tab/${tab.id}` }));
