import * as React from "react";
import { cn } from "../../utils/cn";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { AppIcon } from "../AppIcon";
import { Tooltip } from "../Tooltip";

export interface SidebarTool {
  name: string;
  path: string;
  status: "ready" | "coming-soon" | "planned";
}

export interface SidebarCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tools: SidebarTool[];
  path: string;
}

export interface SidebarProps {
  categories: SidebarCategory[];
  activeId?: string;
  activeCategoryId?: string;
  activeToolPath?: string;
  collapsed?: boolean;
  onToggleCollapse: () => void;
  onNavigate: (path: string) => void;
  className?: string;
  footer?: React.ReactNode;
}

export function Sidebar({
  categories,
  activeId,
  activeCategoryId,
  activeToolPath,
  collapsed = false,
  onToggleCollapse,
  onNavigate,
  className,
  footer,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set());

  const toggleCategory = (categoryId: string) => {
    if (collapsed) return;

    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "h-screen border-r border-border bg-surface-1 text-text flex flex-col shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* App Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AppIcon size={32} />
          {!collapsed && (
            <div>
              <span className="font-bold text-lg text-text">FrontForge</span>
              <p className="text-xs text-text-muted">CSS Tools & Generators</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {/* Categories */}
        <div className="space-y-1">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const isActive = activeCategoryId === category.id;
            const hasActiveTool = category.tools.some(
              (tool) => tool.path === activeToolPath
            );

            return (
              <div key={category.id} className="w-full">
                {/* Category Header */}
                <Tooltip
                  content={category.title}
                  side="right"
                  className={collapsed ? "" : "hidden"}
                >
                  <button
                    onClick={() => {
                      if (collapsed) {
                        onNavigate(category.path);
                      } else {
                        toggleCategory(category.id);
                        if (!isExpanded) {
                          onNavigate(category.path);
                        }
                      }
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 group",
                      isActive && !hasActiveTool
                        ? "text-orange-600"
                        : isExpanded
                          ? "text-text"
                          : "text-text-muted hover:text-text"
                    )}
                  >
                    {/* Icon with conditional background */}

                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                        collapsed && "mr-0",
                        (isActive && !hasActiveTool) ||
                          (!collapsed && isExpanded)
                          ? `bg-gradient-to-br ${category.color} text-white shadow-sm`
                          : "text-text-muted group-hover:text-text"
                      )}
                    >
                      {category.icon}
                    </div>

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate mr-4">
                          {category.title}
                        </span>
                        <div className="opacity-50 ml-auto">
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </div>
                      </>
                    )}
                  </button>
                </Tooltip>

                {/* Expanded Tools */}
                {!collapsed && isExpanded && (
                  <div className="ml-11 mt-1 space-y-1">
                    {category.tools.map((tool) => (
                      <button
                        key={tool.path}
                        onClick={() => onNavigate(tool.path)}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-1.5 text-xs transition-colors",
                          tool.path === activeToolPath
                            ? "text-orange-600"
                            : "text-text-muted hover:text-text"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate">{tool.name}</span>
                          {tool.status !== "ready" && (
                            <span className="ml-2 text-xs opacity-50">
                              {tool.status === "coming-soon" ? "🔜" : "📋"}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Articles Link */}
        <div className="mt-4 w-full">
          <Tooltip
            content="Articles"
            side="right"
            className={collapsed ? "" : "hidden"}
          >
            <button
              onClick={() => onNavigate("/articles")}
              className={cn(
                "flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 group",
                activeId === "articles"
                  ? "text-orange-600"
                  : "text-text-muted hover:text-text"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                  collapsed && "mr-0",
                  activeId === "articles"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm"
                    : "text-text-muted group-hover:text-text"
                )}
              >
                <BookOpen size={16} />
              </div>
              {!collapsed && <span>Articles</span>}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Footer Section */}
      <div
        className={cn(
          "border-t border-border p-3",
          collapsed
            ? "flex flex-col items-center space-y-2"
            : "flex items-center justify-between"
        )}
      >
        {footer && <div>{footer}</div>}

        <Tooltip
          content={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          side="right"
          className={collapsed ? "" : "hidden"}
        >
          <button
            onClick={onToggleCollapse}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
              "hover:bg-surface-2 text-text-muted hover:text-text"
            )}
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}
