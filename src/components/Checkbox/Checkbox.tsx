import * as React from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="checkbox"
        aria-checked={props.checked ?? props.defaultChecked}
        className={cn(
          "h-4 w-4 rounded border border-border bg-bg text-accent focus:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
