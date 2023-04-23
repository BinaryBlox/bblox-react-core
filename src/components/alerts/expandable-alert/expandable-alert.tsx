import {
  Alert,
  alertClasses,
  AlertColor,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useState } from "react";
import React from "react";
import { Board } from "~/components/data-display";

export interface ExpandableAlertProps {
  severity: AlertColor;
  iconMapping?: Partial<Record<AlertColor, React.ReactNode>>;
  title?: string;
  message: string;
  metadata?: string | string[];
  onClose: () => void;
}

const alertSx = {
  [`& .${alertClasses.message}`]: {
    width: 1,
  },
};

export const ExpandableAlert = forwardRef<any, ExpandableAlertProps>(
  ({ severity, iconMapping, title, message, metadata, onClose }, ref) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <Alert
        ref={ref}
        severity={severity}
        iconMapping={iconMapping}
        onClose={onClose}
        action={
          <Box display="flex" flexDirection="column">
            <IconButton color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            {metadata && (
              <IconButton color="inherit" onClick={() => setExpanded((e) => !e)}>
                {expanded ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            )}
          </Box>
        }
        sx={alertSx}
      >
        <Box sx={{ w: 1 }}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
          {metadata && (
            <Collapse in={expanded} sx={{ mt: 2 }}>
              <Board content={metadata} />
            </Collapse>
          )}
        </Box>
      </Alert>
    );
  },
);
