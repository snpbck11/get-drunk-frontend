"use client";

import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";
import { Drawer, MenuHeader } from "@/shared/ui";
import { Sidebar, SidebarContent } from "@/widgets/sidebar";
import { useEffect, useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleToggleMenu = () => {
    setIsOpenSidebar((prev) => !prev);
    setIsOpenDrawer((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const isTablet = useMediaQuery("md");
  const isDesktop = useMediaQuery("lg");

  useEffect(() => {
    if (!isTablet || !isDesktop) {
      setIsOpenDrawer(false);
      setIsOpenSidebar(false);
    }
  }, [isTablet, isDesktop]);

  return (
    <div className="flex flex-col h-screen">
      <header className="h-[56px]">
        <MenuHeader onClick={handleToggleMenu} />
      </header>
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar isExpanded={isDesktop && isOpenSidebar} className="hidden sm:block" />
        <div className="lg:hidden">
          <Drawer
            open={isOpenDrawer}
            onClose={handleCloseDrawer}
            headerContent={(handleClose) => <MenuHeader onClick={handleClose} />}>
            <SidebarContent onLinkClick={handleCloseDrawer} />
          </Drawer>
        </div>
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
