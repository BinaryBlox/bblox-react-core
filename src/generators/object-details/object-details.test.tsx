import React from "react";
import { expectModelFieldValue } from "~/tests/assertions";
import { render } from "~/tests/testing-library";
import { mockModel, createModelInstance } from "../generators.mock";
import { ObjectDetails } from "./object-details";

describe("ObjectDetails", () => {
  const renderComponent = () => {
    const instance = createModelInstance(mockModel);
    return {
      ...render(<ObjectDetails model={mockModel} instance={instance} />),
      instance,
      model: mockModel,
    };
  };

  it("would render a label/value pair for each detail", () => {
    const { instance, model } = renderComponent();

    model.fields.forEach((detail) => expectModelFieldValue(detail, instance));
  });
});
