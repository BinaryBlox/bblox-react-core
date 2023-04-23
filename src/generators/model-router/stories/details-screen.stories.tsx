import { Meta, StoryObj } from "@storybook/react";
import { withNotificationCenter, withActionRouter } from "../../../storybook";
import { item1 } from "./templates";
import { DetailsScreen } from "../screens";
import { mockModel } from "../../generators.mock";
import { IdleRequest, LoadingRequest } from "../model-router.types";

export default {
  title: "Generators/ModelRouter/DetailsScreen",
  component: DetailsScreen,
  decorators: [
    withActionRouter({
      location: `/${item1.id}`,
      path: "/:id",
    }),
    withNotificationCenter,
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DetailsScreen>;
type Story = StoryObj<typeof DetailsScreen>;

export const Loading: Story = {
  args: {
    modelName: "Items",
    model: mockModel,
    itemRequest: LoadingRequest,
  },
};

export const Details: Story = {
  args: {
    modelName: "Items",
    model: mockModel,
    itemRequest: IdleRequest,
    detailsItem: item1,
  },
};
