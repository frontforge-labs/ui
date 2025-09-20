import type { Preview } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react";
import React from "react";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators: Decorator[] = [
  (Story, context) => {
    const theme = (context.globals.theme as "light" | "dark") ?? "light";
    return (
      <div data-theme={theme} className="bg-bg text-text min-h-svh p-8">
        <Story />
      </div>
    );
  },
];

export default preview;
