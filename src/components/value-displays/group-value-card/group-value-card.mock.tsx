import React from "react";
import { ValueBoolean } from "../value-boolean/value-boolean";
import { ValueRating } from "../value-rating";
import { ValueText } from "../value-text";
import { GroupValueCard, GroupValueCardProps } from "./group-value-card";
import { ValueItem } from "../value-item";

export const GroupValueCardDummy = ({ dense, ...rest }: GroupValueCardProps) => {
  return (
    <GroupValueCard {...rest} dense={dense}>
      <ValueItem xs={12} sm={6} md={4}>
        <ValueText dense={dense} label="Hello world" value="Lorem ipsum sit amet" />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={2}>
        <ValueBoolean dense={dense} label="Enabled" value />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={3}>
        <ValueText dense={dense} label="Quantity" value="1200" />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={3}>
        <ValueText dense={dense} label="Currency" value="EUR" />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={6}>
        <ValueText
          dense={dense}
          label="I am Batman"
          value=" Does it come in black? It's ends here. Hero can be anyone"
        />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={3}>
        <ValueText dense={dense} label="Status" value="Open" />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={3}>
        <ValueText dense={dense} label="Level" value="2144" />
      </ValueItem>
      <ValueItem xs={12} sm={6} md={3}>
        <ValueRating dense={dense} label="Rating" value={3} />
      </ValueItem>
    </GroupValueCard>
  );
};
