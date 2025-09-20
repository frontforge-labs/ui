import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import React from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { defaultChecked: false },
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = React.useState(false);
    return (
      <div className="flex items-center gap-2">
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
        <span>{on ? "On" : "Off"}</span>
      </div>
    );
  },
};
