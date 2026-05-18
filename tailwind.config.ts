import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          light: "#152E52",
          dark: "#051121",
        },
        yellow: {
          DEFAULT: "#FFD93D",
          hover: "#FFE066",
        },
        ink: "#0D0D0D",
        muted: "#6B7280",
        surface: "#F9F8F6",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tracked: "0.12em",
      },
      borderRadius: {
        small: "16px",
        large: "24px",
      },
      boxShadow: {
        premium: "0 20px 40px -15px rgba(11, 31, 58, 0.08)",
        "premium-hover": "0 30px 60px -15px rgba(11, 31, 58, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
