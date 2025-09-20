import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { Home, Settings, User } from "lucide-react";
import React from "react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState("home");

    return (
      <div className="flex h-screen">
        <Sidebar
          items={[
            { id: "home", label: "Home", icon: <Home size={16} /> },
            { id: "profile", label: "Profile", icon: <User size={16} /> },
            { id: "settings", label: "Settings", icon: <Settings size={16} /> },
          ]}
          activeId={active}
          onSelect={setActive}
        />
        <main className="flex-1 p-4">
          <h1 className="text-xl font-bold">Active: {active}</h1>
        </main>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [active, setActive] = React.useState("home");

    return (
      <div className="flex h-screen">
        <Sidebar
          collapsed
          items={[
            { id: "home", label: "Home", icon: <Home size={16} /> },
            { id: "profile", label: "Profile", icon: <User size={16} /> },
            { id: "settings", label: "Settings", icon: <Settings size={16} /> },
          ]}
          activeId={active}
          onSelect={setActive}
        />
        <main className="flex-1 p-4">
          <h1 className="text-xl font-bold">Active: {active}</h1>
        </main>
      </div>
    );
  },
};
