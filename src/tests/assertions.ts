import { AlertColor } from "@mui/material";
import { BasicModelInstance, GroupInstanceType, ModelField } from "../generators";
import { screen, waitForElementToBeRemoved } from "./testing-library";
import { format } from "date-fns";
import { MockInstance } from "../generators/generators.mock";

export const expectContentPlaceholder = async () => {
  expect(await screen.findByTestId(/content-placeholder-test/i)).toBeInTheDocument();
};

export const assertDatetimeInputValue = (
  element: HTMLElement,
  { value, fmt, addSpaces = false }: { value: Date; fmt: string; addSpaces?: boolean },
) => {
  let expectedDateValue = format(value, fmt).replace(/ /g, "⁩ ⁦");

  if (addSpaces) {
    expectedDateValue = expectedDateValue.replace(/\//g, " / ").replace(/-/g, " - ");
  }
  expect(element).toHaveValue(expectedDateValue);
};

export const expectModelFieldInputExist = (fields: ModelField[]) => {
  fields.forEach((field) => {
    if (field.type === "group") {
      expectModelFieldInputExist(field.value);
    } else if (field.type === "number") {
      expect(screen.getByRole("spinbutton", { name: field.name })).toBeInTheDocument();
    } else if (field.type === "boolean") {
      expect(screen.getByRole("checkbox", { name: field.name })).toBeInTheDocument();
    } else if (field.type === "enum" || field.type === "multienum") {
      expect(
        screen.getByRole("button", { name: new RegExp(field.name.toLowerCase(), "i") }),
      ).toBeInTheDocument();
    } else if (field.type !== "group[]") {
      expect(screen.getByRole("textbox", { name: field.name })).toBeInTheDocument();
    }
  });
};

export const expectModelFieldInputValue = (
  fields: ModelField[],
  initialValues: BasicModelInstance | GroupInstanceType,
) => {
  fields.forEach((field) => {
    const value = initialValues[field.id];
    if (field.type === "group") {
      expectModelFieldInputValue(field.value, value as GroupInstanceType);
    } else if (field.type === "number") {
      expect(screen.getByDisplayValue(value as number)).toBeInTheDocument();
    } else if (field.type === "boolean") {
      expect(
        screen.getByRole("checkbox", { name: field.name, checked: value as boolean }),
      ).toBeInTheDocument();
    } else if (field.type === "date" || field.type === "time" || field.type === "datetime") {
      assertDatetimeInputValue(screen.getByRole("textbox", { name: field.name }), {
        value: value as Date,
        fmt: field.format,
        addSpaces: true,
      });
    } else if (field.type === "group[]") {
      // Ignore group[] cases
    } else if (field.type.includes("[]")) {
      expect(screen.getByRole("textbox", { name: field.name })).toHaveValue(
        (value as any[]).join(","),
      );
    } else {
      expect(screen.getByDisplayValue(value.toString())).toBeInTheDocument();
    }
  });
};

export const expectModelFieldValue = (
  field: ModelField,
  instance: BasicModelInstance | GroupInstanceType,
) => {
  const { id, type, name, description } = field;
  const value = instance[id];

  if (type === "group") {
    expect(screen.getByRole("heading", { level: 1, name }));
    expect(screen.getByRole("heading", { level: 2, name: description }));
    field.value.forEach((groupValue) =>
      expectModelFieldValue(groupValue, value as GroupInstanceType),
    );
    return;
  }

  expect(screen.getByRole("label", { name: name })).toBeInTheDocument();
  if (type === "boolean") {
    expect(screen.getByTestId(value ? "CheckIcon" : "CloseIcon")).toBeInTheDocument();
  } else if (type === "date" || type === "time" || type === "datetime") {
    const formatedValue = format(value as Date, field.format);
    expect(screen.getByLabelText(name)).toHaveTextContent(formatedValue);
  } else {
    expect(screen.getByLabelText(name)).toHaveTextContent(value as string);
  }
};

export const expectProgressIndicator = () => {
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
};

export const waitForProgressIndicatorToBeRemoved = async () => {
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
};

export const waitForProgressFinish = async () => {
  await screen.findByRole("progressbar");
  await waitForProgressIndicatorToBeRemoved();
};

export const expectAlert = async ({
  title,
  message,
  severity,
}: {
  title?: RegExp | string;
  message: RegExp | string;
  severity: AlertColor;
}) => {
  const alertElement = await screen.findByRole("alert");
  expect(alertElement).toBeInTheDocument();
  expect(alertElement).toHaveAttribute("aria-label", severity);
  title && expect(await screen.findByText(title)).toBeInTheDocument();
  expect(await screen.findByText(message)).toBeInTheDocument();
};

export const expectToHaveBeenCalledOnceWithMockInstance = (
  mockFn: jest.Mock,
  instance: MockInstance,
) => {
  expect(mockFn).toHaveBeenCalledTimes(1);

  const calledReturnTime: Date = mockFn.mock.calls[0][0].car.returnTime;
  const calledTradeDate: Date = mockFn.mock.calls[0][0].tradeDate;

  expect(mockFn).toHaveBeenCalledWith({
    id: instance.id,
    firstName: instance.firstName,
    middleName: instance.middleName,
    lastName: instance.lastName,
    gender: instance.gender,
    age: instance.age,
    birthDate: instance.birthDate,
    car: {
      model: instance.car.model,
      manufacturer: instance.car.manufacturer,
      color: instance.car.color,
      type: instance.car.type,
      vin: instance.car.vin,
      vrm: instance.car.vrm,
      returnTime: new Date(
        calledReturnTime.getFullYear(),
        calledReturnTime.getMonth(),
        calledReturnTime.getDate(),
        instance.car.returnTime.getHours(),
        instance.car.returnTime.getMinutes(),
        calledReturnTime.getSeconds(),
        calledReturnTime.getMilliseconds(),
      ),
    },
    quantity: instance.quantity,
    available: instance.available,
    currency: instance.currency,
    tradeDate: new Date(
      instance.tradeDate.getFullYear(),
      instance.tradeDate.getMonth(),
      instance.tradeDate.getDate(),
      instance.tradeDate.getHours(),
      instance.tradeDate.getMinutes(),
      calledTradeDate.getSeconds(),
      calledTradeDate.getMilliseconds(),
    ),
    codes: instance.codes,
    identifiers: instance.identifiers.map((i) => i.toString()),
  });
};

export enum AssertCloseDateUpTo {
  Year = 1,
  Month = 2,
  Day = 3,
  Hour = 4,
  Minute = 5,
  Seconds = 6,
  Milliseconds = 7,
}
export const assertCloseDate = (date: Date, expectedDate: Date, upTo: AssertCloseDateUpTo) => {
  if (upTo >= AssertCloseDateUpTo.Year) {
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
  }
  if (upTo >= AssertCloseDateUpTo.Month) {
    expect(date.getMonth()).toBe(expectedDate.getMonth());
  }
  if (upTo >= AssertCloseDateUpTo.Day) {
    expect(date.getDay()).toBe(expectedDate.getDay());
  }
  if (upTo >= AssertCloseDateUpTo.Hour) {
    expect(date.getHours()).toBe(expectedDate.getHours());
  }
  if (upTo >= AssertCloseDateUpTo.Minute) {
    expect(date.getMinutes()).toBe(expectedDate.getMinutes());
  }
  if (upTo >= AssertCloseDateUpTo.Seconds) {
    expect(date.getSeconds()).toBe(expectedDate.getSeconds());
  }
  if (upTo >= AssertCloseDateUpTo.Milliseconds) {
    expect(date.getMilliseconds()).toBe(expectedDate.getMilliseconds());
  }
};
