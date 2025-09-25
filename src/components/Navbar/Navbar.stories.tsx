import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import React from "react";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState("home");

    return (
      <Navbar
        brand={<span className="font-bold text-accent">FrontForge</span>}
        items={[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ]}
        activeId={active}
        onSelect={setActive}
        rightContent={
          <button className="px-3 py-1 rounded bg-accent text-accent-foreground">
            Sign In
          </button>
        }
      />
    );
  },
};

export const WithMobileToggle: Story = {
  render: () => {
    const [active, setActive] = React.useState("home");

    return (
      <Navbar
        brand={<span className="font-bold">MyApp</span>}
        items={[
          { id: "home", label: "Home" },
          { id: "services", label: "Services" },
          { id: "pricing", label: "Pricing" },
        ]}
        activeId={active}
        onSelect={setActive}
        rightContent={<span>User</span>}
      />
    );
  },
};
