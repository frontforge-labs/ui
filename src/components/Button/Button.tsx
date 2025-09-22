import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none appearance-none",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm",
        secondary:
          "bg-bg text-text border border-border hover:bg-surface-1 hover:border-accent/20 shadow-sm",
        outline:
          "border border-border bg-transparent hover:bg-surface-1 hover:border-accent/20",
        ghost:
          "bg-transparent hover:bg-surface-2 text-text-muted hover:text-text",
        success:
          "bg-success text-success-foreground hover:bg-success-hover shadow-sm",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning-hover shadow-sm",
        error: "bg-error text-error-foreground hover:bg-error-hover shadow-sm",
        info: "bg-info text-info-foreground hover:bg-info-hover shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
