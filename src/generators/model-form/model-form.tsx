import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
import React, { ChangeEvent, FormEvent, ReactElement, useMemo } from "react";
import { useState } from "react";
import { useGetDefaultThemeColor } from "../../utils/theme";
import {
  Model,
  ModelField,
  BasicModelInstance,
  ModelFieldTypes,
  GroupInstanceType,
  FieldType,
  ArrayFieldType,
  newInstanceFromValuesOrZeroValue,
} from "../generators.model";

export interface ModelFormProps<T extends BasicModelInstance> {
  model: Model;
  initialValues?: T;
  saveButtonText: string;
  onSubmit: (values: T) => void;
}

export const ModelForm = <T extends BasicModelInstance>({
  model,
  saveButtonText,
  onSubmit,
  initialValues,
}: ModelFormProps<T>) => {
  const valuesInitialState = useMemo(
    () => newInstanceFromValuesOrZeroValue<T>(model, initialValues),
    [model, initialValues],
  );
  const [values, setValues] = useState<T>(valuesInitialState);

  const setKeyValue = (name: string, key: string | undefined, value: FieldType | null) => {
    setValues((v) => {
      const n: Record<string, FieldType | null> = {};
      if (key) {
        n[key] = {
          ...(v[key] as GroupInstanceType),
          [name]: value,
        } as GroupInstanceType;
      } else {
        n[name] = value;
      }

      return { ...v, ...n };
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, key: string | undefined) => {
    e.preventDefault();
    setKeyValue(e.target.name, key, e.target.checked);
  };

  const handleSelectChange = (e: SelectChangeEvent<FieldType>, key: string | undefined) => {
    e.preventDefault();
    setKeyValue(e.target.name, key, e.target.value);
  };

  const handleMultiSelectChange = (e: SelectChangeEvent<FieldType>, key: string | undefined) => {
    e.preventDefault();
    const { value } = e.target;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setKeyValue(e.target.name, key, newValue);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string | undefined,
    type: ModelFieldTypes,
  ) => {
    e.preventDefault();

    let value: string | number | string[] | number[] = e.target.value;
    if (type === "number" && typeof value === "string") {
      value = parseInt(e.target.value, 10);
    } else if (type.includes("[]")) {
      value = e.target.value.split(",");
    }
    setKeyValue(e.target.name, key, value);
  };

  const handleDateChange = (value: FieldType | null, key: string | undefined, id: string) => {
    setKeyValue(id, key, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  const renderField = (field: ModelField, key: string | undefined = undefined) => {
    const defaultColor = useGetDefaultThemeColor({ lightWeight: 200, darkWeight: 800 });

    const { id, type, name, description, xs, sm, md, lg, xl } = field;

    let fieldInput: ReactElement;
    const value = key ? (values[key] as GroupInstanceType)[id] : values[id];
    if (type === "group") {
      fieldInput = (
        <Paper>
          <Box bgcolor={defaultColor} px={2} py={1} mb={2}>
            <Typography variant="h6" role="heading" aria-level={1}>
              {name}
            </Typography>
            <Typography variant="body2" role="heading" aria-level={2}>
              {description}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {field.value.map((f) => renderField(f, id))}
          </Grid>
        </Paper>
      );
    } else if (type === "boolean") {
      fieldInput = (
        <Box sx={{ height: 1, display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                name={id}
                onChange={(e) => handleCheckboxChange(e, key)}
                checked={value as boolean}
              />
            }
            label={name}
          />
        </Box>
      );
    } else if (type === "enum") {
      fieldInput = (
        <FormControl fullWidth>
          <InputLabel id={`${id}-select-label`}>{name}</InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={value}
            label={name}
            name={id}
            onChange={(e) => handleSelectChange(e, key)}
            required
          >
            {field.value.map((fieldValue) => (
              <MenuItem key={fieldValue} value={fieldValue}>
                {fieldValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (type === "multienum") {
      fieldInput = (
        <FormControl fullWidth>
          <InputLabel id={`${id}-select-label`}>{name}</InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={value || []}
            renderValue={(selected) => (selected as ArrayFieldType).join(", ")}
            label={name}
            name={id}
            onChange={(e) => handleMultiSelectChange(e, key)}
            required
            multiple
          >
            {field.value.map((fieldValue) => (
              <MenuItem key={fieldValue} value={fieldValue}>
                <Checkbox checked={((value as any[]) || []).includes(fieldValue)} />
                <ListItemText primary={fieldValue} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (type === "date") {
      fieldInput = (
        <DesktopDatePicker
          label={name}
          format={field.format}
          value={value}
          onChange={(value) => handleDateChange(value, key, id)}
        />
      );
    } else if (type === "time") {
      fieldInput = (
        <TimePicker
          label={name}
          format={field.format}
          value={value}
          onChange={(value) => handleDateChange(value, key, id)}
        />
      );
    } else if (type === "datetime") {
      fieldInput = (
        <DateTimePicker
          label={name}
          format={field.format}
          value={value}
          onChange={(value) => handleDateChange(value, key, id)}
        />
      );
    } else if (type === "group[]") {
      return null;
    } else if (type.includes("[]")) {
      fieldInput = (
        <TextField
          required
          type="text"
          label={name}
          name={id}
          variant="outlined"
          helperText="Use comas to separate multiple values"
          fullWidth
          value={(value as any[]).join(",")}
          onChange={(e) => handleInputChange(e, key, type)}
        />
      );
    } else {
      fieldInput = (
        <TextField
          required
          type={type}
          label={name}
          name={id}
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => handleInputChange(e, key, type)}
        />
      );
    }

    return (
      <Grid item key={id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {fieldInput}
      </Grid>
    );
  };

  return (
    <Grid container component="form" spacing={2} onSubmit={handleSubmit}>
      {model.fields.map((f) => renderField(f))}
      <Grid item xs={12}>
        <Button type="submit" variant="contained">
          {saveButtonText}
        </Button>
      </Grid>
    </Grid>
  );
};
