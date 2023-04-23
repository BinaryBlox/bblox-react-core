import { createModelInstance, mockModel } from "./generators.mock";
import { newInstanceFromValuesOrZeroValue } from "./generators.model";

describe("utilities", () => {
  describe("newInstanceFromValuesOrZeroValue", () => {
    it("would create a zero value instance if no values are provided", () => {
      const instance = newInstanceFromValuesOrZeroValue(mockModel);

      expect(instance).toStrictEqual({
        age: 0,
        available: false,
        birthDate: new Date(2014, 8, 18),
        car: {
          color: "",
          manufacturer: "",
          model: "",
          returnTime: new Date(2022, 8, 21, 9, 0),
          type: [],
          vin: "",
          vrm: "",
        },
        currency: "",
        firstName: "",
        gender: "",
        id: "",
        lastName: "",
        middleName: "",
        quantity: 0,
        tradeDate: new Date(2022, 8, 12, 9, 0),
        codes: [],
        identifiers: [],
      });
    });

    it("would create the same instance if a full instance is provided", () => {
      const values = createModelInstance(mockModel);
      const instance = newInstanceFromValuesOrZeroValue(mockModel, values);

      expect(instance).toStrictEqual(instance);
    });

    it("would create a mixed instance if just some values are provided", () => {
      const instance = newInstanceFromValuesOrZeroValue(mockModel, {
        id: "1",
        age: 10,
        currency: "EUR",
        car: {
          returnTime: new Date(2022, 9, 10, 23),
          type: ["sub", "sport"],
        },
        available: true,
        gender: "female",
        identifiers: ["1", "2"],
      });

      expect(instance).toStrictEqual({
        age: 10,
        available: true,
        birthDate: new Date(2014, 8, 18),
        car: {
          color: "",
          manufacturer: "",
          model: "",
          returnTime: new Date(2022, 9, 10, 23),
          type: ["sub", "sport"],
          vin: "",
          vrm: "",
        },
        currency: "EUR",
        firstName: "",
        gender: "female",
        id: "1",
        lastName: "",
        middleName: "",
        quantity: 0,
        tradeDate: new Date(2022, 8, 12, 9, 0),
        codes: [],
        identifiers: ["1", "2"],
      });
    });
  });
});
