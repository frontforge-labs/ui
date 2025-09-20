import * as React from "react";
import { cn } from "../../utils/cn";

type ToastType = "default" | "success" | "error";
type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: ToastType;
  /** If true, render inline (not fixed). Great for Storybook demos. */
  inline?: boolean;
  /** When inline=false, choose where it’s fixed. */
  position?: ToastPosition;
}

const typeClasses: Record<ToastType, string> = {
  default: "bg-accent text-accent-foreground",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};

const posClasses: Record<ToastPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

export function Toast({
  message,
  type = "default",
  inline = false,
  position = "bottom-right",
  className,
  ...rest
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "px-4 py-2 rounded shadow-md",
        inline ? "" : cn("fixed", posClasses[position]),
        typeClasses[type],
        className
      )}
      {...rest}
    >
      {message}
    </div>
  );
}
