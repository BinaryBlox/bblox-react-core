import { PlaceholderAction } from "./placeholder";
import { action } from "@storybook/addon-actions";

export const actions: PlaceholderAction[] = [
  {
    id: "add",
    text: "Add",
    href: "/placeholders/add",
  },
  {
    id: "edit",
    text: "Edit",
    onClick: action("on click edit action"),
  },
];
