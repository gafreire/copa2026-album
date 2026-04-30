import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import soccerBall from '../../assets/soccer-ball.svg'
import { useAuth } from '../../hooks/useAuth'
import {
  Card,
  CardTitle,
  ErrorMessage,
  FieldGroup,
  InputWrapper,
  LoginButton,
  Logo,
  Page,
  SignUpRow,
  Stars,
} from './LoginPage.styles'

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await signUp(email, password, { data: { full_name: name } })

    if (error) {
      setError(error.message)
    } else {
      navigate('/album')
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <Page>
      <Stars>
        <span>★</span>
        <span>★</span>
        <span className="center">★</span>
        <span>★</span>
        <span>★</span>
      </Stars>

      <Logo>
        <h1>MyAlbum</h1>
      </Logo>

      <Card>
        <CardTitle>
          <h2>Cadastro</h2>
          <div />
        </CardTitle>

        <FieldGroup>
          <label>Nome</label>
          <InputWrapper>
            <input
              type="text"
              placeholder="Neymar Jr."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputWrapper>
        </FieldGroup>

        <FieldGroup>
          <label>Email</label>
          <InputWrapper>
            <input
              type="email"
              placeholder="ney.junior@selecao.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputWrapper>
        </FieldGroup>

        <FieldGroup>
          <label>Senha</label>
          <InputWrapper>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="toggle-password"
              onClick={() => setShowPassword(v => !v)}
              type="button"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </InputWrapper>
        </FieldGroup>

        <FieldGroup>
          <label>Confirmar senha</label>
          <InputWrapper>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="toggle-password"
              onClick={() => setShowConfirm(v => !v)}
              type="button"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </InputWrapper>
        </FieldGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton onClick={handleSubmit} disabled={loading} $loading={loading}>
          {loading ? 'Loading...' : 'Create Account'}
          {!loading && (
            <img
              src={soccerBall}
              alt="soccer ball"
              style={{ display: 'flex', width: '30px' }}
            />
          )}
        </LoginButton>

        <SignUpRow>
          Já tem uma conta
          <button onClick={() => navigate('/login')}>Entrar </button>
        </SignUpRow>
      </Card>
    </Page>
  )
}