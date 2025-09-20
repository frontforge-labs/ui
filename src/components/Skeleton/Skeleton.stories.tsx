import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const InlineText: Story = {
  render: () => <Skeleton loading className="inline-block h-6 w-32 rounded" />,
};

export const CardExample: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <Skeleton loading className="h-32 w-full rounded-lg" />
      <Skeleton loading className="h-4 w-3/4 rounded" />
      <Skeleton loading className="h-4 w-1/2 rounded" />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Skeleton loading={false} className="p-4 border border-border rounded w-72">
      <div className="space-y-2">
        <div className="text-text font-medium">Loaded card</div>
        <div className="text-text/70 text-sm">
          This is the actual content shown once data is ready.
        </div>
      </div>
    </Skeleton>
  ),
};
