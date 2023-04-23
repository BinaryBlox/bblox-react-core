/**
 * MODEL TYPES
 * Types used to specify the model
 */
export type ModelFieldTypes =
  | "string"
  | "number"
  | "string[]"
  | "number[]"
  | "boolean"
  | "enum"
  | "multienum"
  | "date"
  | "time"
  | "datetime";

type Base = {
  id: string;
  description: string;
  name: string;
  listable?: boolean;
};

type Breakpoints = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type StringField = {
  type: "string";
};

type StringArrayField = {
  type: "string[]";
};

type NumberField = {
  type: "number";
};

type NumberArrayField = {
  type: "number[]";
};

type BooleanField = {
  type: "boolean";
};

type EnumField = {
  type: "enum";
  value: string[];
};

type MultiEnumField = {
  type: "multienum";
  value: string[];
};

type DateField = {
  type: "date";
  format: string;
  default: Date;
};

type TimeField = {
  type: "time";
  format: string;
  default: Date;
};

type DatetimeField = {
  type: "datetime";
  format: string;
  default: Date;
};

type SingleFields =
  | StringField
  | NumberField
  | StringArrayField
  | NumberArrayField
  | BooleanField
  | EnumField
  | MultiEnumField
  | DateField
  | TimeField
  | DatetimeField;

export type GroupField = {
  type: "group";
  value: (Base & Breakpoints & SingleFields)[];
} & Base;

export type ArrayGroupField = {
  type: "group[]";
  value: (Base & Breakpoints & SingleFields)[];
} & Base;

type Fields = SingleFields | GroupField | ArrayGroupField;
export type ModelField = Base & Breakpoints & Fields;

export type Model = {
  fields: ModelField[];
};

/**
 * INSTANCE TYPES
 * Types used to represent an instance of a model specification
 */
export type BaseFieldType = string | number | boolean | Date;
export type ArrayFieldType = string[] | number[];
export type SingleFieldType = BaseFieldType | ArrayFieldType;
export type GroupInstanceType = { [key: string]: SingleFieldType };
export type ArrayInstanceType = { [key: string]: SingleFieldType }[];
export type FieldType = SingleFieldType | GroupInstanceType;

export interface BasicModelInstance {
  id: string;
  [key: string]: FieldType;
}

/**
 * UTILITIES
 * Some functions used in several places to help to manage models
 */
const InitialStateZeroValue: Record<ModelFieldTypes | "group" | "group[]", FieldType | undefined> =
  {
    string: "",
    number: 0,
    boolean: false,
    enum: "",
    multienum: [],
    date: new Date(1970, 0, 1, 0, 0),
    time: new Date(1970, 0, 1, 0, 0),
    datetime: new Date(1970, 0, 1, 0, 0),
    group: {},
    "group[]": [],
    "string[]": [],
    "number[]": [],
  };

const getFieldValueOrZero = (
  field: ModelField,
  values: BasicModelInstance | GroupInstanceType | undefined,
) => {
  return (
    (values && values[field.id]) ||
    ("default" in field && field.default) ||
    InitialStateZeroValue[field.type]
  );
};

export const newInstanceFromValuesOrZeroValue = <T extends BasicModelInstance>(
  model: Model,
  values: T | undefined = undefined,
): T => {
  const obj: Record<string, FieldType | undefined> = {};

  model.fields.forEach((field) => {
    if (field.type === "group") {
      const value: GroupInstanceType = {};
      field.value.forEach((groupField) => {
        value[groupField.id] = getFieldValueOrZero(
          groupField,
          values && (values[field.id] as GroupInstanceType),
        ) as SingleFieldType;
      });
      obj[field.id] = value;
    } else {
      obj[field.id] = getFieldValueOrZero(field, values);
    }
  });

  return obj as T;
};
