import React from "react";
import { Box } from "@mui/material";
import { useTab } from "~/providers";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | number[];
}

export function TabPanel({ children, index }: TabPanelProps) {
  const [value] = useTab();
  let isTab = value === index;
  if (Array.isArray(index)) {
    isTab = index.includes(value);
  }

  return (
    <div
      role="tabpanel"
      hidden={!isTab}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {isTab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
