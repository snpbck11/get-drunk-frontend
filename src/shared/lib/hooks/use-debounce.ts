import { useCallback, useEffect, useRef } from "react";

export const useDebounce = <T extends (...args: never[]) => void>(
  callback: T,
  interval: number
) => {
  const prevTimeOutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (prevTimeOutRef.current) {
        clearTimeout(prevTimeOutRef.current);
      }

      prevTimeOutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, interval);
    },
    [interval]
  );
};