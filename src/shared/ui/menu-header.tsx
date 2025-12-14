import { Menu } from "lucide-react";
import Link from "next/link";
import { IconButton } from "./icon-button";
import { Logo } from "./logo";

interface IMenuHeaderProps {
  onClick?: () => void;
}

export function MenuHeader({ onClick }: IMenuHeaderProps) {
  return (
    <div className="flex items-center gap-4 pl-[10px] my-2">
      <IconButton icon={Menu} onClick={onClick} />
      <Link href="/" className="text-2xl font-bold">
        <Logo />
      </Link>
    </div>
  );
}
