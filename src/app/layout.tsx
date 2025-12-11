import { Providers } from "@/app/_providers/providers";
import { cn } from "@/shared/lib";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "City Stories - Discover Local Places",
  description: "Watch stories from your favorite local businesses",
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
          "bg-white dark:bg-zinc-950 text-gray-950 dark:text-gray-50"
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
