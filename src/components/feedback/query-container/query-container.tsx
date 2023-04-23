import { Alert, AlertTitle, Box } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";
import { LoadingArea } from "../loading-area";

export interface QueryContainerError {
  /**
   * The error title
   */
  name?: string;
  /**
   * The description of the error
   */
  message: string;
}

export interface QueryContainerSuccess {
  /**
   * The success title
   */
  name?: string;
  /**
   * The success text
   */
  message: string;
}

export type QueryContainerProps = PropsWithChildren<{
  /**
   * There is a query in progress
   */
  isFetching: boolean;
  /**
   * The query has returned an error
   */
  error?: QueryContainerError;
  /**
   * The query has finished successfully
   */
  success?: QueryContainerSuccess;
}>;

/**
 * Component to show different indicators based on the usual api query statuses
 */
export function QueryContainer({ isFetching, error, success, children }: QueryContainerProps) {
  if (isFetching) {
    return <LoadingArea />;
  }

  if (error) {
    return (
      <Alert severity="error" role="alert" aria-describedby="error">
        {error.name && <AlertTitle role="heading">{error.name}</AlertTitle>}
        {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      {success && (
        <Alert severity="success" role="alert" aria-describedby="success" sx={{ mb: 2 }}>
          {success.name && <AlertTitle role="heading">{success.name}</AlertTitle>}
          {success.message}
        </Alert>
      )}
      {children}
    </Box>
  );
}
