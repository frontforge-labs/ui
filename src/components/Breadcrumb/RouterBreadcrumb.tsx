import * as React from "react";
import { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps } from "./Breadcrumb";

export interface RouterBreadcrumbProps extends Omit<BreadcrumbProps, 'items' | 'renderItem'> {
  items?: BreadcrumbItem[];
  generateItems?: () => BreadcrumbItem[];
  LinkComponent?: React.ComponentType<{ to: string; children: React.ReactNode; className?: string }>;
}

export function RouterBreadcrumb({
  items,
  generateItems,
  LinkComponent,
  ...props
}: RouterBreadcrumbProps) {
  const breadcrumbItems = items || (generateItems ? generateItems() : []);

  const renderItem = LinkComponent ? (item: BreadcrumbItem, index: number, isLast: boolean) => {
    if (item.href && !isLast) {
      return (
        <LinkComponent
          to={item.href}
          className="hover:text-[var(--fe-accent)] transition-colors"
        >
          {item.label}
        </LinkComponent>
      );
    } else {
      return (
        <span className={isLast ? "text-orange-500 underline font-medium" : ""}>
          {item.label}
        </span>
      );
    }
  } : undefined;

  return (
    <Breadcrumb
      items={breadcrumbItems}
      renderItem={renderItem}
      {...props}
    />
  );
}