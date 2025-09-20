import * as React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        className={cn(
          "flex h-10 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text shadow-sm",
          "placeholder:text-text/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
