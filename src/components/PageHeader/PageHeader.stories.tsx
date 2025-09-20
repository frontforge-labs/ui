import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
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
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'CSS Gradient Tool',
    subtitle: 'Create beautiful CSS gradients with real-time preview',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Color Tools',
    subtitle: 'Professional color utilities for modern web design',
    icon: <Palette size={24} />,
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'CSS Gradient Tool',
    subtitle: 'Create beautiful CSS gradients with real-time preview',
    icon: <Palette size={24} />,
    breadcrumbs: (
      <nav className="flex items-center gap-2 text-xs">
        <span>FrontEnzo</span>
        <span className="text-text-muted">/</span>
        <span>Tools</span>
        <span className="text-text-muted">/</span>
        <span>Color</span>
        <span className="text-text-muted">/</span>
        <span className="text-orange-500 underline font-medium">Gradient</span>
      </nav>
    ),
  },
};