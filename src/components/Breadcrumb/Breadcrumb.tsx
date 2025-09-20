import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode;
}

export function Breadcrumb({
  items,
  className,
  separator = <ChevronRight size={12} className="text-[var(--fe-text)]/40" />,
  renderItem,
}: BreadcrumbProps) {
  const defaultRenderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    if (item.href && !isLast) {
      return (
        <a
          href={item.href}
          className="hover:text-[var(--fe-accent)] transition-colors"
        >
          {item.label}
        </a>
      );
    } else {
      return (
        <span className={isLast ? "text-orange-500 underline font-medium" : ""}>
          {item.label}
        </span>
      );
    }
  };

  return (
    <nav className={cn("flex items-center gap-2 text-xs", className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && separator}
            {renderItem ? renderItem(item, index, isLast) : defaultRenderItem(item, index, isLast)}
          </div>
        );
      })}
    </nav>
  );
}