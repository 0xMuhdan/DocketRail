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
        canvas: {
          DEFAULT: "#0b110f",
          deep: "#070b0a",
          panel: "#111a17",
          "panel-hover": "#16221e",
          elevated: "#1c2a25",
        },
        border: {
          dim: "#1b2924",
          subtle: "#243630",
          highlight: "#344c43",
        },
        lime: {
          DEFAULT: "#b6c961",
          light: "#c8db74",
          dim: "#8a9c3e",
          surface: "#182415",
          border: "#32441d",
        },
        forest: {
          DEFAULT: "#10362d",
          light: "#1a473c",
          surface: "#0f231e",
          border: "#1d473d",
        },
        content: {
          primary: "#f2f6f4",
          secondary: "#b4c5bf",
          muted: "#7e938b",
          dim: "#4f635c",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
