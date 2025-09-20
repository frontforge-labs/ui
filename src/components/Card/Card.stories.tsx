import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>Card Header</CardHeader>
      <CardBody>
        <p>This is the body of the card.</p>
      </CardBody>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
};
