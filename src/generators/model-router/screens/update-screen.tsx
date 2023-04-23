import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Content, Header } from "~/components";
import { BasicModelInstance } from "../../generators.model";
import { ModelForm } from "../../model-form";
import { useNavigateWhenValueChanges } from "~/hooks";
import { HeaderLayout } from "../../../layouts";
import { useNotifyWhenValueChanges } from "../../../providers";
import { RequestState } from "../model-router.types";
import { BaseScreenProps } from "./screens.types";

export interface UpdateScreenProps<T extends BasicModelInstance> extends BaseScreenProps {
  /**
   * Callback executed when the user wants to update
   * an item
   */
  onSubmitUpdateItem: (obj: T) => void;
  /**
   * Current status of the request to update an item
   */
  submitUpdateItemRequest: RequestState;

  /**
   * Current status of the request to retrieve
   * the item to be updated
   */
  updateItemRequest: RequestState;

  /**
   * Callback executed to retrive the item that
   * has to going tobe updated
   */
  onRequestUpdateItem: (id: string) => void;

  /**
   * Item that is going to be updated
   */
  updateItem?: T;
}

export const UpdateScreen = <T extends BasicModelInstance>({
  model,
  modelName,
  basePath = "",
  submitUpdateItemRequest,
  updateItemRequest,
  updateItem,
  onSubmitUpdateItem,
  onRequestUpdateItem,
}: UpdateScreenProps<T>) => {
  const { id = "" } = useParams();
  const loading = updateItemRequest.loading || submitUpdateItemRequest.loading;

  useEffect(() => {
    onRequestUpdateItem(id);
  }, [id]);

  useNotifyWhenValueChanges(
    {
      title: "Item updated",
      message: `The item ${id} has been updated successfully`,
      severity: "success",
    },
    !!submitUpdateItemRequest.success,
    { from: false, to: true },
  );
  useNavigateWhenValueChanges(`${basePath}/`, !!submitUpdateItemRequest.success, {
    from: false,
    to: true,
  });
  useNotifyWhenValueChanges(
    { title: "We had an error", message: submitUpdateItemRequest.error || "", severity: "error" },
    !!submitUpdateItemRequest.error,
    { from: false, to: true },
  );

  return (
    <HeaderLayout loading={loading}>
      <Header
        title={`Edit ${id}`}
        preset="default"
        breadcrumbs={[
          {
            id: "list",
            text: modelName,
            link: `${basePath}/`,
          },
          {
            id: "update",
            text: `Edit ${id}`,
            link: `${basePath}/${id}/update`,
          },
        ]}
      />
      <Content>
        <ModelForm
          model={model}
          initialValues={updateItem}
          saveButtonText="Save"
          onSubmit={onSubmitUpdateItem}
        />
      </Content>
    </HeaderLayout>
  );
};
