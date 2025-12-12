"use client";

import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";
import { IconButton, Logo } from "@/shared/ui";
import { Sidebar } from "@/widgets/sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const isTablet = useMediaQuery("md");

  useEffect(() => {
    if (!isTablet) {
      setIsOpen(false);
    }
  }, [isTablet]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  //  на мобилке вообще убрать сайдбар, через drawer сделать
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
