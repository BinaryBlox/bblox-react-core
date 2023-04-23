import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  withLocalizationProvider,
  withMemoryRouter,
  withNotificationCenter,
} from "../../../storybook";
import { ModelRouter } from "../model-router";
import { IdleRequest } from "../model-router.types";
import { MockInstance, mockModel } from "../../generators.mock";
import { HandlerFunction } from "@storybook/addon-actions";
import { useState } from "react";
import {
  data,
  onRequestDeleteAction,
  onRequestItem,
  onRequestListAction,
  onRequestUpdateItemAction,
  onSubmitNewItemAction,
  onSubmitUpdateAction,
  REQUEST_TIMEOUT,
} from "./templates";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export interface DummyModelRouterProps {
  requestTimeout: number;
  initialData: MockInstance[];
  basePath?: string;
  deleteFeature?: boolean;
  updateFeature?: boolean;
  addFeature?: boolean;
  detailsFeature?: boolean;
  onRequestListAction: HandlerFunction;
  onSubmitNewItemAction: HandlerFunction;
  onRequestItem: HandlerFunction;
  onRequestUpdateItemAction: HandlerFunction;
  onSubmitUpdateAction: HandlerFunction;
  onRequestDeleteAction: HandlerFunction;
}

export const DummyModelRouter = (args: DummyModelRouterProps) => {
  const {
    requestTimeout,
    initialData,
    basePath = "",
    deleteFeature = true,
    updateFeature = true,
    addFeature = true,
    detailsFeature = true,
    onRequestListAction,
    onSubmitNewItemAction,
    onRequestItem,
    onRequestUpdateItemAction,
    onSubmitUpdateAction,
    onRequestDeleteAction,
  } = args;

  const [data, setData] = useState<MockInstance[]>([]);
  const [updateItem, setUpdateItem] = useState<MockInstance | undefined>(undefined);
  const [listRequestState, setListRequestState] = useState(IdleRequest);
  const [newItemRequestState, setNewItemRequestState] = useState(IdleRequest);
  const [submitUpdateItemRequestState, setSubmitUpdateItemRequestState] = useState(IdleRequest);
  const [removeRequestState, setRemoveRequestState] = useState(IdleRequest);
  const [detailRequestState, setDetailRequestState] = useState(IdleRequest);
  const [updateItemRequestState, setUpdateItemRequestState] = useState(IdleRequest);
  const [detailInstance, setDetailInstance] = useState<MockInstance | undefined>(undefined);

  const handleRequestList = () => {
    onRequestListAction();
    setListRequestState({ idle: false, loading: true });
    setTimeout(() => {
      setData(initialData);
      setListRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  const handleClickDeleteItem = (item: MockInstance) => {
    setRemoveRequestState({ idle: false, loading: true });
    onRequestDeleteAction(item);

    setTimeout(() => {
      setData((d) => [...d.filter((d) => d !== item)]);
      setRemoveRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  const handleSubmitNewItem = (obj: MockInstance) => {
    setNewItemRequestState({ idle: false, loading: true });
    onSubmitNewItemAction(obj);

    setTimeout(() => {
      setData((d) => [...d, obj]);
      setNewItemRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  const handleRequestItem = (id: string) => {
    setDetailInstance(undefined);
    setDetailRequestState({ idle: false, loading: true });
    onRequestItem(id);

    setTimeout(() => {
      setDetailInstance(data?.find((d) => d.id === id));
      setDetailRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  const handleRequestUpdateItem = (id: string) => {
    setUpdateItemRequestState({ idle: false, loading: true });
    onRequestUpdateItemAction(id);

    setTimeout(() => {
      setUpdateItem(data?.find((d) => d.id === id));
      setUpdateItemRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  const handleSubmitUpdateItem = (obj: MockInstance) => {
    setSubmitUpdateItemRequestState({ idle: false, loading: true });
    onSubmitUpdateAction(obj);

    setTimeout(() => {
      setData((d) => [
        ...(d || []).map((item) => {
          if (item === obj) {
            return obj;
          }
          return item;
        }),
      ]);
      setSubmitUpdateItemRequestState({ idle: true, loading: false, success: true });
    }, requestTimeout);
  };

  return (
    <ModelRouter
      {...args}
      modelName="Items"
      model={mockModel}
      basePath={basePath}
      deleteFeature={deleteFeature}
      updateFeature={updateFeature}
      addFeature={addFeature}
      detailsFeature={detailsFeature}
      onRequestList={handleRequestList}
      listData={data}
      listRequest={listRequestState}
      deleteRequest={removeRequestState}
      onClickDeleteItem={handleClickDeleteItem}
      itemRequest={detailRequestState}
      detailsItem={detailInstance}
      onRequestItem={handleRequestItem}
      newItemRequest={newItemRequestState}
      onSubmitNewItem={handleSubmitNewItem}
      submitUpdateItemRequest={submitUpdateItemRequestState}
      updateItemRequest={updateItemRequestState}
      updateItem={updateItem}
      onRequestUpdateItem={handleRequestUpdateItem}
      onSubmitUpdateItem={handleSubmitUpdateItem}
    />
  );
};

export const InternalModelRouter = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box>
            <Typography>Internal model route</Typography>
            <Button variant="contained" onClick={() => navigate("/internal")}>
              Go to Internal
            </Button>
          </Box>
        }
      />
      <Route
        path="/internal/*"
        element={
          <ModelRouter
            modelName="Items"
            model={mockModel}
            basePath="/internal"
            onRequestItem={() => null}
            itemRequest={IdleRequest}
            onRequestList={() => null}
            listData={data}
            onClickDeleteItem={() => null}
            listRequest={IdleRequest}
            deleteRequest={IdleRequest}
            onSubmitNewItem={() => null}
            newItemRequest={IdleRequest}
            onSubmitUpdateItem={() => null}
            submitUpdateItemRequest={IdleRequest}
            updateItemRequest={IdleRequest}
            onRequestUpdateItem={() => null}
          />
        }
      />
    </Routes>
  );
};

export default {
  title: "Generators/ModelRouter/DummyModelRouter",
  component: DummyModelRouter,
  decorators: [withMemoryRouter(), withNotificationCenter, withLocalizationProvider],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DummyModelRouter>;
type Story = StoryObj<typeof DummyModelRouter>;

export const DemoModelRouter: Story = {
  args: {
    requestTimeout: REQUEST_TIMEOUT,
    initialData: data,
    onRequestListAction,
    onSubmitNewItemAction,
    onRequestItem,
    onRequestUpdateItemAction,
    onSubmitUpdateAction,
    onRequestDeleteAction,
  },
};
