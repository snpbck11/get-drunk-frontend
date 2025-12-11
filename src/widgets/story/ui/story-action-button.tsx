import { cn } from "@/shared/lib";
import { LucideIcon } from "lucide-react";

interface StoryActionButtonProps {
  onClick?: () => void;
  icon: LucideIcon;
  text?: string;
  isActive?: boolean;
}

export function StoryActionButton({
  onClick,
  icon,
  text,
  isActive = false,
}: StoryActionButtonProps) {
  const handleClick = () => {
    onClick?.();
  };

  const Icon = icon;

  return (
    <div className={cn(text && "flex flex-col gap-2 items-center")}>
      <button
        onClick={handleClick}
        className="bg-transparent p-2 rounded-full hover:bg-white/20 transition-all">
        <Icon className={cn("w-7 h-7 text-white", isActive && "fill-white")} />
      </button>
      {text && <p className="text-xs text-white max-w-14 text-ellipsis overflow-hidden">{text}</p>}
    </div>
  );
}
