import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4 bg-bg text-text">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Colorful: Story = {
  args: {
    variant: 'colorful',
    size: 'md',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    size: 'md',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
    size: 'md',
  },
};

export const ColorfulSmall: Story = {
  args: {
    variant: 'colorful',
    size: 'sm',
  },
};

export const ColorfulLarge: Story = {
  args: {
    variant: 'colorful',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle variant="colorful" size="sm" />
      <ThemeToggle variant="colorful" size="md" />
      <ThemeToggle variant="colorful" size="lg" />
    </div>
  ),
};