import React, { ReactNode, useId } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  Select as MuiSelect,
  styled,
} from "@mui/material";
import { CenterContainer } from "../../containers/center-container";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

export type SelectSize = "small" | "medium";

export interface SelectProps<T> {
  label: string;
  value: T;
  loading?: boolean;
  fetching?: boolean;
  size?: SelectSize;
  color?: string;
  fullWidth?: boolean;
  children?: ReactNode;
  onChange?: SelectInputProps<T>["onChange"];
}

const ProgressSize: Record<SelectSize, number> = {
  small: 15,
  medium: 20,
};

export const Select = <T extends ReactNode>({
  label,
  value,
  loading = false,
  fetching = false,
  size = "medium",
  fullWidth = false,
  color,
  children,
  onChange,
}: SelectProps<T>) => {
  const id = useId();

  const renderValue = (value: T): ReactNode => {
    if (fetching) {
      return (
        <CenterContainer centerVertical centerHorizontal>
          <CircularProgress color="inherit" size={ProgressSize[size]} />
        </CenterContainer>
      );
    }

    if (loading) {
      return (
        <Box display="flex" flexDirection="column">
          {value}
          <LinearProgress
            color="inherit"
            sx={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
          />
        </Box>
      );
    }

    return value;
  };

  const StyledFormControl = styled(FormControl)(() => {
    if (!color) {
      return {};
    }

    return {
      label: {
        color,
      },
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: `${color} !important`,
      },
      ".MuiInputBase-root": {
        color,
      },
      ".MuiSelect-icon": {
        fill: color,
      },
    };
  });

  return (
    <StyledFormControl fullWidth={fullWidth}>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        disabled={fetching}
        size={size}
        renderValue={renderValue}
      >
        {children}
      </MuiSelect>
    </StyledFormControl>
  );
};
