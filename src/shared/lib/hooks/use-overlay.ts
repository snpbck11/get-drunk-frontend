import { RefObject } from "react";
import { TDuration } from "../transitions";
import { useAnimatedVisibility } from "./use-animated-visibility";
import { useClickOutside } from "./use-click-outside";
import { useEscape } from "./use-escape";

interface IUseOverlvayOptions<T> {
  open: boolean;
  onClose: () => void;
  ref: RefObject<T>;
  transitionDuration?: TDuration;
}

interface IUseOverlvayReturn {
  shouldRender: boolean;
  isAnimating: boolean;
  handleClose: () => void;
  duration: TDuration;
}

export function useOverlay<T extends HTMLElement | null>({
  open,
  onClose,
  ref,
  transitionDuration,
}: IUseOverlvayOptions<T>): IUseOverlvayReturn {
  const { shouldRender, isAnimating, handleClose, duration } = useAnimatedVisibility({
    open,
    onClose,
    duration: transitionDuration,
  });
  useEscape({ onEscape: handleClose, enabled: shouldRender });
  useClickOutside({ ref, onClickOutside: handleClose, enabled: shouldRender });

  return { shouldRender, isAnimating, handleClose, duration };
}
