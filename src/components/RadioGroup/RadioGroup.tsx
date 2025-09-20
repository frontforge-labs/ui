import * as React from "react";
import { cn } from "../../utils/cn";

export interface RadioGroupProps {
  name: string;
  options: { value: string; label: string; id?: string }[];
  defaultValue?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  defaultValue,
  className,
  ...aria
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn("flex flex-col gap-2", className)}
      {...aria}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          htmlFor={opt.id ?? opt.value}
          className="flex items-center gap-2 text-sm text-text"
        >
          <input
            id={opt.id ?? opt.value}
            type="radio"
            name={name}
            value={opt.value}
            defaultChecked={defaultValue === opt.value}
            role="radio"
            aria-checked={defaultValue === opt.value}
            className="h-4 w-4 border-border text-accent focus:ring-accent"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
