import { Box, Button, Paper, SxProps, Theme, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Markdown } from "../markdown";

export type BoardProps = PropsWithChildren<{
  markdown?: string;
  content?: string | string[];
  spacing?: 0 | 1 | 2 | 3 | 4 | 5;
  timeoutCopyText?: number;
  sx?: SxProps<Theme>;
}>;

export const Board = ({
  markdown: markdownProps,
  content: contentProp,
  spacing = 0,
  timeoutCopyText = 2000,
  children,
  sx,
}: BoardProps) => {
  const [copyText, setCopyText] = useState("Copy");
  let copyContent: string;
  let content: ReactNode;

  if (markdownProps) {
    copyContent = markdownProps || "";
  } else if (Array.isArray(contentProp)) {
    content = contentProp.map((line, i) => (
      <Typography key={i} sx={{ pb: spacing }}>
        {line}
      </Typography>
    ));
    copyContent = contentProp.join("\n");
  } else {
    content = <Typography>{contentProp}</Typography>;
    copyContent = contentProp || "";
  }

  const markdown = markdownProps && <Markdown content={markdownProps} />;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyContent);
    setCopyText("Copied!");

    setTimeout(() => setCopyText("Copy"), timeoutCopyText);
  };

  return (
    <Paper sx={{ p: 2, backgroundColor: blueGrey[800], color: "white", ...sx }}>
      <Box display="flex" flexDirection="row">
        <Box width={1}>{children || markdown || content}</Box>
        <Box width={100} sx={{ ml: 1 }}>
          {copyContent && (
            <Button fullWidth color="inherit" size="small" variant="outlined" onClick={handleCopy}>
              {copyText}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
