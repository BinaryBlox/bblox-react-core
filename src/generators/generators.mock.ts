import { BasicModelInstance, FieldType, Model, ModelField } from "./generators.model";
import { faker } from "@faker-js/faker";
import * as R from "ramda";
import { newArrayWithSize } from "../utils";

export const BirthDateFormat = "dd/MM/yyyy";
export const ReturnTimeFormat = "HH:mm";
export const TradeDateFormat = "dd/MM/yyyy HH:mm";
export const mockModel: Model = {
  fields: [
    {
      id: "id",
      type: "string",
      description: "User identifier",
      name: "Id",
      xs: 12,
      sm: 6,
      md: 4,
      listable: false,
    },
    {
      id: "firstName",
      type: "string",
      description: "User first name",
      name: "First name",
      xs: 12,
      sm: 6,
      md: 4,
      listable: true,
    },
    {
      id: "middleName",
      type: "string",
      description: "User middle name",
      name: "Middle name",
      xs: 12,
      sm: 6,
      md: 4,
      listable: true,
    },
    {
      id: "lastName",
      type: "string",
      description: "User last name",
      name: "Last name",
      xs: 12,
      sm: 6,
      md: 4,
      listable: true,
    },
    {
      id: "gender",
      type: "enum",
      value: faker.definitions.name?.gender || [],
      description: "User gender",
      name: "Gender",
      xs: 12,
      sm: 6,
      md: 3,
    },
    {
      id: "age",
      type: "number",
      description: "User age",
      name: "Age",
      xs: 12,
      sm: 6,
      md: 3,
      listable: false,
    },
    {
      id: "birthDate",
      type: "date",
      format: BirthDateFormat,
      default: new Date(2014, 8, 18),
      description: "When he was born",
      name: "Birth Date",
      xs: 12,
      sm: 6,
      md: 6,
      listable: false,
    },
    {
      id: "car",
      type: "group",
      description: "Information about the user car",
      name: "User car",
      xs: 12,
      value: [
        {
          id: "model",
          type: "enum",
          value: faker.definitions.vehicle?.model || [],
          description: "Lorem ipsum",
          name: "Model",
          xs: 12,
          sm: 5,
        },
        {
          id: "manufacturer",
          type: "enum",
          value: faker.definitions.vehicle?.manufacturer || [],
          description: "Lorem ipsum",
          name: "Manufacturer",
          xs: 12,
          sm: 5,
        },
        {
          id: "color",
          type: "string",
          description: "Lorem ipsum",
          name: "Color",
          xs: 12,
          sm: 2,
        },
        {
          id: "type",
          type: "multienum",
          value: faker.definitions.vehicle?.type || [],
          description: "Lorem ipsum",
          name: "Type",
          xs: 12,
          sm: 3,
        },
        {
          id: "vin",
          type: "string",
          description: "Lorem ipsum",
          name: "VIN",
          xs: 12,
          sm: 5,
        },
        {
          id: "vrm",
          type: "string",
          description: "Lorem ipsum",
          name: "VRM",
          xs: 12,
          sm: 4,
        },
        {
          id: "returnTime",
          type: "time",
          format: ReturnTimeFormat,
          default: new Date(2022, 8, 21, 9, 0),
          description: "Lorem ipsum",
          name: "Return time",
          xs: 12,
          sm: 4,
        },
      ],
    },
    {
      id: "quantity",
      type: "number",
      description: "Lorem ipsum",
      name: "Q",
      xs: 12,
      sm: 2,
      md: 1,
    },
    {
      id: "available",
      type: "boolean",
      description: "Lorem ipsum",
      name: "Available",
      xs: 12,
      sm: 2,
    },
    {
      id: "currency",
      type: "string",
      description: "Lorem ipsum",
      name: "Unit Price Currency",
      xs: 12,
      sm: 3,
    },
    {
      id: "tradeDate",
      type: "datetime",
      format: TradeDateFormat,
      default: new Date(2022, 8, 12, 9, 0),
      description: "Lorem ipsum",
      name: "Trade date",
      xs: 12,
      sm: 5,
    },
    {
      id: "codes",
      type: "string[]",
      description: "Lorem ipsum",
      name: "Codes",
      xs: 12,
      sm: 5,
    },
    {
      id: "identifiers",
      type: "number[]",
      description: "Lorem ipsum",
      name: "Identifiers",
      xs: 12,
      sm: 4,
    },
  ],
};

export interface MockInstance {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  age: number;
  birthDate: Date;
  car: {
    model: string;
    manufacturer: string;
    color: string;
    type: string[];
    vin: string;
    vrm: string;
    returnTime: Date;
  };
  quantity: number;
  available: boolean;
  currency: string;
  tradeDate: Date;
  [key: string]: FieldType;
  codes: string[];
  identifiers: string[];
}

const mockFieldValue: Record<string, () => FieldType> = {
  id: () => faker.datatype.number({ min: 1000, max: 100000 }).toString(),
  firstName: faker.name.firstName,
  middleName: faker.name.middleName,
  lastName: faker.name.lastName,
  gender: faker.name.gender,
  age: () => faker.datatype.number({ min: 20, max: 60 }),
  birthDate: () => new Date(2019, 3, 2),
  returnTime: () => new Date(2022, 10, 2, 11, 0),
  model: faker.vehicle.model,
  manufacturer: faker.vehicle.manufacturer,
  color: faker.vehicle.color,
  type: () => {
    const array = newArrayWithSize(faker.datatype.number({ min: 2, max: 5 }), 0);
    const result = array.map(() => faker.vehicle.type());
    return R.uniq(result);
  },
  vin: faker.vehicle.vin,
  vrm: faker.vehicle.vrm,
  quantity: () => faker.datatype.number({ min: 1, max: 9 }),
  available: faker.datatype.boolean,
  currency: () => "MXN",
  tradeDate: () => new Date(2012, 2, 11, 8, 25),
  codes: () => [faker.word.noun(), faker.word.noun(), faker.word.noun()],
  identifiers: () => [faker.datatype.number(), faker.datatype.number(), faker.datatype.number()],
};

export const createModelInstance = <T extends BasicModelInstance>(model: Model, seed = 100): T => {
  faker.seed(seed);
  return model.fields.reduce((acc, field) => {
    if (field.type === "group") {
      return {
        ...acc,
        [field.id]: field.value.reduce(
          (acc, groupField) => ({
            ...acc,
            [groupField.id]: getModelFieldValue(groupField),
          }),
          {},
        ),
      };
    } else if (field.type === "group[]") {
      const numElements = faker.datatype.number({ min: 2, max: 5 });
      return {
        ...acc,
        [field.id]: new Array(numElements).fill(0).map(() =>
          field.value.reduce(
            (acc, arrayField) => ({
              ...acc,
              [arrayField.id]: getModelFieldValue(arrayField),
            }),
            {},
          ),
        ),
      };
    } else {
      return {
        ...acc,
        [field.id]: getModelFieldValue(field),
      };
    }
  }, {} as T);
};

/*

*/

const getModelFieldValue = ({ id }: ModelField): FieldType => {
  const fieldGenerator = mockFieldValue[id];
  if (!fieldGenerator) {
    return faker.datatype.string();
  }
  return fieldGenerator();
};
