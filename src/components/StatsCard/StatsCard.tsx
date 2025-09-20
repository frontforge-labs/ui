import * as React from "react";
import { Card, CardBody } from "../Card";
import { cn } from "../../utils/cn";

export interface StatsCardProps {
  title: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
  titleClassName?: string;
}

export function StatsCard({
  title,
  value,
  className,
  valueClassName,
  titleClassName,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardBody className="p-4">
        <div className={cn("text-2xl font-bold", valueClassName)}>
          {value}
        </div>
        <div className={cn("text-sm text-muted", titleClassName)}>
          {title}
        </div>
      </CardBody>
    </Card>
  );
}