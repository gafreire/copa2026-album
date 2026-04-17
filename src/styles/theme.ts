const base = {
  radii: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
}

export const yellowTheme = {
  ...base,
  name: 'yellow' as const,
  colors: {
    // Fundos — verde escuro da camisa canarinho
    background: '#0d1f0f',
    surface: '#132916',
    surfaceHover: '#1a3a1e',
    border: '#254d2a',

    // Primária — amarelo da camisa
    primary: '#f5c800',
    primaryHover: '#ffd700',
    primaryForeground: '#0d1f0f',

    // Textos
    textPrimary: '#f5f0d0',
    textSecondary: '#8aac8d',
    textMuted: '#4d6e51',

    // Feedback
    success: '#4ade80',
    warning: '#f5c800',
    error: '#f87171',
  },
}

export const blueTheme = {
  ...base,
  name: 'blue' as const,
  colors: {
    // Fundos — azul escuro da camisa azul
    background: '#020b18',
    surface: '#051628',
    surfaceHover: '#0a2240',
    border: '#0f3460',

    // Primária — azul vibrante da camisa
    primary: '#009cde',
    primaryHover: '#00b4ff',
    primaryForeground: '#020b18',

    // Textos
    textPrimary: '#e0f0ff',
    textSecondary: '#5a8fb0',
    textMuted: '#2a5070',

    // Feedback
    success: '#4ade80',
    warning: '#f5c800',
    error: '#f87171',
  },
}

export type AppTheme = typeof yellowTheme | typeof blueTheme