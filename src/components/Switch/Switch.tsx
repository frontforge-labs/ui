import * as React from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="sr-only"
          {...props}
          checked={props.checked !== undefined ? props.checked : checked}
          onChange={handleChange}
        />
        <div
          className={cn(
            "relative w-11 h-6 rounded-full border border-border transition-colors duration-200 focus:outline-none",
            checked || props.checked ? "bg-accent" : "bg-border",
            className
          )}
        >
          <div
            className={cn(
              "absolute top-[1px] left-[1px] h-5 w-5 rounded-full bg-bg shadow-lg transition-transform duration-200 ease-in-out",
              checked || props.checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";
