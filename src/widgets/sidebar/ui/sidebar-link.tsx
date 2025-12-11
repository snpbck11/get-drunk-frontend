"use client";

import { cn } from "@/shared/lib";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarLinkProps {
  link: string;
  label: string;
  icon: LucideIcon;
  vertical?: boolean;
}

export function SidebarLink({ link, label, icon: Icon, vertical }: ISidebarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg pl-[18px]",
        isActive ? "bg-blue-500 dark:bg-purple-600" : "hover:bg-blue-300 dark:hover:bg-purple-300",
        vertical && "flex-col p-2 pt-3"
      )}>
      <Icon className="w-5 h-5" />
      <p className={cn("text-sm font-medium", vertical && "text-center text-[10px]")}>{label}</p>
    </Link>
  );
}
