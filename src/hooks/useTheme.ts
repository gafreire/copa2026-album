import { useState } from 'react'
import { yellowTheme, blueTheme } from '../styles/theme'
import type { AppTheme } from '../styles/theme'

type ThemeName = 'yellow' | 'blue'

const themes: Record<ThemeName, AppTheme> = {
  yellow: yellowTheme,
  blue: blueTheme,
}

function getSavedTheme(): ThemeName {
  const saved = localStorage.getItem('copa-theme')
  return saved === 'blue' ? 'blue' : 'yellow' // yellow como padrão
}

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>(getSavedTheme)

  const toggleTheme = () => {
    const next: ThemeName = themeName === 'yellow' ? 'blue' : 'yellow'
    setThemeName(next)
    localStorage.setItem('copa-theme', next)
  }

  return { theme: themes[themeName], themeName, toggleTheme }
}