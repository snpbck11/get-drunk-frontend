"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "../lib";
import { Dropdown, DropdownItem } from "./dropdown";
import { ErrorMessage } from "./error-message";

type SelectSize = "sm" | "md" | "lg";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

interface SelectProps<T = string> {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  selectSize?: SelectSize;
  className?: string;
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3 text-lg",
};

const iconSizeStyles: Record<SelectSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function Select<T = string>({
  label,
  placeholder = "Выберите опцию",
  error,
  disabled,
  selectSize = "md",
  className,
  options,
  value,
  onChange,
}: SelectProps<T>) {
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: T) => {
    onChange?.(optionValue);
  };

  return (
    <fieldset className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          {label}
        </label>
      )}
      <Dropdown
        align="left"
        className="w-full max-h-60 overflow-auto"
        trigger={
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "w-full rounded-lg transition-all outline-none text-left flex items-center justify-between gap-2",
              "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700",
              "text-gray-900 dark:text-gray-100",
              "focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20",
              error &&
                "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20",
              disabled && "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900",
              sizeStyles[selectSize],
              className
            )}>
            <span className={cn(!selectedOption && "text-gray-400 dark:text-gray-500")}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              className={cn("transition-transform flex-shrink-0", iconSizeStyles[selectSize])}
            />
          </button>
        }>
        {options.map((option, index) => {
          const Icon = option.icon;
          const isSelected = option.value === value;

          return (
            <DropdownItem
              key={String(option.value) + index}
              icon={Icon}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={cn(
                isSelected &&
                  "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                option.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}>
              {option.label}
            </DropdownItem>
          );
        })}
      </Dropdown>
      {error && <ErrorMessage message={error} className="mt-1.5 text-sm" />}
    </fieldset>
  );
}
