import React from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Meta, StoryObj } from "@storybook/react";
import { TableList, TableListProps } from "./table-list";
import { action } from "@storybook/addon-actions";
import { BasicModelInstance } from "~/generators";

const maxColumns = 3;

interface TemplateProps<T extends BasicModelInstance> extends TableListProps<T> {
  size: number;
  dataSetType: "Commodity" | "Employee";
}

const DummyTableList = <T extends BasicModelInstance>({
  dataSetType,
  size,
  ...rest
}: TemplateProps<T>) => {
  const { data } = useDemoData({
    dataSet: dataSetType,
    rowLength: size,
    maxColumns,
  });
  const { rows } = data;
  const columns = data.columns.map(({ field, headerName }) => ({
    id: field,
    label: headerName || "invalid",
    sort: true,
    disablePadding: false,
    numeric: false,
  }));

  return (
    <TableList {...rest} columns={columns} data={rows as any} onClick={action("onClick row")} />
  );
};

export default {
  title: "Generators/TableList",
  component: DummyTableList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DummyTableList>;
type Story = StoryObj<typeof DummyTableList>;

export const Default: Story = {
  args: {
    size: 40,
    dataSetType: "Commodity",
    search: true,
  },
};

export const Loading: Story = {
  args: {
    size: 40,
    dataSetType: "Commodity",
    search: true,
    loading: true,
  },
};

export const WihtoutSearch: Story = {
  args: {
    size: 40,
    dataSetType: "Commodity",
    search: false,
  },
};

export const WithOptions: Story = {
  args: {
    size: 40,
    dataSetType: "Commodity",
    search: false,
    options: [
      {
        id: "edit",
        label: "Edit",
        onClick: action("Option edit"),
      },
      {
        id: "remove",
        label: "Remove",
        onClick: action("Option remove"),
      },
    ],
  },
};
