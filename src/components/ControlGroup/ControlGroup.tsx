import { cn } from "../../utils/cn";

export interface ControlGroupProps {
  label?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function ControlGroup({
  label,
  description,
  children,
  className,
  orientation = "vertical",
}: ControlGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <label className="block text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          orientation === "horizontal"
            ? "flex items-center gap-3 flex-wrap"
            : "space-y-3"
        )}
      >
        {children}
      </div>
    </div>
  );
}
