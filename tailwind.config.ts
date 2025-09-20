import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--fe-bg)",
        text: "var(--fe-text)",
        accent: "var(--fe-accent)",
        "accent-foreground": "var(--fe-accent-foreground)",
        border: "var(--fe-border)",
      },
      borderRadius: {
        DEFAULT: "var(--fe-radius)",
      },
    },
  },
  plugins: [],
};

export default config;
