import { ThemeProvider } from "next-themes";
import { AuthInitializer } from "./auth-initializer";
import StoreProvider from "./store-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthInitializer />
      <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
    </StoreProvider>
  );
}
