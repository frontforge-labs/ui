import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import React from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 rounded bg-accent text-accent-foreground"
        >
          Open Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} title="Example Modal">
          <p>This is a modal body.</p>
        </Modal>
      </div>
    );
  },
};
