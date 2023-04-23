import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export interface NavigateWhenValueChangesOptions<T> {
  from: T;
  to: T;
}

export const useNavigateWhenValueChanges = <T>(
  path: string,
  value: T | undefined,
  { from, to }: NavigateWhenValueChangesOptions<T>,
) => {
  const prevRef = useRef<T>();
  const navigate = useNavigate();

  useEffect(() => {
    if (prevRef.current === from && value === to) {
      navigate(path);
    }
    prevRef.current = value;
  }, [value]);
};
