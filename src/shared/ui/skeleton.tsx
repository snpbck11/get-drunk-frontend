import { cn } from "../lib";

interface ISkeletonProps {
  className?: string;
}

export function Skeleton({ className }: ISkeletonProps) {
  const combinedClassName = cn(
    "bg-gray-300 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg animate-pulse",
    className
  );

  return <div className={combinedClassName}></div>;
}
