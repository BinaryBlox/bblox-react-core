import { DialogContentText } from "@mui/material";
import React from "react";
import { render, screen } from "~/tests/testing-library";
import { ConfirmDialog } from "./confirm-dialog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

interface DialogRenderArgs {
  open: boolean;
  disabled?: boolean;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  content?: string | string[];
}

describe("ConfirmDialog", () => {
  const renderComponent = ({
    open,
    disabled,
    confirmText,
    cancelText,
    loading,
  }: DialogRenderArgs) => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    render(
      <ConfirmDialog
        open={open}
        disabled={disabled}
        loading={loading}
        title="lorem ipsum"
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelText={cancelText}
        confirmText={confirmText}
      >
        <DialogContentText>This is the content</DialogContentText>
      </ConfirmDialog>,
    );

    return { onCancel, onConfirm };
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

  it("should render the children content", () => {
    renderComponent({ open: true });

    expect(screen.getByText(/this is the content/i)).toBeVisible();
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

  it("should call onConfirm if the confirm button is clicked", async () => {
    const { onConfirm } = renderComponent({ open: true });

    await userEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
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

    it("should have the confirm button as disabled", () => {
      renderComponent({ open: true, disabled: true });

      expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
    });
  });

  it("should be able to change the cancel button text", () => {
    renderComponent({ open: true, cancelText: "updated cancel" });

    expect(screen.getByRole("button", { name: /updated cancel/i })).toBeVisible();
  });

  it("should be able to change the confirm button text", () => {
    renderComponent({ open: true, confirmText: "updated confirm" });

    expect(screen.getByRole("button", { name: /updated confirm/i })).toBeVisible();
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

    it("should have the confirm button as disabled", () => {
      renderComponent({ open: true, loading: true });

      expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
    });
  });
});
