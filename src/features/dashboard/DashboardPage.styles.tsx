import styled, { keyframes } from 'styled-components'

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 90px;
  @media (min-width: 768px) { padding-left: 240px; padding-bottom: 0; }
`

export const Content = styled.div`
  padding: 20px;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (min-width: 768px) { padding: 28px 32px; }
`

export const MainCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 24px;
  animation: ${fadeUp} 0.4s ease both;
  text-align: center;
`

export const MissingNumber = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: 4px;
`

export const MissingLabel = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 20px;
`

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 8px;
`

export const ProgressBarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  transition: width 0.8s ease;
`

export const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ProgressMetaText = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const SectionTitle = styled.p`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
  padding: 0 2px;
`

export const StatCard = styled.div<{ $color1: string; $color2: string; $delay?: number }>`
  background: linear-gradient(
    135deg,
    ${({ $color1 }) => $color1}50 0%,
    ${({ $color2 }) => $color2}30 50%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border: 1px solid ${({ $color1 }) => $color1}60;
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $delay }) => $delay ?? 0}s;
  transition: transform 0.15s, border-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ $color1 }) => $color1}99;
  }
`

export const FlagCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255,255,255,0.15);
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
`

export const SpecialIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ $color }) => $color}22;
  border: 2px solid ${({ $color }) => $color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const StatName = styled.p`
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StatSub = styled.p`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
`

export const StatBadge = styled.div<{ $color: string }>`
  flex-shrink: 0;
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}55;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
`

export const CompleteBadge = styled.div`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primaryForeground};
  white-space: nowrap;
`