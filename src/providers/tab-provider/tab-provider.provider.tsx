import React from "react";
import { PropsWithChildren, useState } from "react";
import { TabContextProvider } from "./tab-provider.context";

type TabProviderProps = PropsWithChildren<{
  initialValue?: number;
}>;

export const TabProvider = ({ children, initialValue = 0 }: TabProviderProps) => {
  const tabState = useState(initialValue);

  return <TabContextProvider value={tabState}>{children}</TabContextProvider>;
};
