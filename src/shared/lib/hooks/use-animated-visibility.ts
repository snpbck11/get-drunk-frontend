import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TDuration } from "../transitions";

interface IUseAnimatedVisibilityOptions {
  open: boolean;
  onClose: () => void;
  duration?: TDuration;
}

interface IUseAnimatedVisibilityReturn {
  shouldRender: boolean;
  isAnimating: boolean;
  handleClose: () => void;
  duration: TDuration;
}
export function useAnimatedVisibility({
  open,
  onClose,
  duration = 300,
}: IUseAnimatedVisibilityOptions): IUseAnimatedVisibilityReturn {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setIsAnimating(false);

    timerRef.current = setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, duration);
  }, [duration, onClose]);

  useLayoutEffect(() => {
    if (open) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      setShouldRender(true);
      setIsAnimating(false);

      requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setShouldRender(false);
      }, duration);
    }
  }, [open, duration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { shouldRender, isAnimating, handleClose, duration };
}
