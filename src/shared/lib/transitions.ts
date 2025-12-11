export type TDuration = 100 | 200 | 300 | 400 | 500 | 700 | 1000;

export const transitionDurations: Record<TDuration, string> = {
  100: "duration-100",
  200: "duration-200",
  300: "duration-300",
  400: "duration-400",
  500: "duration-500",
  700: "duration-700",
  1000: "duration-1000",
} as const;
