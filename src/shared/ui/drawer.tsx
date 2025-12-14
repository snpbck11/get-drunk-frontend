"use client";

import { ReactNode, useRef } from "react";
import { cn } from "../lib";
import { useOverlay } from "../lib/hooks";
import { transitionDurations } from "../lib/transitions";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  headerContent?: (handleClose: () => void) => ReactNode;
  children?: ReactNode;
  drawerClassname?: string;
  containerClassname?: string;
  anchor?: "left" | "right" | "top" | "bottom";
}

const DURATION_MS = 300;

export function Drawer({
  open,
  onClose,
  headerContent,
  children,
  drawerClassname,
  containerClassname,
  anchor = "left",
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const { shouldRender, isAnimating, handleClose, duration } = useOverlay({
    open,
    onClose,
    ref: drawerRef,
    transitionDuration: DURATION_MS,
  });

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 bg-inherit flex overflow-hidden",
        anchor === "left" && "justify-start",
        anchor === "right" && "justify-end",
        anchor === "top" && "flex-col items-start",
        anchor === "bottom" && "flex-col items-end"
      )}>
      <div
        className={cn(
          "absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity",
          transitionDurations[duration],
          isAnimating ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={drawerRef}
        className={cn(
          "relative h-full bg-app shadow-2xl flex flex-col",
          "transition-transform",
          transitionDurations[duration],
          (anchor === "left" || anchor === "right") && "h-full",
          (anchor === "top" || anchor === "bottom") && "w-full",
          anchor === "left" && (isAnimating ? "translate-x-0" : "-translate-x-full"),
          anchor === "right" && (isAnimating ? "translate-x-0" : "translate-x-full"),
          anchor === "top" && (isAnimating ? "translate-y-0" : "-translate-y-full"),
          anchor === "bottom" && (isAnimating ? "translate-y-0" : "translate-y-full"),
          drawerClassname
        )}>
        {headerContent && <div className="shrink-0">{headerContent(handleClose)}</div>}
        <div className={cn("overflow-y-auto flex-1", containerClassname)}>{children}</div>
      </div>
    </div>
  );
}
