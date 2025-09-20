import * as React from "react";
import { cn } from "../../utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <select
        ref={ref}
        id={id}
        className={cn(
          "flex h-10 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";
