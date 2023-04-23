import React from "react";
import { Routes, Route } from "react-router-dom";
import { BasicModelInstance } from "../generators.model";
import {
  AddScreen,
  AddScreenProps,
  DetailsScreen,
  DetailsScreenProps,
  ListScreen,
  ListScreenProps,
  UpdateScreen,
  UpdateScreenProps,
} from "./screens";

export type ModelRouterProps<T extends BasicModelInstance> = DetailsScreenProps<T> &
  ListScreenProps<T> &
  AddScreenProps<T> &
  UpdateScreenProps<T>;

export const ModelRouter = <T extends BasicModelInstance>(props: ModelRouterProps<T>) => {
  const { updateFeature = true, addFeature = true, detailsFeature = true } = props;
  return (
    <Routes>
      <Route path="" element={<ListScreen {...props} />} />
      {detailsFeature && <Route path=":id" element={<DetailsScreen {...props} />} />}
      {addFeature && <Route path="add" element={<AddScreen {...props} />} />}
      {updateFeature && <Route path=":id/update" element={<UpdateScreen {...props} />} />}
    </Routes>
  );
};
