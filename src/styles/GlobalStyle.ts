import { createGlobalStyle } from 'styled-components'
import type { AppTheme } from './theme'

export const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background 0.3s ease, color 0.3s ease;
  }

  a { color: inherit; text-decoration: none; }
`