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
  padding: 24px 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) { padding: 32px; }
`

export const AvatarBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: ${fadeUp} 0.4s ease both;
`

export const BigAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 1.6rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UserName = styled.h2`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const UserEmail = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const SectionLabel = styled.p`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 4px;
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  animation: ${fadeUp} 0.4s ease 0.05s both;
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
`

export const StatLabel = styled.span`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

export const Divider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border};
  align-self: stretch;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Input = styled.input`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SaveButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: opacity 0.2s, transform 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`

export const SignOutButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  }
`

export const FeedbackMsg = styled.p<{ $ok: boolean }>`
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  color: ${({ $ok, theme }) => $ok ? theme.colors.success : theme.colors.error};
`
