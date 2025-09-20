import * as React from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "flex min-h-[80px] w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text shadow-sm",
          "placeholder:text-text/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
