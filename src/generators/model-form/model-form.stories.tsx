import { Meta, StoryObj } from "@storybook/react";
import { ModelForm } from "./model-form";
import { withPadding, withLocalizationProvider } from "../../storybook";
import { createModelInstance, mockModel } from "../generators.mock";

const initialValues = createModelInstance(mockModel);

export default {
  title: "Generators/ModelForm",
  component: ModelForm,
  decorators: [withPadding(2), withLocalizationProvider],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ModelForm>;
type Story = StoryObj<typeof ModelForm>;

export const AddForm: Story = {
  args: {
    model: mockModel,
    saveButtonText: "add",
  },
};

export const UpdateForm: Story = {
  args: {
    model: mockModel,
    initialValues,
    saveButtonText: "update",
  },
};
