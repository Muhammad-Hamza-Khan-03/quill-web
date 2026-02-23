import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          black: "var(--bg)",
          gray: "var(--card-bg)",
          blue: "#1173d4",
          text: "var(--fg)",
          muted: "var(--muted)",
          border: "var(--border)",
          nav: "var(--nav-bg)",
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
