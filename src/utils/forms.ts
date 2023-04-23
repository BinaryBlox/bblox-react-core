import { FormEvent } from "react";

export const getFormData = <T>(e: FormEvent<HTMLFormElement>): T => {
  const data = new FormData(e.currentTarget);
  const rawData: Record<string, any> = {};

  data.forEach((value, key) => {
    rawData[key] = value;
  });
  return rawData as T;
};
