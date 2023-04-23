import React from "react";
import { EnhancedTable } from ".";
import { TableCell, TableRow } from "@mui/material";
import { HeadCell, Order } from "./enhanced-table-head";

export const columns: HeadCell<Data>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Garmin ID",
    sort: true,
  },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Date",
    sort: true,
  },
];

export interface Data {
  id: number;
  name: string;
  startDate: string;
}

export const data: Data[] = [
  {
    id: 2,
    name: "HIIT",
    startDate: "11/04/2022",
  },
  {
    id: 1,
    name: "on/off x 1",
    startDate: "05/04/2022",
  },
  {
    id: 3,
    name: "EMOM 30'",
    startDate: "07/04/2022",
  },
  {
    id: 4,
    name: "Tabata",
    startDate: "09/04/2022",
  },
  {
    id: 5,
    name: "AMRAPx2",
    startDate: "10/04/2022",
  },
];

export interface TestTableProps {
  data: Data[];
  columns: HeadCell<Data>[];
  defaultSort: keyof Data;
  defaultOrder: Order;
  loading: boolean;
}

export const TestTable = ({
  data,
  columns,
  defaultOrder,
  defaultSort,
  loading,
}: TestTableProps) => {
  return (
    <EnhancedTable
      search
      data={data}
      columns={columns}
      defaultSort={defaultSort}
      defaultOrder={defaultOrder}
      loading={loading}
    >
      {(data) =>
        data.map((d) => (
          <TableRow key={d.id}>
            <TableCell>{d.name}</TableCell>
            <TableCell>{d.id}</TableCell>
            <TableCell>{d.startDate}</TableCell>
          </TableRow>
        ))
      }
    </EnhancedTable>
  );
};
