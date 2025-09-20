import * as React from "react";
import { cn } from "../../utils/cn";

export interface TooltipBaseProps {
  /** Content inside the tooltip */
  content: React.ReactNode;
  /** Position of tooltip relative to trigger */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay before showing (ms) */
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  side = "top",
  delay = 150,
  children,
  className,
}: TooltipBaseProps & { children: React.ReactElement }) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const tooltipId = React.useId();

  const show = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setOpen(true);
    }, delay);
  }, [delay]);

  const hide = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(false);
  }, []);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hide]);

  const childProps = {
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (children.props as any).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (children.props as any).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (children.props as any).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (children.props as any).onBlur?.(e);
    },
  };

  const getTooltipStyle = () => {
    switch (side) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "8px",
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px",
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "8px",
        };
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
    }
  };

  const getArrowStyle = () => {
    switch (side) {
      case "top":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
        };
      case "bottom":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(50%) rotate(45deg)",
        };
      case "left":
        return {
          left: "100%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
        };
      case "right":
        return {
          right: "100%",
          top: "50%",
          transform: "translateX(50%) translateY(-50%) rotate(45deg)",
        };
      default:
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
        };
    }
  };

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, childProps)}

      {open && (
        <div
          role="tooltip"
          id={tooltipId}
          className="absolute z-50 px-2 py-1 text-xs rounded shadow-lg pointer-events-none border"
          style={{
            backgroundColor: "white",
            color: "black",
            whiteSpace: "nowrap",
            ...getTooltipStyle(),
          }}
        >
          {content}

          {/* Arrow */}
          <div
            className="absolute w-2 h-2 border"
            style={{
              backgroundColor: "white",
              ...getArrowStyle(),
            }}
          />
        </div>
      )}
    </div>
  );
}
