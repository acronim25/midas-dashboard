import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "rgba(255,255,255,0.03)",
          foreground: "#fafafa",
        },
        border: "rgba(255,255,255,0.06)",
        muted: {
          DEFAULT: "rgba(255,255,255,0.5)",
          foreground: "rgba(255,255,255,0.7)",
        },
        accent: {
          DEFAULT: "#22c55e",
          foreground: "#0a0a0a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
      },
      borderRadius: {
        lg: "16px",
        xl: "20px",
      },
      backdropBlur: {
        xl: "24px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
}
export default config
