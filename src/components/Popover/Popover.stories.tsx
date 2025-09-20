import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover
      content={
        <div className="space-y-2">
          <button className="block w-full text-left px-2 py-1 rounded hover:bg-border">
            Profile
          </button>
          <button className="block w-full text-left px-2 py-1 rounded hover:bg-border">
            Settings
          </button>
          <button className="block w-full text-left px-2 py-1 text-red-600 hover:bg-border">
            Logout
          </button>
        </div>
      }
    >
      <button className="px-3 py-1 rounded bg-accent text-accent-foreground">
        Open Popover
      </button>
    </Popover>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Popover
      side="right"
      content={<div className="p-2">Right-positioned content</div>}
    >
      <button className="px-3 py-1 rounded bg-accent text-accent-foreground">
        Right
      </button>
    </Popover>
  ),
};
