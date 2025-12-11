import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib";
import { SpinnerLoader } from "./spinner-loader";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-yellow-400 hover:bg-yellow-300 text-purple-900 shadow-lg",
  secondary: "bg-purple-600 hover:bg-purple-700 text-white",
  outline: "border-2 border-purple-600 text-purple-600",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost:
    "bg-transparent hover:bg-black/30 border-2 border-gray-800 text-gray-900 dark:hover:bg-white/30 dark:border-white dark:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "p-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const classes = cn(
    "font-bold rounded-full transition-all inline-flex items-center justify-center text-center",
    !isDisabled && "transform hover:scale-105",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isDisabled} {...props}>
      {children}
      {isLoading && <SpinnerLoader className="w-5 h-5 ml-2" />}
    </button>
  );
}
