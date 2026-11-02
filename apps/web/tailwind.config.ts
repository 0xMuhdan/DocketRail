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
        base: {
          950: "#0b0f0e",
          900: "#121816",
          850: "#18201d",
          800: "#222c28",
          700: "#33413c",
          600: "#4e615a",
          400: "#8a9e96",
          300: "#b4c4be",
          200: "#d9e3df",
          100: "#f0f5f3",
        },
        brand: {
          DEFAULT: "#15803d",
          hover: "#166534",
          light: "#22c55e",
          surface: "#0f231a",
          border: "#1d4734",
        },
      },
    },
  },
  plugins: [],
};

export default config;
