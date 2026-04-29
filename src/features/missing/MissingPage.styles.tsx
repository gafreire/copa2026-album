import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 90px;
  @media (min-width: 768px) { padding-left: 240px; padding-bottom: 0; }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.background}ee;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    font-family: 'Arial Black', sans-serif;
    font-style: italic;
    font-size: 1.1rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ProgressPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 5px 12px;
`

export const ProgressPillBar = styled.div`
  width: 60px;
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`

export const ProgressPillFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  transition: width 0.6s ease;
`

export const ProgressPillText = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`

export const Content = styled.div`
  padding: 14px;
  max-width: 640px;
  margin: 0 auto;
  @media (min-width: 768px) { padding: 20px 32px; }
`

/* Animação só na seção inteira, não em cada slot */
export const SectionWrapper = styled.div`
  animation: ${fadeUp} 0.3s ease both;
  will-change: opacity, transform;
`

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 8px;
  &:first-child { margin-top: 0; }
`

export const FlagCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.1);
  img { width: 100%; height: 100%; object-fit: cover; }
`

export const SpecialDot = styled.div<{ $color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${({ $color }) => $color}30;
  border: 1px solid ${({ $color }) => $color}50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  flex-shrink: 0;
`

export const DividerName = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`

export const DividerLine = styled.div<{ $color: string }>`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, ${({ $color }) => $color}50, transparent);
`

/* Colunas fixas — sem auto-fill que recalcula constantemente */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (min-width: 400px) { grid-template-columns: repeat(6, 1fr); }
  @media (min-width: 520px) { grid-template-columns: repeat(7, 1fr); }
  @media (min-width: 768px) { grid-template-columns: repeat(8, 1fr); }
`

/* Sem animation — só transition no hover */
export const StickerSlot = styled.button<{ $color1: string; $color2: string; $marked: boolean }>`
  aspect-ratio: 3/4;
  border-radius: 7px;
  border: 1.5px solid ${({ $marked, $color1, theme }) => $marked ? $color1 : theme.colors.border};
  background: ${({ $marked, $color1, $color2, theme }) =>
    $marked
      ? `linear-gradient(135deg, ${$color1}35, ${$color2}20)`
      : theme.colors.surface
  };
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: ${({ $marked }) => $marked ? 0.5 : 1};
  transition: border-color 0.15s, background 0.15s, opacity 0.15s;
  will-change: border-color;

  &:hover {
    border-color: ${({ $color1 }) => $color1};
    opacity: 1;
  }
`

export const StickerCircle = styled.div<{ $color: string; $marked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid ${({ $marked, $color }) => $marked ? $color : 'rgba(255,255,255,0.2)'};
  background: ${({ $marked, $color }) => $marked ? $color + '40' : 'transparent'};
  transition: border-color 0.15s, background 0.15s;
`

export const StickerId = styled.span<{ $marked: boolean }>`
  font-size: 0.48rem;
  font-weight: 700;
  color: ${({ $marked }) => $marked ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)'};
  text-decoration: ${({ $marked }) => $marked ? 'line-through' : 'none'};
  transition: color 0.15s;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  p {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 6px;
  }

  span {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`