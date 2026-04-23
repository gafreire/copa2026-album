import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'yellow' | 'blue'
    colors: {
      background: string
      surface: string
      surfaceHover: string
      border: string
      primary: string
      primaryHover: string
      primaryForeground: string
      textPrimary: string
      textSecondary: string
      textMuted: string
      success: string
      warning: string
      error: string
    }
    radii: {
      sm: string
      md: string
      lg: string
      full: string
    }
    fontSizes: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }
  }
}