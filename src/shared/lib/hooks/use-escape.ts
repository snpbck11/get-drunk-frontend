import { useEffect } from "react";

interface IUseEscapeOptions {
  onEscape: () => void;
  enabled?: boolean;
}

export function useEscape({ onEscape, enabled = true }: IUseEscapeOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [enabled, onEscape]);
}
