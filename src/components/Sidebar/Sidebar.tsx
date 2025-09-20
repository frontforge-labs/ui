import * as React from "react";
import { cn } from "../../utils/cn";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeId?: string;
  collapsed?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export function Sidebar({
  items,
  activeId,
  collapsed = false,
  onSelect,
  className,
}: SidebarProps) {
  return (
    <nav
      aria-label="Sidebar"
      className={cn(
        "h-screen w-64 border-r border-border bg-surface-1 text-text flex flex-col shadow-sm",
        collapsed && "w-16",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    item.onClick?.();
                    onSelect?.(item.id);
                  }}
                  className={cn(
                    "flex w-full items-center rounded px-2 py-2 text-sm focus:outline-none transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "hover:bg-surface-2 text-text-muted hover:text-text"
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "mr-2",
                        collapsed && "mr-0 flex justify-center w-full"
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
