import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toast message="Default toast" inline />
      <Toast message="Success toast" type="success" inline />
      <Toast message="Error toast" type="error" inline />
    </div>
  ),
};

export const Positioned: Story = {
  render: () => (
    <div className="h-[220px] w-[420px] relative bg-bg border border-border rounded">
      {/* One fixed toast so you can see the placement */}
      <Toast message="Bottom right (default)" />
    </div>
  ),
};

export const Live: Story = {
  render: () => {
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
      if (!show) return;
      const t = setTimeout(() => setShow(false), 1500);
      return () => clearTimeout(t);
    }, [show]);

    return (
      <div className="space-x-2">
        <button
          className="px-3 py-1 rounded bg-accent text-accent-foreground"
          onClick={() => setShow(true)}
        >
          Show toast
        </button>
        {show && <Toast message="Saved!" type="success" />}
      </div>
    );
  },
};
