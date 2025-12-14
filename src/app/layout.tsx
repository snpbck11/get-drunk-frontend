import { Providers } from "@/app/_providers/providers";
import { cn } from "@/shared/lib";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetDrunk",
  description: "Смотри сторис любимых заведений своего города",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen",
          "bg-app text-app"
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
