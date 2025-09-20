// Design system tokens
export const tokens = {
  colors: {
    // Brand
    brand: {
      primary: '#ff7a1a',
      primaryHover: '#e66600',
      primaryForeground: '#ffffff',
    },

    // Semantic
    success: {
      DEFAULT: '#10b981',
      hover: '#059669',
      foreground: '#ffffff',
      muted: '#d1fae5',
    },
    warning: {
      DEFAULT: '#f59e0b',
      hover: '#d97706',
      foreground: '#ffffff',
      muted: '#fef3c7',
    },
    error: {
      DEFAULT: '#ef4444',
      hover: '#dc2626',
      foreground: '#ffffff',
      muted: '#fee2e2',
    },
    info: {
      DEFAULT: '#3b82f6',
      hover: '#2563eb',
      foreground: '#ffffff',
      muted: '#dbeafe',
    },
  },

  // Surface levels for depth
  surfaces: {
    background: 'var(--fe-bg)',
    surface1: 'var(--fe-surface-1)', // Cards, modals
    surface2: 'var(--fe-surface-2)', // Elevated elements
    surface3: 'var(--fe-surface-3)', // Highest elevation
  },

  // Shadows for consistent elevation
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Typography scale
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Border radius
  radius: {
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
} as const;

export type Tokens = typeof tokens;