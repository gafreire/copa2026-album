import styled, { keyframes } from 'styled-components'

export const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.97); }
`

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 90px;
  @media (min-width: 768px) { padding-left: 240px; padding-bottom: 0; }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 32px 24px;
  gap: 24px;
  animation: ${fadeUp} 0.5s ease both;
`

export const Ball = styled.div`
  font-size: 3.5rem;
  animation: ${pulse} 2.4s ease-in-out infinite;
`

export const Title = styled.h2`
  font-family: 'Arial Black', sans-serif;
  font-style: italic;
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  line-height: 1.1;
`

export const Sub = styled.p`
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  max-width: 280px;
  line-height: 1.6;
`

export const ComingSoonBadge = styled.div`
  background: ${({ theme }) => theme.colors.primary}20;
  border: 1px solid ${({ theme }) => theme.colors.primary}50;
  border-radius: 999px;
  padding: 6px 18px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`