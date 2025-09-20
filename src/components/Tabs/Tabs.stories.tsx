import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "one", label: "Tab One", content: "This is the first tab." },
      { id: "two", label: "Tab Two", content: "This is the second tab." },
      { id: "three", label: "Tab Three", content: "This is the third tab." },
    ],
  },
};
