import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--fe-bg)",
        },
        text: {
          DEFAULT: "var(--fe-text)",
        },
        accent: {
          DEFAULT: "var(--fe-accent)",
          foreground: "var(--fe-accent-foreground)",
        },
        border: {
          DEFAULT: "var(--fe-border)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--fe-radius)",
      },
    },
  },
  plugins: [],
};
export default config;
