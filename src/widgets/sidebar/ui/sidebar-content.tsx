import { CircleUser } from "lucide-react";
import { links } from "../model/links";
import { SidebarLink } from "./sidebar-link";

interface SidebarContentProps {
  onLinkClick?: () => void;
}

export function SidebarContent({ onLinkClick }: SidebarContentProps) {
  // под заведения запихать категории, под "Вы" избранные может?
  return (
    <nav className="flex flex-col gap-1 h-full pb-4 px-2 w-60">
      {links.map(({ link, label, icon }) => (
        <SidebarLink key={link} link={link} label={label} icon={icon} onClick={onLinkClick} />
      ))}
      <SidebarLink link="/profile" label="Вы" icon={CircleUser} className="mt-auto" onClick={onLinkClick} />
    </nav>
  );
}
