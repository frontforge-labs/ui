import * as React from "react";
import { cn } from "../../utils/cn";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  rightContent?: React.ReactNode;
  className?: string;
}

export function Navbar({
  brand,
  items,
  activeId,
  onSelect,
  rightContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn("w-full border-b border-border bg-bg text-text", className)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center space-x-2">{brand}</div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-4">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  onSelect?.(item.id);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-border"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right content */}
        {rightContent && <div className="hidden md:flex">{rightContent}</div>}

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden px-2 py-1 rounded hover:bg-border"
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 pb-4">
          <ul className="space-y-2 pt-2">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      item.onClick?.();
                      onSelect?.(item.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-border"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          {rightContent && <div className="mt-3">{rightContent}</div>}
        </div>
      )}
    </nav>
  );
}
