import * as React from "react";
import { cn } from "../../utils/cn";

export interface AppIconProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function AppIcon({ size = 32, className, showText = false }: AppIconProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Beautiful gradient icon with geometric design */}
      <div
        className="relative rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Inner geometric pattern */}
        <div className="absolute inset-1 rounded-lg bg-white/20 backdrop-blur-sm">
          <div className="w-full h-full flex items-center justify-center">
            {/* F-like symbol made of geometric shapes */}
            <div className="relative w-4 h-4 flex flex-col gap-0.5">
              <div className="w-full h-1 bg-white rounded-sm"></div>
              <div className="w-2/3 h-1 bg-white rounded-sm"></div>
              <div className="w-1/2 h-1 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
      </div>

      {showText && (
        <span className="font-bold text-lg text-text">FrontEnzo</span>
      )}
    </div>
  );
}