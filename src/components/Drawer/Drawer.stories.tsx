import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import React from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 rounded bg-accent text-accent-foreground"
        >
          Open Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Right Drawer">
          <p>This drawer slides from the right.</p>
        </Drawer>
      </div>
    );
  },
};

export const Left: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 rounded bg-accent text-accent-foreground"
        >
          Open Drawer
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          side="left"
          title="Left Drawer"
        >
          <p>This drawer slides from the left.</p>
        </Drawer>
      </div>
    );
  },
};
