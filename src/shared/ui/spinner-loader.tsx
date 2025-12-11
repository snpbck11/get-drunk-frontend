import { cn } from "../lib";

interface ISpinnerLoaderProps {
  className?: string;
}

export function SpinnerLoader({ className }: ISpinnerLoaderProps) {
  return (
    <div
      className={cn(
        "w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin",
        className
      )}
    />
  );
}
