import { useEffect, useRef } from "react";
import { useNotificationCenter, Notification } from "./notification-center.context";

export interface NotifyWhenValueChangesOptions<T> {
  from: T;
  to: T;
}

export const useNotifyWhenValueChanges = <T>(
  notification: Notification,
  value: T | undefined,
  { from, to }: NotifyWhenValueChangesOptions<T>,
) => {
  const prevRef = useRef<T>();
  const { show } = useNotificationCenter();

  useEffect(() => {
    if (prevRef.current === from && value === to) {
      show(notification);
    }
    prevRef.current = value;
  }, [value]);
};
