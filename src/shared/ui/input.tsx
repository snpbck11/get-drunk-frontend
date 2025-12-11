"use client";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "../lib";
import { ErrorMessage } from "./error-message";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  inputSize?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3 text-lg",
};

const iconSizeStyles: Record<InputSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon: Icon, inputSize = "md", disabled, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <fieldset className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <Icon className={iconSizeStyles[inputSize]} />
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full rounded-lg transition-all outline-none",
              "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700",
              "text-gray-900 dark:text-gray-100",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20",
              error &&
                "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20",
              disabled && "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900",
              sizeStyles[inputSize],
              Icon && "pl-10",
              type === "password" && "pr-10",
              className
            )}
            type={type === "password" && showPassword ? "text" : type}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
              tabIndex={-1}
              onClick={handleToggleShowPassword}>
              {showPassword ? (
                <EyeOff className={iconSizeStyles[inputSize]} />
              ) : (
                <Eye className={iconSizeStyles[inputSize]} />
              )}
            </button>
          )}
        </div>
        {error && <ErrorMessage message={error} className="mt-1.5 text-sm" />}
      </fieldset>
    );
  }
);

Input.displayName = "Input";
