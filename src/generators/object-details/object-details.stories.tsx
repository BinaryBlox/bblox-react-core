import { Meta } from "@storybook/react";
import { ObjectDetails } from "./object-details";
import { withPadding } from "../../storybook";
import { createModelInstance, mockModel } from "../generators.mock";

const instance = createModelInstance(mockModel);

export default {
  title: "Generators/ObjectDetails",
  component: ObjectDetails,
  decorators: [withPadding()],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ObjectDetails>;

export const Default = {
  args: {
    model: mockModel,
    instance: instance,
  },
};

export const Dense = {
  args: {
    model: mockModel,
    instance: instance,
    dense: true,
  },
};
