import { PropsWithChildren, FunctionComponent, ReactElement } from "react";

export type ContentProps = PropsWithChildren;
export type ContentComponent = FunctionComponent<ContentProps>;
export type ContentElement = ReactElement<ContentElement, ContentComponent>;
