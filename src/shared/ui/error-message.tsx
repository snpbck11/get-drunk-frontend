import { cn } from "../lib";

interface IErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: IErrorMessageProps) {
  return <p className={cn("text-red-500 dark:text-red-400", className)}>{message}</p>;
}
