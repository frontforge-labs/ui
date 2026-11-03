/* eslint-disable @typescript-eslint/no-explicit-any -- Preserve the public generic trigger API until the UI-07 overlay rewrite. */
import * as React from "react";
import { cn } from "../../utils/cn";

export interface PopoverBaseProps {
  /** Content shown inside the popover */
  content: React.ReactNode;
  /** Side of the trigger where the popover will appear */
  side?: "top" | "bottom" | "left" | "right";
  /** Whether clicking outside should close the popover */
  closeOnOutsideClick?: boolean;
  className?: string;
}

export function Popover<
  T extends { id?: string; onClick?: (e: React.MouseEvent) => void } = any,
>({
  content,
  side = "bottom",
  closeOnOutsideClick = true,
  children,
  className,
}: PopoverBaseProps & { children: React.ReactElement<T> }) {
  const [open, setOpen] = React.useState(false);
  const popoverId = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeOnOutsideClick]);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>
      {React.cloneElement(children, {
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": popoverId,
        onClick: (e: any) => {
          children.props.onClick?.(e);
          setOpen((prev) => !prev);
        },
      } as unknown as Partial<T>)}

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          className={cn(
            "absolute z-50 min-w-[10rem] rounded border border-border bg-bg text-text shadow-lg p-2",
            side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
            side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
