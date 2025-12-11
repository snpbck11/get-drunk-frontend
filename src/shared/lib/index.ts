// Серверные утилиты (безопасно экспортировать)
export { cn } from "./cn";
export { createAppThunk } from "./create-app-thunk";
export * from "./utils";

// Клиентские хуки НЕ экспортируются отсюда!
// Импортируй напрямую:
// import { useClickOutside } from "@/shared/lib/hooks/use-click-outside";

