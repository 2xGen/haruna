import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Haruna – accent colors: #c58411 (gold), #76a348 (green) */
        nbg: {
          primary: "#c58411",
          green: "#76a348",
          "light-green": "#b8d4a0",
          "lighter-green": "#ecf5e4",
          "hypotheek": "#76a348",
          gold: "#c58411",
          pink: "#7c3aed",
          blue: "#1B3156",
          "light-blue": "#67e8f9",
          "dark-blue": "#01244A",
          white: "#FFFFFF",
          black: "#000000",
          "light-gray": "#E8EAEE",
        },
      },
      fontFamily: {
        sans: ["var(--font-futura)", "Futura PT", "system-ui", "sans-serif"],
        display: ["var(--font-futura)", "Futura PT", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "rounded": "0 8px 20px 0 rgba(2, 44, 91, 0.1)",
        "rounded-hover": "0 8px 20px 0 rgba(2, 44, 91, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
