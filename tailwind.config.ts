import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: "#0e0e0e",
        surface: "#1a1a1a",
        surface2: "#242424",
        border: "#2e2e2e",
        "text-primary": "#f0ece4",
        muted: "#6b6b6b",
        accent: "#c8f135",
        danger: "#ff5c5c",
        info: "#5cb8ff",
      },
    },
  },
  plugins: [],
}

export default config
