import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "item1",
        title: "First Item",
        content: "This is the content for the first item.",
      },
      {
        id: "item2",
        title: "Second Item",
        content: "This is the content for the second item.",
      },
      {
        id: "item3",
        title: "Third Item",
        content: "This is the content for the third item.",
      },
    ],
  },
};

export const MultipleOpen: Story = {
  args: {
    allowMultiple: true,
    items: [
      {
        id: "item1",
        title: "Item A",
        content: "Content for A",
      },
      {
        id: "item2",
        title: "Item B",
        content: "Content for B",
      },
    ],
  },
};
