import styled, { keyframes } from 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      error: string
    }
  }
}

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 100, 200, 0.18) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 30% 80%, rgba(0, 60, 140, 0.15) 0%, transparent 60%),
    #07090f;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='600' height='700' viewBox='0 0 600 700' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='300' cy='600' rx='260' ry='320' fill='%23003080' opacity='0.13'/%3E%3Cellipse cx='160' cy='620' rx='140' ry='280' fill='%23001a5c' opacity='0.18'/%3E%3Cellipse cx='440' cy='640' rx='120' ry='260' fill='%23002060' opacity='0.15'/%3E%3C/svg%3E");
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    pointer-events: none;
  }
`

export const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  animation: ${fadeIn} 0.6s ease both;

  span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.45);
  }

  span.center {
    font-size: 22px;
    color: #ffffff;
  }
`

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.7s ease 0.05s both;

  h1 {
    font-family: 'Arial Black', 'Impact', sans-serif;
    font-size: 2.6rem;
    font-weight: 900;
    font-style: italic;
    letter-spacing: -1px;
    color: #ffffff;
    line-height: 1;
    margin-bottom: 4px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }

  p {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 3px;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
  }
`

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px 28px;
  animation: ${fadeIn} 0.7s ease 0.1s both;
`

export const CardTitle = styled.div`
  margin-bottom: 28px;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  div {
    height: 3px;
    width: 48px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`

export const FieldGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
`

export const InputWrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 14px 48px 14px 18px;
    font-size: 0.95rem;
    color: #ffffff;
    outline: none;
    transition: border-color 0.2s, background 0.2s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.25);
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background: rgba(255, 255, 255, 0.1);
    }
  }

  button.toggle-password {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.4);
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover { color: rgba(255,255,255,0.7); }
  }
`

export const ErrorMessage = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 16px;
  text-align: center;
`

export const LoginButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0a0a0a;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.15s, opacity 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 24px ${({ theme }) => theme.colors.primary}44;
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 32px ${({ theme }) => theme.colors.primary}66;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`

export const SignUpRow = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.45);

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin-left: 4px;
    transition: opacity 0.2s;

    &:hover { opacity: 0.8; }
  }
`