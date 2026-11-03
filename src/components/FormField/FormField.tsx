import * as React from "react";
import { cn } from "../../utils/cn";

export interface FormFieldBaseProps {
  /** Unique id for the field */
  id: string;
  /** Visible label text */
  label: string;
  /** Optional description (helper text) */
  description?: string;
  /** Optional error message */
  error?: string;
  /** Mark the field as required */
  required?: boolean;
  className?: string;
}

export function FormField<T extends { id?: string } = { id?: string }>({
  id,
  label,
  description,
  error,
  required,
  children,
  className,
}: FormFieldBaseProps & { children: React.ReactElement<T> }) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1 text-sm", className)}>
      {/* Label */}
      <label htmlFor={id} className="font-medium text-text">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>

      {/* Clone child with accessibility props */}
      {React.cloneElement(children, {
        id,
        "aria-describedby":
          [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
        "aria-invalid": !!error || undefined,
        "aria-required": required || undefined,
      } as unknown as Partial<T>)}

      {/* Description */}
      {description && (
        <p id={descriptionId} className="text-xs text-text/70">
          {description}
        </p>
      )}

      {/* Error */}
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
