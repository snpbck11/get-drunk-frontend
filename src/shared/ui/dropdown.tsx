"use client";

import { LucideIcon } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

interface IDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export interface IDropdownItemProps {
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  className?: string;
}

export type TMenuItem =
  | {
      type: "item";
      label: string;
      icon: IDropdownItemProps["icon"];
      onClick: () => void;
      variant?: IDropdownItemProps["variant"];
    }
  | {
      type: "separator";
    };

import { createContext, useContext } from "react";
import { cn } from "../lib";
import { useClickOutside, useEscape } from "../lib/hooks";

const DropdownContext = createContext<{ close: () => void } | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownItem должен юзаться внутри <Dropdown>");
  return ctx;
}

export function Dropdown({ trigger, children, align = "right", className }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  useEscape({ onEscape: handleCloseDropdown, enabled: isOpen });
  useClickOutside({ ref: dropdownRef, onClickOutside: handleCloseDropdown, enabled: isOpen });

  return (
    <div ref={dropdownRef} className="relative max-h-min">
      <div onClick={handleToggleDropdown}>{trigger}</div>
      <div
        className={cn(
          "absolute top-full mt-2 min-w-fit",
          "bg-transparent/20",
          "backdrop-blur-lg",
          "rounded-lg shadow-xl",
          "py-2 z-50",
          "border border-gray-200/50 dark:border-gray-700/50",
          "transition-all duration-200",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          align === "right" && "right-0",
          align === "left" && "left-0",
          className
        )}>
        <DropdownContext.Provider value={{ close: handleCloseDropdown }}>
          {children}
        </DropdownContext.Provider>
      </div>
    </div>
  );
}

export function DropdownItem({
  icon: Icon,
  children,
  onClick,
  variant = "default",
  className,
}: IDropdownItemProps) {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full px-4 py-2 text-left flex items-center gap-3",
        "hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
        "active:bg-black/10 dark:active:bg-white/20",
        variant === "danger" &&
          "text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/20 active:bg-red-300 dark:active:bg-red-900/10",
        className
      )}>
      {Icon && <Icon className="w-4 h-4" />}
      <p className="text-sm text-nowrap">{children}</p>
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />;
}
