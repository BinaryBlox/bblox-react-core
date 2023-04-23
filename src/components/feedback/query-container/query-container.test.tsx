import React from "react";
import { QueryContainer, QueryContainerError, QueryContainerSuccess } from "./query-container";
import { render, screen } from "~/tests/testing-library";
import { Typography } from "@mui/material";
import { expectProgressIndicator } from "~/tests/assertions";

describe("QueryContainer", () => {
  const renderComponent = ({
    isFetching = false,
    error = undefined,
    success = undefined,
  }: {
    isFetching?: boolean;
    error?: QueryContainerError;
    success?: QueryContainerSuccess;
  } = {}) => {
    return render(
      <QueryContainer isFetching={isFetching} error={error} success={success}>
        <Typography>children content</Typography>
      </QueryContainer>,
    );
  };

  it("would render a loading indicator if isFetching is true", () => {
    renderComponent({ isFetching: true });

    expectProgressIndicator();
  });

  describe("error", () => {
    it("would render an error alert", () => {
      renderComponent({ error: { message: "Internal error" } });

      expect(screen.getByRole("alert")).toHaveAttribute("aria-describedby", "error");
    });

    it("would render the error message if error is defined", () => {
      renderComponent({ error: { message: "Internal error" } });

      expect(screen.getByText(/internal error/i)).toBeInTheDocument();
    });

    it("would render the error title if error.name is defined", () => {
      renderComponent({ error: { name: "Internal error", message: "There was an error" } });

      expect(screen.getByRole("heading", { name: /internal error/i })).toBeInTheDocument();
    });

    it("wouldn't render the error title if error is defined but the error.name not", () => {
      renderComponent({ error: { message: "Internal error" } });

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });

  describe("success", () => {
    it("would render a success alert", () => {
      renderComponent({ success: { message: "Item added" } });

      expect(screen.getByRole("alert")).toHaveAttribute("aria-describedby", "success");
    });

    it("would render the success message if success is defined", () => {
      renderComponent({ success: { message: "Item added" } });

      expect(screen.getByText(/item added/i)).toBeInTheDocument();
    });

    it("would render the success title if success.name is defined", () => {
      renderComponent({
        success: { name: "Item added", message: "The item has been added successfully" },
      });

      expect(screen.getByRole("heading", { name: /item added/i })).toBeInTheDocument();
    });

    it("wouldn't render the error title if success is defined but the success.name not", () => {
      renderComponent({ success: { message: "Item added" } });

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
    //TODO validate the severity of the alert

    it("would render the content", () => {
      renderComponent({ success: { message: "Item added" } });

      expect(screen.getByText(/children content/i)).toBeInTheDocument();
    });
  });

  it("would render the children if isFetching is false and there is no defined error", () => {
    renderComponent({ isFetching: false, error: undefined });

    expect(screen.getByText(/children content/i)).toBeInTheDocument();
  });
});
