import type { Preview } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react";
import React from "react";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: ["light", "dark"],
      showName: true,
    },
  },
};

// 👇 explicitly typed as a Storybook decorator
export const decorators: Decorator[] = [
  (Story, context) => {
    const theme = context.globals.theme as "light" | "dark";
    return (
      <div data-theme={theme} style={{ padding: "2rem" }}>
        <Story />
      </div>
    );
  },
];

export default preview;
