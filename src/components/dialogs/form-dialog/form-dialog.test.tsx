import { Grid, TextField } from "@mui/material";
import React from "react";
import { render, screen } from "~/tests/testing-library";
import { FormDialog } from "./form-dialog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

interface DialogRenderArgs {
  open: boolean;
  disabled?: boolean;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  content?: string | string[];
}

describe("FormDialog", () => {
  const renderComponent = ({
    open,
    disabled,
    submitText,
    cancelText,
    loading,
  }: DialogRenderArgs) => {
    const onCancel = vi.fn();
    const onSubmit = vi.fn();

    render(
      <FormDialog
        open={open}
        disabled={disabled}
        loading={loading}
        title="lorem ipsum"
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelText={cancelText}
        submitText={submitText}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="message" label="Message" fullWidth required variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField name="amount" label="Amount" fullWidth required variant="outlined" />
          </Grid>
        </Grid>
      </FormDialog>,
    );

    return { onCancel, onSubmit };
  };

  it("should render the dialog if open is true", () => {
    renderComponent({ open: true });

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("shouldn't render the dialog if open is false", () => {
    renderComponent({ open: false });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render the title", () => {
    renderComponent({ open: true });

    expect(screen.getByText("lorem ipsum")).toBeVisible();
  });

  it("should render the form", () => {
    renderComponent({ open: true });

    expect(screen.getByRole("textbox", { name: /message/i })).toBeVisible();
    expect(screen.getByRole("textbox", { name: /amount/i })).toBeVisible();
  });

  it("should call onCancel if the close button is clicked", async () => {
    const { onCancel } = renderComponent({ open: true });

    await userEvent.click(screen.getByRole("button", { name: "close" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel if the cancel button is clicked", async () => {
    const { onCancel } = renderComponent({ open: true });

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit if the form is submited", async () => {
    const { onSubmit } = renderComponent({ open: true });

    await userEvent.type(screen.getByRole("textbox", { name: /message/i }), "this is the message");
    await userEvent.type(screen.getByRole("textbox", { name: /amount/i }), "100");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      message: "this is the message",
      amount: "100",
    });
  });

  describe("disabled", () => {
    it("should have the close button as disabled", () => {
      renderComponent({ open: true, disabled: true });

      expect(screen.getByRole("button", { name: "close" })).toBeDisabled();
    });

    it("should have the Cancel button as disabled", () => {
      renderComponent({ open: true, disabled: true });

      expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    });

    it("should have the submit button as disabled", () => {
      renderComponent({ open: true, disabled: true });

      expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    });
  });

  it("should be able to change the cancel button text", () => {
    renderComponent({ open: true, cancelText: "updated cancel" });

    expect(screen.getByRole("button", { name: /updated cancel/i })).toBeVisible();
  });

  it("should be able to change the submit button text", () => {
    renderComponent({ open: true, submitText: "updated submit" });

    expect(screen.getByRole("button", { name: /updated submit/i })).toBeVisible();
  });

  describe("loading", () => {
    it("should render a loading indicator if is true", async () => {
      renderComponent({ open: true, loading: true });

      expect(screen.getByRole("progressbar")).toBeVisible();
    });

    it("should have the close button as disabled", () => {
      renderComponent({ open: true, loading: true });

      expect(screen.getByRole("button", { name: "close" })).toBeDisabled();
    });

    it("should have the Cancel button as disabled", () => {
      renderComponent({ open: true, loading: true });

      expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    });

    it("should have the submit button as disabled", () => {
      renderComponent({ open: true, loading: true });

      expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    });
  });
});
