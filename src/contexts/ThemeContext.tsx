import { createContext, useContext } from 'react'

type ThemeContextType = {
  themeName: 'yellow' | 'blue'
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useThemeContext() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider')
  return ctx
}