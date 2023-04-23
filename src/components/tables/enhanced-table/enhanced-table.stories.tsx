import { Meta, StoryObj } from "@storybook/react";
import { TestTable, columns, data } from "./enhanced-table.mock";

export default {
  title: "Components/Tables/EnhancedTable",
  component: TestTable,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TestTable>;
type Story = StoryObj<typeof TestTable>;

export const Default: Story = {
  args: {
    columns,
    data,
    defaultSort: "startDate",
    defaultOrder: "asc",
  },
};
