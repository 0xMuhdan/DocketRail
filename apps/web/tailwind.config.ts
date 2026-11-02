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
        forest: {
          50: "#f0fdf6",
          100: "#dbfceb",
          200: "#bbf7d6",
          300: "#86efb8",
          400: "#4ade93",
          500: "#22c573",
          600: "#16a35a",
          700: "#158049",
          800: "#15653c",
          900: "#0f392b",
          950: "#09241b",
        },
        lime: {
          50: "#f7fee7",
          100: "#ecfccb",
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
          950: "#1a2e05",
        },
      },
    },
  },
  plugins: [],
};

export default config;
