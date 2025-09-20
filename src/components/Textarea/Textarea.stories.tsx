import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  args: {
    placeholder: "Write something...",
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
