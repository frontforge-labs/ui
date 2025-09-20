import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const WithInput: Story = {
  render: () => (
    <FormField
      id="email"
      label="Email address"
      description="We'll never share your email."
    >
      <Input type="email" placeholder="Enter email" />
    </FormField>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <FormField id="message" label="Message" description="Max 500 characters.">
      <Textarea placeholder="Write your message..." />
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <FormField
      id="terms"
      label="Accept terms"
      error="You must accept terms to continue."
    >
      <Checkbox />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField id="email" label="Email" error="Invalid email address" required>
      <Input type="email" placeholder="john@example.com" />
    </FormField>
  ),
};
