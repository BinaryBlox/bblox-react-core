import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { AlertColor, Box, Button } from "@mui/material";
import { render, screen, waitForElementToBeRemoved } from "~/tests/testing-library";
import { NotificationCenterProvider } from "./notification-center.provider";
import { vi } from "vitest";
import {
  NotificationCenterContext,
  NotificationCenterProviderUndefinedError,
  useNotificationCenter,
  Notification,
} from "./notification-center.context";
import { useNotifyWhenValueChanges } from "./notification-center.hooks";
import { expectAlert } from "~/tests/assertions";
import { mockConsoleError } from "~/tests/mocks";

describe("NotificationCenterProvider", () => {
  const renderComponent = ({ autoHideDuration }: { autoHideDuration?: number } = {}) => {
    const TestContent = () => {
      const { show, hide } = useNotificationCenter();

      const showNotification = (severity: AlertColor) => {
        show({
          title: "An alert!",
          message: "Lorem ipsum sit amet",
          severity,
        });
      };
      return (
        <>
          <Button onClick={() => showNotification("success")}>success</Button>
          <Button onClick={() => showNotification("info")}>info</Button>
          <Button onClick={() => showNotification("warning")}>warning</Button>
          <Button onClick={() => showNotification("error")}>error</Button>
          <Button onClick={hide}>hide</Button>
        </>
      );
    };

    return render(
      <NotificationCenterProvider autoHideDuration={autoHideDuration}>
        <TestContent />
      </NotificationCenterProvider>,
    );
  };

  it("would render an alert with a title and message when a notification is requested", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: /info/i }));

    await expectAlert({
      title: /an alert/i,
      message: /lorem ipsum sit amet/i,
      severity: "info",
    });
  });

  it("would hide the notification if close is called", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: /info/i }));
    await userEvent.click(screen.getByRole("button", { name: /hide/i }));

    await waitForElementToBeRemoved(() => screen.getByRole("alert"));
  });

  it("would hide the notification if the user clicks the close button", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: /info/i }));
    await userEvent.click(screen.getByTestId("CloseIcon"));

    await waitForElementToBeRemoved(() => screen.getByRole("alert"));
  });

  it("would hide the notification after a delay", async () => {
    renderComponent({ autoHideDuration: 100 });

    await userEvent.click(screen.getByRole("button", { name: /info/i }));

    await waitForElementToBeRemoved(() => screen.getByRole("alert"));
  });

  describe("notification severity", () => {
    it.each([
      ["success", /success/i],
      ["info", /info/i],
      ["warning", /warning/i],
      ["error", /error/i],
    ])(
      "would render a notification with severity %s",
      async (severity: string, buttonName: RegExp) => {
        renderComponent();

        await userEvent.click(screen.getByRole("button", { name: buttonName }));

        expect(screen.getByRole("alert", { name: severity })).toBeInTheDocument();
      },
    );
  });
});

describe("useNotificationCenter", () => {
  mockConsoleError();

  it("would throw an error if the component is not wrapped by a NotificationCenterContext.Provider", () => {
    const FailingComponent = () => {
      useNotificationCenter();
      return <Box>FailingComponent</Box>;
    };

    expect(() => render(<FailingComponent />)).toThrow(NotificationCenterProviderUndefinedError);
  });
});

describe("useNotifyWhenValueChanges", () => {
  const DUMMY_NOTIFICATION: Notification = {
    title: "Hello World",
    message: "Lorem ipsum sit amet",
    severity: "info",
  };

  const renderHook = ({ to, from }: { to: boolean; from: boolean }) => {
    const show = vi.fn();

    const DummyComponent = () => {
      const [value, setValue] = useState<boolean | undefined>(false);
      useNotifyWhenValueChanges(DUMMY_NOTIFICATION, value, { from, to });

      return (
        <Box>
          <Button onClick={() => setValue(undefined)}>undefined</Button>
          <Button onClick={() => setValue(false)}>false</Button>
          <Button onClick={() => setValue(true)}>true</Button>
        </Box>
      );
    };

    render(
      <NotificationCenterContext.Provider
        value={{
          show,
          hide: vi.fn(),
        }}
      >
        <DummyComponent />
      </NotificationCenterContext.Provider>,
    );

    return { show };
  };

  const changeValueTo = async (value: "undefined" | "false" | "true") => {
    await userEvent.click(screen.getByRole("button", { name: value }));
  };

  it("wouldn't call the show method when is rendered", () => {
    const { show } = renderHook({ to: true, from: false });

    expect(show).not.toHaveBeenCalled();
  });

  it("wouldn't call the show method when it changes to a value that is not to", async () => {
    const { show } = renderHook({ to: true, from: false });

    await changeValueTo("false");

    expect(show).not.toHaveBeenCalled();
  });

  it("wouldn't call the show method when value changes to a value that is not to", async () => {
    const { show } = renderHook({ to: true, from: false });

    await changeValueTo("false");

    expect(show).not.toHaveBeenCalled();
  });

  it("wouldn't call the show method when value changes from undefined to to", async () => {
    const { show } = renderHook({ to: true, from: false });

    await changeValueTo("undefined");
    await changeValueTo("true");

    expect(show).not.toHaveBeenCalled();
  });

  it("would call the show method when value changes from to to", async () => {
    const { show } = renderHook({ to: true, from: false });

    await changeValueTo("false");
    await changeValueTo("true");

    expect(show).toHaveBeenCalledTimes(1);
    expect(show).toHaveBeenCalledWith(DUMMY_NOTIFICATION);
  });
});
