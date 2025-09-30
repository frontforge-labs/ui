import { cn } from "../../utils/cn";

export interface FullWidthGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FullWidthGroup({ children, className }: FullWidthGroupProps) {
  return <div className={cn("col-span-full", className)}>{children}</div>;
}
