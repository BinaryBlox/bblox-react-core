import React from "react";
import { TableSortLabel, TableRow, Box, TableCell, TableHead } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export type Order = "asc" | "desc";
export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
  sort: boolean;
}

interface EnhancedTableHeadProps<T> {
  onRequestSort: (property: keyof T) => void;
  order: Order;
  orderBy: keyof T;
  headCells: HeadCell<T>[];
}

export const EnhancedTableHead = <T,>({
  order,
  orderBy,
  headCells,
  onRequestSort,
}: EnhancedTableHeadProps<T>) => {
  const createSortHandler = (property: keyof T) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            variant="head"
            key={String(headCell.id)}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
          >
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
