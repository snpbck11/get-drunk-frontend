"use client";

import { Button } from "@/shared/ui";
import { usePathname } from "next/navigation";

export function AuthBanner() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="flex flex-col max-w-xl gap-3">
        <h2 className="text-3xl font-bold">Войдите в аккаунт</h2>
        <p>Здесь вы увидите добавленные в избранное заведения</p>
        <Button href={`/signin?callbackUrl=${pathname}`} className="max-w-fit self-center">
          Войти
        </Button>
      </div>
    </div>
  );
}
