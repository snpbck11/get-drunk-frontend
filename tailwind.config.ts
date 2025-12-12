import { screens } from "@/shared/config";
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    screens,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
};

export default config;
