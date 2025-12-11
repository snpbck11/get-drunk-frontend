"use client";

import { getCurrentUser } from "@/features/auth";
import { useAppDispatch } from "@/shared/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthInitializer() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isPublicPage = pathname === "/signin" || pathname === "/signup";

  useEffect(() => {
    if (!isPublicPage) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isPublicPage]);

  return null;
}
