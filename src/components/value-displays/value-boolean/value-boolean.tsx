import { Box, IconButton, Switch, Typography, useTheme } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  BaseValueProps,
  DefaultPlaceholder,
  EditableValueProps,
  useEditableValueDisplay,
  ValueEditButtons,
} from "../value-base";
import { ValueContent } from "../value-content";
import EditIcon from "@mui/icons-material/Edit";

export type ValueBooleanProps = BaseValueProps<boolean> & EditableValueProps<boolean>;

/**
 * Displays a boolean value with a label
 */
export const ValueBoolean = ({
  label,
  value,
  placeholder = DefaultPlaceholder,
  editable,
  dense,
  onEdit = () => null,
}: ValueBooleanProps) => {
  const { typography } = useTheme();
  const { isEditing, editValue, startEdit, cancelEdit, setEditValue, submitEdit } =
    useEditableValueDisplay(value, onEdit);

  const iconSx = { fontSize: dense ? typography.h6.fontSize : typography.h5.fontSize };

  return (
    <ValueContent label={label} dense={dense}>
      {isEditing ? (
        <Box display="flex" alignItems="center">
          <Switch checked={editValue} onChange={(e) => setEditValue(e.target.checked)} />
          <ValueEditButtons onClickCancel={cancelEdit} onSubmitEdit={submitEdit} />
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          {value === undefined ? (
            <Typography variant="h5">{placeholder}</Typography>
          ) : value ? (
            <CheckIcon color="success" sx={iconSx} />
          ) : (
            <CloseIcon color="error" sx={iconSx} />
          )}
          {editable && (
            <IconButton size="small" onClick={startEdit} sx={{ ml: 1 }}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      )}
    </ValueContent>
  );
};
