"use client";

import { X } from "lucide-react";
import { ReactNode, useRef } from "react";
import { cn } from "../lib";
import { useOverlay } from "../lib/hooks";
import { transitionDurations } from "../lib/transitions";
import { IconButton } from "./icon-button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const DURATION_MS = 300;

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  showCloseButton = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { shouldRender, isAnimating, handleClose, duration } = useOverlay({
    open,
    onClose,
    ref: modalRef,
    transitionDuration: DURATION_MS,
  });

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity",
          isAnimating ? "opacity-100" : "opacity-0",
          transitionDurations[duration]
        )}
      />
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-lg",
          "bg-white dark:bg-neutral-900",
          "rounded-lg shadow-2xl",
          "max-h-[90vh] transition-all",
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95",
          transitionDurations[duration],
          className
        )}>
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {showCloseButton && <IconButton icon={X} onClick={handleClose} />}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
