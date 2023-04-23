import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import React from "react";

export interface DatatablePlaceholderProps {
  rowLength?: number;
  maxColumns?: number;
  dataSet?: "Commodity" | "Employee";
  height?: number;
}

export const DatatablePlaceholder = ({
  rowLength = 1000,
  maxColumns = 10,
  height = 400,
  dataSet = "Commodity",
}: DatatablePlaceholderProps) => {
  const {
    data: { rows, columns },
  } = useDemoData({
    dataSet,
    rowLength,
    maxColumns,
  });

  return (
    <Box sx={{ height, width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns as any}
        checkboxSelection
        autoPageSize
        disableRowSelectionOnClick
      />
    </Box>
  );
};
