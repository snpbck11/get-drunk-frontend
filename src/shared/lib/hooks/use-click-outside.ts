import { RefObject, useEffect, useRef } from "react";

interface IUseClickOutsideOptions<T> {
  ref: RefObject<T> | null;
  onClickOutside: () => void;
  enabled?: boolean;
}

export function useClickOutside<T extends HTMLElement | null>({
  ref,
  onClickOutside,
  enabled = true,
}: IUseClickOutsideOptions<T>) {
  const callbackRef = useRef(onClickOutside);

  useEffect(() => {
    callbackRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled, ref]);
}
