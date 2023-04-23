import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  ChipTypeMap,
} from "@mui/material";
import React from "react";
import { TextField } from "../text-field";

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    "renderInput" | "onChange" | "color"
  > {
  label: string;
  helperText?: string;
  color?: string;
  fetching?: boolean;
  onChangeValue?: (value: T) => void;
}

export const Autocomplete = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
>(
  props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
) => {
  const {
    label,
    loading,
    fetching,
    options,
    helperText,
    color,
    onChangeValue = () => null,
    sx,
    ...rest
  } = props;
  const loadingOrFetching = loading || fetching;

  return (
    <MuiAutocomplete
      loading={loadingOrFetching}
      options={fetching ? [] : options}
      onChange={(_, value) => onChangeValue(value as T)}
      {...(rest as any)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          fetching={fetching}
          loading={loading}
          hexColor={color}
          helperText={helperText}
        />
      )}
      sx={sx}
    />
  );
};
