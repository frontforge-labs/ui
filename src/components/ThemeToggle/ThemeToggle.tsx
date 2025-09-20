import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../theme';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  variant?: 'button' | 'icon' | 'colorful';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const themeColors = {
  light: 'from-yellow-400 to-orange-500',
  dark: 'from-blue-600 to-purple-700',
  system: 'from-green-500 to-cyan-600',
};

const themeHoverColors = {
  light: 'hover:from-yellow-500 hover:to-orange-600',
  dark: 'hover:from-blue-700 hover:to-purple-800',
  system: 'hover:from-green-600 hover:to-cyan-700',
};

export function ThemeToggle({
  variant = 'colorful',
  size = 'md',
  className
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const Icon = themeIcons[theme];

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  if (variant === 'colorful') {
    return (
      <button
        onClick={cycleTheme}
        className={cn(
          "relative rounded-lg bg-gradient-to-br transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group",
          sizeClasses[size],
          themeColors[theme],
          themeHoverColors[theme],
          className
        )}
        title={`Current: ${themeLabels[theme]}. Click to switch to ${themeLabels[theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light']}`}
      >
        <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-full h-full flex items-center justify-center text-white drop-shadow-sm">
          <Icon size={iconSizes[size]} />
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Pulse effect for theme changes */}
        <div className="absolute inset-0 rounded-lg bg-white/40 animate-ping opacity-0 group-active:opacity-100" />
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={cycleTheme}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-surface-1 hover:bg-surface-2 transition-colors",
          className
        )}
        title={`Switch to ${themeLabels[theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light']} theme`}
      >
        <Icon size={16} />
        <span className="text-sm font-medium">{themeLabels[theme]}</span>
      </button>
    );
  }

  // Default icon variant
  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "p-2 rounded-md border border-border bg-surface-1 hover:bg-surface-2 transition-colors",
        sizeClasses[size],
        className
      )}
      title={`Switch to ${themeLabels[theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light']} theme`}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
}