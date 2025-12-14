import { cn } from "@/shared/lib";
import { CircleUser } from "lucide-react";
import { links } from "../model/links";
import { SidebarContent } from "./sidebar-content";
import { SidebarLink } from "./sidebar-link";

interface ISidebarProps {
  isExpanded: boolean;
  className?: string;
}

export function Sidebar({ isExpanded, className }: ISidebarProps) {
  return (
    <aside className={cn("flex flex-col", className)}>
      <>
        {isExpanded ? (
          <SidebarContent />
        ) : (
          <nav className="flex flex-col gap-1 h-full pb-4 px-1 w-16">
            {links.map(({ link, label, icon }) => (
              <SidebarLink key={link} link={link} label={label} icon={icon} vertical />
            ))}

            <SidebarLink link="/profile" label="Вы" icon={CircleUser} vertical />
          </nav>
        )}
      </>
    </aside>
  );
}
