import { cn } from "@/shared/lib";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </div>
  );
}
