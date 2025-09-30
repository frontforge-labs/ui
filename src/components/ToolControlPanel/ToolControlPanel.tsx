import { useState } from "react";
import { cn } from "../../utils/cn";

export interface ToolControlPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  gridCols?: "auto" | 1 | 2 | 3;
}

export function ToolControlPanel({
  title = "Controls",
  children,
  className,
  gridCols = "auto",
}: ToolControlPanelProps) {
  const getGridClass = () => {
    switch (gridCols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "space-y-6";
    }
  };

  return (
    <div
      className={cn(
        "bg-surface-1 rounded-lg border border-border p-6 shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className={cn(gridCols !== "auto" && "grid gap-6", getGridClass())}>
        {children}
      </div>
    </div>
  );
}
