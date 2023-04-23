import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import {
  BaseValueProps,
  DefaultPlaceholder,
  EditableValueProps,
} from "../value-base/value-displays.types";
import { getValueContentLabelId, ValueContent } from "../value-content";
import { useEditableValueDisplay, ValueEditButtons } from "../value-base";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";

export type EditInputType = "datetime" | "date" | "time";

export interface ValueDatetimeProps extends BaseValueProps<Date>, EditableValueProps<Date> {
  /**
   * Datetime format
   */
  format: string;

  /**
   * Edit input type
   */
  editInputType?: EditInputType;
}

/**
 * Displays a formated datetime with a label
 */
export const ValueDatetime = ({
  label,
  value: valueProp,
  format: fmt,
  placeholder = DefaultPlaceholder,
  editable,
  editInputType = "datetime",
  dense,
  onEdit = () => null,
}: ValueDatetimeProps) => {
  const { isEditing, editValue, startEdit, cancelEdit, setEditValue, submitEdit } =
    useEditableValueDisplay(valueProp, onEdit);
  const id = getValueContentLabelId(label);
  const value = (valueProp && format(valueProp, fmt)) || placeholder;

  const EditPickerComponent =
    editInputType === "datetime"
      ? DateTimePicker
      : editInputType === "time"
      ? TimePicker
      : DatePicker;

  return (
    <ValueContent label={label} tooltip={value} dense={dense}>
      {isEditing ? (
        <EditPickerComponent
          value={editValue}
          format={fmt}
          onChange={(newValue) => setEditValue(newValue ? newValue : undefined)}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps?.endAdornment}
                      <ValueEditButtons
                        onClickCancel={cancelEdit}
                        onSubmitEdit={submitEdit}
                        sx={{ ml: 2 }}
                      />
                    </>
                  ),
                }}
              />
            ),
          }}
        />
      ) : (
        <Box display="flex" alignItems="center">
          <Typography variant={dense ? "body1" : "h5"} noWrap aria-labelledby={id}>
            {value}
          </Typography>
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
