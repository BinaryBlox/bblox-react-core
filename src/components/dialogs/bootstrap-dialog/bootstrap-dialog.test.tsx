import { DialogContentText } from "@mui/material";
import React from "react";
import { render, screen } from "~/tests/testing-library";
import { BootstrapDialog } from "./bootstrap-dialog";
import userEvent from "@testing-library/user-event";
import { DialogAction } from "../dialog.types";
import { vi } from "vitest";

interface DialogRenderArgs {
  open: boolean;
  disabled?: boolean;
  cancelable?: boolean;
  acceptable?: boolean;
  callCloseWhenCancel?: boolean;
  actions?: DialogAction[];
  acceptText?: string;
  cancelText?: string;
  loading?: boolean;
}

describe("BootstrapDialog", () => {
  const createMockActions = () => {
    const onClickAction1 = vi.fn();
    const onClickAction2 = vi.fn();
    const actions: DialogAction[] = [
      {
        id: "action1",
        text: "Action 1",
        color: "error",
        onClick: onClickAction1,
      },
      {
        id: "action2",
        text: "Action 2",
        onClick: onClickAction2,
      },
    ];
    return { actions, onClickAction1, onClickAction2 };
  };

  const renderComponent = ({
    open,
    disabled,
    cancelable,
    acceptable,
    callCloseWhenCancel,
    acceptText,
    cancelText,
    actions,
    loading,
  }: DialogRenderArgs) => {
    const onClose = vi.fn();
    const onCancel = vi.fn();
    const onAccept = vi.fn();

    render(
      <BootstrapDialog
        open={open}
        disabled={disabled}
        cancelable={cancelable}
        acceptable={acceptable}
        callCloseWhenCancel={callCloseWhenCancel}
        actions={actions}
        title="lorem ipsum"
        onClose={onClose}
        onCancel={onCancel}
        onAccept={onAccept}
        cancelText={cancelText}
        acceptText={acceptText}
        loading={loading}
      >
        <DialogContentText>This is the content</DialogContentText>
      </BootstrapDialog>,
    );

    return { onClose, onCancel, onAccept };
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

  it("should call onClose if the close button is clicked", async () => {
    const { onClose } = renderComponent({ open: true });

    await userEvent.click(screen.getByRole("button", { name: "close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe("disabled", () => {
    it("should have the close button as disabled", () => {
      renderComponent({ open: true, disabled: true });

      expect(screen.getByRole("button", { name: "close" })).toBeDisabled();
    });

    it("should have the Cancel button as disabled", () => {
      renderComponent({ open: true, disabled: true, cancelable: true });

      expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    });

    it("should have the accept button as disabled", () => {
      renderComponent({ open: true, disabled: true, acceptable: true });

      expect(screen.getByRole("button", { name: /accept/i })).toBeDisabled();
    });

    it("should have the actions button as disabled", () => {
      const { actions } = createMockActions();
      renderComponent({ open: true, disabled: true, actions });

      expect(screen.getByRole("button", { name: /action 1/i })).toBeDisabled();
      expect(screen.getByRole("button", { name: /action 2/i })).toBeDisabled();
    });
  });

  it("should be able to change the cancel button text", () => {
    renderComponent({ open: true, cancelable: true, cancelText: "updated cancel" });

    expect(screen.getByRole("button", { name: /updated cancel/i })).toBeVisible();
  });

  it("should be able to change the accept button text", () => {
    renderComponent({ open: true, acceptable: true, acceptText: "updated accept" });

    expect(screen.getByRole("button", { name: /updated accept/i })).toBeVisible();
  });

  it("should call onCancel if the cancel button is clicked", async () => {
    const { onCancel } = renderComponent({ open: true, cancelable: true });

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onAccept if the accept button is clicked", async () => {
    const { onAccept } = renderComponent({ open: true, acceptable: true });

    await userEvent.click(screen.getByRole("button", { name: /accept/i }));

    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  describe("callCloseWhenCancel", () => {
    it("should call onClose when call cancel if is true", async () => {
      const { onClose } = renderComponent({
        open: true,
        cancelable: true,
        callCloseWhenCancel: true,
      });

      await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("shouln't call onClose when call cancel if is false", async () => {
      const { onClose } = renderComponent({
        open: true,
        cancelable: true,
        callCloseWhenCancel: false,
      });

      await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("actions", () => {
    it("should render a button for each action", () => {
      const { actions } = createMockActions();
      renderComponent({ open: true, cancelable: true, callCloseWhenCancel: false, actions });

      expect(screen.getByRole("button", { name: /action 1/i })).toBeVisible();
      expect(screen.getByRole("button", { name: /action 2/i })).toBeVisible();
    });

    it("should call the action 1 click listener if the action 1 is clicked", async () => {
      const { actions, onClickAction1 } = createMockActions();
      renderComponent({ open: true, cancelable: true, callCloseWhenCancel: false, actions });

      await userEvent.click(screen.getByRole("button", { name: /action 1/i }));

      expect(onClickAction1).toHaveBeenCalledTimes(1);
    });

    it("should call the action 1 click listener if the action 2 is clicked", async () => {
      const { actions, onClickAction2 } = createMockActions();
      renderComponent({ open: true, cancelable: true, callCloseWhenCancel: false, actions });

      await userEvent.click(screen.getByRole("button", { name: /action 2/i }));

      expect(onClickAction2).toHaveBeenCalledTimes(1);
    });
  });

  describe("loading", () => {
    it("should render a loading indicator if acceptable is true and loading is true", () => {
      renderComponent({ open: true, acceptable: true, loading: true });

      expect(screen.getByRole("progressbar")).toBeVisible();
    });

    it("should render a loading indicator if acceptable is false and loading is true", () => {
      renderComponent({ open: true, acceptable: false, loading: true });

      expect(screen.getByRole("progressbar")).toBeVisible();
    });
  });
});
