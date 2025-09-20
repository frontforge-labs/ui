import * as React from "react";
import { cn } from "../../utils/cn";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
}

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
}: DrawerProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        className={cn(
          "relative z-10 flex h-full w-80 flex-col bg-bg text-text shadow-xl transition-transform duration-300",
          side === "right" ? "ml-auto translate-x-0" : "mr-auto translate-x-0",
          side === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
        )}
      >
        {title && (
          <div
            id="drawer-title"
            className="px-4 py-2 border-b border-border font-medium"
          >
            {title}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <div className="border-t border-border px-4 py-2 text-right">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-accent text-accent-foreground"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
