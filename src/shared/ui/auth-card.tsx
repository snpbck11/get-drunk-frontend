"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { Logo } from "./logo";

interface IAuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  hasLink?: boolean;
}

export function AuthCard({ title, subtitle, children, hasLink = false }: IAuthCardProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <div className="flex flex-col sm:flex-row gap-3 rounded-3xl bg-gray-200 dark:bg-slate-900 p-8 border-2 border-gray-400 dark:border-slate-800 shadow-2xl">
      <div className="flex flex-col gap-2">
        <Logo />
        <h1 className="text-4xl">{title}</h1>
        <p className="max-w-sm grow">{subtitle}</p>
        {hasLink && (
          <p>
            Нет аккаунта?{" "}
            <Link
              className="text-purple-600 transition-all transform hover:scale-105"
              href={`/signup?callbackUrl=${callbackUrl}`}>
              Зарегистрироваться
            </Link>
          </p>
        )}
      </div>
      <div className="bg-gray-400 h-0.5 w-full sm:h-auto sm:w-0.5"></div>
      {children}
    </div>
  );
}
