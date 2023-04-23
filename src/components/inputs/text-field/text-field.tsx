import {
  autocompleteClasses,
  CircularProgress,
  circularProgressClasses,
  FormControl,
  FormHelperText,
  iconButtonClasses,
  InputAdornment,
  InputLabel,
  inputLabelClasses,
  LinearProgress,
  linearProgressClasses,
  OutlinedInput,
  outlinedInputClasses,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { unstable_useId as useId } from "@mui/utils";
import React from "react";

export type TextFieldProps = MuiTextFieldProps & {
  fetching?: boolean;
  loading?: boolean;
  hexColor?: string;
};

export const TextField = ({
  id: overrideId,
  label,
  InputLabelProps,
  InputProps,
  fetching,
  loading,
  helperText,
  hexColor,
  size,
  fullWidth,
  sx,
  ...rest
}: TextFieldProps) => {
  const id = useId(overrideId);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const hexColorSx = hexColor
    ? {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: `${hexColor} !important`,
        },
        [`& .${inputLabelClasses.root}`]: {
          color: hexColor,
        },
        [`& .${outlinedInputClasses.input}`]: {
          color: hexColor,
        },
        [`& .${circularProgressClasses.root}`]: {
          color: hexColor,
        },
        [`& .${linearProgressClasses.bar}`]: {
          backgroundColor: hexColor,
        },
        [`& .${autocompleteClasses.endAdornment} .${iconButtonClasses.root}`]: {
          color: hexColor,
        },
      }
    : {};

  return (
    <FormControl sx={hexColorSx} fullWidth={fullWidth}>
      <InputLabel
        size={size === "small" ? "small" : "normal"}
        id={inputLabelId}
        htmlFor={id}
        {...InputLabelProps}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        {...InputProps}
        id={id}
        label={label}
        size={size}
        fullWidth={fullWidth}
        endAdornment={
          <InputAdornment position="end">
            {InputProps?.endAdornment}
            {fetching ? <CircularProgress color="inherit" size={20} sx={{ ml: 1 }} /> : null}
          </InputAdornment>
        }
        sx={sx}
        {...(rest as any)}
      />
      {loading && (
        <LinearProgress
          color="inherit"
          sx={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        />
      )}
      {helperText && <FormHelperText id={helperTextId}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
