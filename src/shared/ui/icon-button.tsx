import { LucideIcon } from "lucide-react";
import { cn } from "../lib";

interface IIconButtonProps {
  onClick?: () => void;
  icon: LucideIcon;
  text?: string;
  iconClassName?: string;
  buttonClassName?: string;
}

export function IconButton({
  onClick,
  icon,
  text,
  iconClassName,
  buttonClassName,
}: IIconButtonProps) {
  const handleClick = () => {
    onClick?.();
  };

  const Icon = icon;

  return (
    <div className={cn(text && "flex flex-col gap-2 items-center")}>
      <button
        onClick={handleClick}
        className={cn(
          "bg-transparent p-2 rounded-full dark:hover:bg-white/20 hover:bg-black/10 transition-all",
          "active:bg-black/20 dark:active:bg-white/50",
          buttonClassName
        )}>
        <Icon className={cn("w-7 h-7", iconClassName)} />
      </button>
      {text && <p className="text-xs max-w-14 text-ellipsis overflow-hidden">{text}</p>}
    </div>
  );
}
