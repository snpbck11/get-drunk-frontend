import { cn } from "@/shared/lib";
import { CircleUser, Home, ListVideo, Martini } from "lucide-react";
import { SidebarLink } from "./sidebar-link";

const links = [
  { link: "/", label: "Главная", icon: Home },
  { link: "/stories", label: "Сторисы", icon: ListVideo },
  { link: "/organizations", label: "Заведения", icon: Martini },
];

interface ISidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: ISidebarProps) {
  return (
    <aside className={cn("flex flex-col", isOpen ? "w-60" : "w-16")}>
      <div className="h-full flex flex-col pb-4 px-1 justify-between">
        <nav className="flex flex-col gap-1">
          {links.map(({ link, label, icon }) => (
            <SidebarLink key={link} link={link} label={label} icon={icon} vertical={!isOpen} />
          ))}
        </nav>
        <SidebarLink link="/profile" label="Вы" icon={CircleUser} vertical={!isOpen} />
      </div>
    </aside>
  );
}
