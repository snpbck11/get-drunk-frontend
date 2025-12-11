import { ReactNode } from "react";
import { cn } from "../lib";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ children, className, containerClassName }: SectionProps) {
  return (
    <section className={cn("flex flex-col justify-center py-16 px-4", className)}>
      <div className={cn("max-w-6xl w-full mx-auto", containerClassName)}>{children}</div>
    </section>
  );
}
