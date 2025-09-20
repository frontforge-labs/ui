import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Tooltip content="Top tooltip" side="top">
        <button className="px-3 py-1 bg-accent text-accent-foreground rounded">
          Top
        </button>
      </Tooltip>

      <Tooltip content="Right tooltip" side="right">
        <button className="px-3 py-1 bg-accent text-accent-foreground rounded">
          Right
        </button>
      </Tooltip>

      <Tooltip content="Bottom tooltip" side="bottom">
        <button className="px-3 py-1 bg-accent text-accent-foreground rounded">
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Left tooltip" side="left">
        <button className="px-3 py-1 bg-accent text-accent-foreground rounded">
          Left
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="I show after 500ms" delay={500}>
      <button className="px-3 py-1 bg-accent text-accent-foreground rounded">
        Hover me
      </button>
    </Tooltip>
  ),
};
