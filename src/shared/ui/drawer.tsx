"use client";

import { X } from "lucide-react";
import { ReactNode, useRef } from "react";
import { cn } from "../lib";
import { useOverlay } from "../lib/hooks";
import { transitionDurations } from "../lib/transitions";
import { IconButton } from "./icon-button";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const DURATION_MS = 500;

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const { shouldRender, isAnimating, handleClose, duration } = useOverlay({
    open,
    onClose,
    ref: drawerRef,
    transitionDuration: DURATION_MS,
  });

  if (!shouldRender) return null;

  return (
    <div ref={drawerRef} className={"absolute inset-0 z-50 flex justify-end overflow-hidden"}>
      <div
        onClick={handleClose}
        className={cn(
          "absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity",
          transitionDurations[duration],
          isAnimating ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "relative h-full w-2/3 bg-white dark:bg-zinc-900 shadow-2xl", // с шириной еще подумать
          "transition-transform",
          transitionDurations[duration],
          isAnimating ? "translate-x-0" : "translate-x-full",
          className
        )}>
        <div className="flex gap-2 items-center pr-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <IconButton icon={X} onClick={handleClose} iconClassName="w-5 h-5" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
}
