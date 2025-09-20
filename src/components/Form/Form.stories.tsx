import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Checkbox } from "../Checkbox/Checkbox";
import React from "react";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert("Form submitted!");
    };

    return (
      <Form
        title="Sign In"
        description="Enter your credentials to continue."
        onSubmit={handleSubmit}
      >
        <FormField id="email" label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </FormField>

        <FormField id="password" label="Password" required>
          <Input type="password" placeholder="********" />
        </FormField>

        <FormField id="remember" label="Remember me">
          <Checkbox />
        </FormField>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded bg-accent text-accent-foreground"
        >
          Submit
        </button>
      </Form>
    );
  },
};

export const WithErrorSummary: Story = {
  render: () => (
    <Form
      title="Create Account"
      errorSummary="Please fix the errors before continuing."
    >
      <FormField id="username" label="Username" error="Username is required">
        <Input />
      </FormField>

      <FormField id="password" label="Password" error="Password too short">
        <Input type="password" />
      </FormField>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded bg-accent text-accent-foreground"
      >
        Register
      </button>
    </Form>
  ),
};
