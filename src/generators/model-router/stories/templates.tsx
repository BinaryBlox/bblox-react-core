import { action } from "@storybook/addon-actions";
import { createModelInstance, MockInstance, mockModel } from "../../generators.mock";
import { IdleRequest } from "../model-router.types";

export const onRequestListAction = action("Request list data");
export const onSubmitNewItemAction = action("Submit new item");
export const onRequestItem = action("Details screen mount");
export const onRequestUpdateItemAction = action("Request update instance");
export const onSubmitUpdateAction = action("Submit update form");
export const onRequestDeleteAction = action("click delete item option");

export const REQUEST_TIMEOUT = 2000;

export const item1 = createModelInstance<MockInstance>(mockModel, 100);
export const data = [
  item1,
  createModelInstance<MockInstance>(mockModel, 101),
  createModelInstance<MockInstance>(mockModel, 102),
  createModelInstance<MockInstance>(mockModel, 103),
  createModelInstance<MockInstance>(mockModel, 104),
];

export const baseArgs = {
  modelName: "Items",
  model: mockModel,
  listData: data,
  listRequest: IdleRequest,
  deleteRequest: IdleRequest,
  newItemRequest: IdleRequest,
  updateItemRequest: IdleRequest,
  submitUpdateItemRequest: IdleRequest,
  itemRequest: IdleRequest,
};
