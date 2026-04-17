import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeContext } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'
import { Router } from './router'

export default function App() {
  const { theme, themeName, toggleTheme } = useTheme()

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Router />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}