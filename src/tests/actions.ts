import userEvent from "@testing-library/user-event";
import { screen, fireEvent } from "./testing-library";
import { format } from "date-fns";

export const typeNumericInput = (element: HTMLElement, value: number) => {
  fireEvent.change(element, { target: { value } });
};

export const selectOption = async (element: HTMLElement, option: string) => {
  await userEvent.click(element);
  await userEvent.click(screen.getByRole("option", { name: option }));
};

export const selectOptions = async (element: HTMLElement, options: string[]) => {
  await userEvent.click(element);

  for (const option of options) {
    const optionElement = screen.getByRole("option", { name: option });
    await userEvent.click(optionElement);
  }

  const presentation = screen.getByRole("presentation").firstChild;
  presentation && fireEvent.click(presentation);
};

export const clearMultiSelect = async (element: HTMLElement) => {
  await userEvent.click(element);

  const options = screen.queryAllByRole("option", { selected: true });

  for (const option of options) {
    await userEvent.click(option);
  }

  const presentation = screen.getByRole("presentation").firstChild;
  presentation && fireEvent.click(presentation);
};

export const clearCheckbox = async (element: HTMLInputElement) => {
  if (element.checked) {
    await userEvent.click(element);
  }
};

export const pickDatetime = (element: HTMLInputElement, valueArg: Date, fmt: string) => {
  const value = format(valueArg, fmt);
  fireEvent.change(element, { target: { value } });
};
