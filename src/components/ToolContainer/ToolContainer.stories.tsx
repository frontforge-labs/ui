import type { Meta, StoryObj } from "@storybook/react";
import { ToolContainer } from "./ToolContainer";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";
import { Settings } from "lucide-react";

const meta: Meta<typeof ToolContainer> = {
  title: "Components/ToolContainer",
  component: ToolContainer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToolContainer>;

const mockCSS = `.gradient-element {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 8px;
  padding: 20px;
}`;

const Controls = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-2">Direction</label>
      <Select>
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
      </Select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Angle</label>
      <Input type="range" min="0" max="360" defaultValue="45" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Start Color</label>
      <Input type="color" defaultValue="#ff6b6b" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">End Color</label>
      <Input type="color" defaultValue="#4ecdc4" />
    </div>
  </div>
);

const PreviewElement = () => (
  <div className="w-48 h-32 bg-gradient-to-r from-red-400 to-teal-400 rounded-lg flex items-center justify-center text-white font-medium shadow-lg">
    Gradient Preview
  </div>
);

export const Default: Story = {
  args: {
    title: "CSS Gradient Generator",
    description:
      "Create beautiful linear and radial gradients with live preview",
    icon: <Settings size={20} />,
    generatedCSS: mockCSS,
    children: <Controls />,
    previewElement: <PreviewElement />,
    onReset: () => console.log("Reset clicked"),
  },
};

export const NoPreview: Story = {
  args: {
    title: "CSS Gradient Generator",
    description: "Create beautiful linear and radial gradients",
    generatedCSS: mockCSS,
    children: <Controls />,
    showPreview: false,
    onReset: () => console.log("Reset clicked"),
  },
};

export const EmptyCSS: Story = {
  args: {
    title: "CSS Gradient Generator",
    description: "Configure the controls to generate CSS",
    generatedCSS: "",
    children: <Controls />,
    previewElement: <PreviewElement />,
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "CSS Gradient Generator",
    description:
      "Create beautiful linear and radial gradients with live preview",
    generatedCSS: mockCSS,
    children: <Controls />,
    previewElement: <PreviewElement />,
    breadcrumbs: (
      <nav className="text-sm text-muted mb-4">
        <span>Tools</span> → <span>Color</span> → <span>Gradient</span>
      </nav>
    ),
    onReset: () => console.log("Reset clicked"),
  },
};
