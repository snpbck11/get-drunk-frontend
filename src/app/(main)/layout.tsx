"use client";

import { IconButton, Logo } from "@/shared/ui";
import { Sidebar } from "@/widgets/sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="h-[56px]">
        <div className="flex items-center gap-4 pl-[10px] my-2">
          <IconButton icon={Menu} onClick={handleToggleMenu} />
          <Link href="/" className="text-2xl font-bold">
            <Logo />
          </Link>
        </div>
      </header>
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
