import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import {
  Settings,
  Palette,
  Type,
  Zap,
} from "lucide-react";
import React from "react";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

const mockCategories = [
  {
    id: "color",
    title: "Color Tools",
    description: "Color generation and manipulation tools",
    icon: <Palette size={16} />,
    color: "from-pink-500 to-rose-600",
    path: "/tools/color",
    tools: [
      {
        name: "Gradient Generator",
        path: "/tools/color/gradient",
        status: "ready" as const,
      },
      {
        name: "Color Picker",
        path: "/tools/color/picker",
        status: "coming-soon" as const,
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text styling and font tools",
    icon: <Type size={16} />,
    color: "from-blue-500 to-indigo-600",
    path: "/tools/typography",
    tools: [
      {
        name: "Font Pairing",
        path: "/tools/typography/pairing",
        status: "planned" as const,
      },
      {
        name: "Text Effects",
        path: "/tools/typography/effects",
        status: "coming-soon" as const,
      },
    ],
  },
  {
    id: "effects",
    title: "Effects & Filters",
    description: "Visual effects and CSS filters",
    icon: <Zap size={16} />,
    color: "from-purple-500 to-violet-600",
    path: "/tools/effects",
    tools: [
      {
        name: "Box Shadow",
        path: "/tools/effects/shadow",
        status: "ready" as const,
      },
      {
        name: "Text Shadow",
        path: "/tools/effects/text-shadow",
        status: "coming-soon" as const,
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [activeCategoryId, setActiveCategoryId] = React.useState<string>();
    const [activeToolPath, setActiveToolPath] = React.useState<string>();
    const [collapsed, setCollapsed] = React.useState(false);

    const handleNavigate = (path: string) => {
      // Determine if it's a category or tool path
      const category = mockCategories.find((cat) => cat.path === path);
      if (category) {
        setActiveCategoryId(category.id);
        setActiveToolPath(undefined);
      } else {
        // Find which category this tool belongs to
        const parentCategory = mockCategories.find((cat) =>
          cat.tools.some((tool) => tool.path === path)
        );
        if (parentCategory) {
          setActiveCategoryId(parentCategory.id);
          setActiveToolPath(path);
        }
      }
    };

    return (
      <ThemeProvider defaultTheme="system" storageKey="storybook-theme">
        <div className="flex h-screen">
          <Sidebar
            categories={mockCategories}
            activeCategoryId={activeCategoryId}
            activeToolPath={activeToolPath}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            onNavigate={handleNavigate}
          />
          <main className="flex-1 p-4 bg-background">
            <div className="space-y-4">
              <h1 className="text-xl font-bold">Sidebar Demo</h1>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Active Category:</strong> {activeCategoryId || "None"}
                </p>
                <p>
                  <strong>Active Tool:</strong> {activeToolPath || "None"}
                </p>
                <p>
                  <strong>Collapsed:</strong> {collapsed ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [activeCategoryId, setActiveCategoryId] =
      React.useState<string>("color");
    const [activeToolPath, setActiveToolPath] = React.useState<string>();
    const [collapsed, setCollapsed] = React.useState(true);

    const handleNavigate = (path: string) => {
      // Determine if it's a category or tool path
      const category = mockCategories.find((cat) => cat.path === path);
      if (category) {
        setActiveCategoryId(category.id);
        setActiveToolPath(undefined);
      } else {
        // Find which category this tool belongs to
        const parentCategory = mockCategories.find((cat) =>
          cat.tools.some((tool) => tool.path === path)
        );
        if (parentCategory) {
          setActiveCategoryId(parentCategory.id);
          setActiveToolPath(path);
        }
      }
    };

    return (
      <ThemeProvider defaultTheme="system" storageKey="storybook-theme">
        <div className="flex h-screen">
          <Sidebar
            categories={mockCategories}
            activeCategoryId={activeCategoryId}
            activeToolPath={activeToolPath}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            onNavigate={handleNavigate}
          />
          <main className="flex-1 p-4 bg-background">
            <div className="space-y-4">
              <h1 className="text-xl font-bold">Collapsed Sidebar Demo</h1>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Active Category:</strong> {activeCategoryId || "None"}
                </p>
                <p>
                  <strong>Active Tool:</strong> {activeToolPath || "None"}
                </p>
                <p>
                  <strong>Collapsed:</strong> {collapsed ? "Yes" : "No"}
                </p>
                <p className="text-muted-foreground">
                  Click the toggle button to expand
                </p>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [activeCategoryId, setActiveCategoryId] = React.useState<string>();
    const [activeToolPath, setActiveToolPath] = React.useState<string>();
    const [collapsed, setCollapsed] = React.useState(false);

    const handleNavigate = (path: string) => {
      const category = mockCategories.find((cat) => cat.path === path);
      if (category) {
        setActiveCategoryId(category.id);
        setActiveToolPath(undefined);
      } else {
        const parentCategory = mockCategories.find((cat) =>
          cat.tools.some((tool) => tool.path === path)
        );
        if (parentCategory) {
          setActiveCategoryId(parentCategory.id);
          setActiveToolPath(path);
        }
      }
    };

    return (
      <ThemeProvider defaultTheme="system" storageKey="storybook-theme">
        <div className="flex h-screen">
          <Sidebar
            categories={mockCategories}
            activeCategoryId={activeCategoryId}
            activeToolPath={activeToolPath}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            onNavigate={handleNavigate}
            footer={
              <div className="flex items-center gap-2">
                <Settings size={16} />
                {!collapsed && <span className="text-sm">Settings</span>}
              </div>
            }
          />
          <main className="flex-1 p-4 bg-background">
            <div className="space-y-4">
              <h1 className="text-xl font-bold">Sidebar with Footer</h1>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Active Category:</strong> {activeCategoryId || "None"}
                </p>
                <p>
                  <strong>Active Tool:</strong> {activeToolPath || "None"}
                </p>
                <p>
                  <strong>Collapsed:</strong> {collapsed ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  },
};
