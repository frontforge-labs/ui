import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from './StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    valueClassName: {
      control: 'text',
    },
    titleClassName: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Users',
    value: '1,234',
  },
};

export const WithCustomColors: Story = {
  args: {
    title: 'Ready',
    value: '8',
    valueClassName: 'text-success',
  },
};

export const Large: Story = {
  args: {
    title: 'Revenue',
    value: '$45,678',
    valueClassName: 'text-accent text-3xl',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <StatsCard
        title="Ready"
        value="1"
        valueClassName="text-success"
      />
      <StatsCard
        title="Coming Soon"
        value="6"
        valueClassName="text-warning"
      />
      <StatsCard
        title="Planned"
        value="8"
        valueClassName="text-info"
      />
      <StatsCard
        title="Categories"
        value="8"
        valueClassName="text-accent"
      />
    </div>
  ),
};