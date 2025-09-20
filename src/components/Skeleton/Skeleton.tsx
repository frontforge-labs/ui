import * as React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show the skeleton or the actual children */
  loading?: boolean;
  /** Extra class applied only when loading (on the skeleton surface) */
  skeletonClassName?: string;
  children?: React.ReactNode;
}

/**
 * Wrapper-style Skeleton:
 * - When `loading` => renders a shimmer block (size from `className`)
 * - When not loading => renders `children`
 *
 * Tip: pass sizing classes (h-*, w-*) in `className`.
 */
export function Skeleton({
  loading = true,
  children,
  className,
  skeletonClassName,
  ...props
}: SkeletonProps) {
  if (!loading) {
    return (
      <div className={cn(className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("fe-skeleton", "h-4 w-full", className, skeletonClassName)}
      {...props}
    />
  );
}
