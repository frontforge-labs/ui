import * as React from "react";
import { cn } from "../../utils/cn";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Form title, announced by screen readers */
  title?: string;
  /** General description of the form */
  description?: string;
  /** Global error message (e.g., validation failed) */
  errorSummary?: string;
  /** Children should include FormField-wrapped inputs */
  children: React.ReactNode;
}

export function Form({
  title,
  description,
  errorSummary,
  children,
  className,
  ...props
}: FormProps) {
  const errorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (errorSummary && errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorSummary]);

  return (
    <form
      noValidate
      className={cn("space-y-6", className)}
      aria-labelledby={title ? "form-title" : undefined}
      {...props}
    >
      {title && (
        <h2 id="form-title" className="text-lg font-semibold text-text">
          {title}
        </h2>
      )}

      {description && <p className="text-sm text-text/70">{description}</p>}

      {errorSummary && (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="rounded border border-red-600 bg-red-50 p-3 text-sm text-red-700"
          aria-live="assertive"
        >
          {errorSummary}
        </div>
      )}

      <div className="space-y-4">{children}</div>
    </form>
  );
}
