import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      navigate('/album')
    }
    setLoading(false)
  }

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit} disabled={loading}>
        {isSignUp ? 'Criar conta' : 'Entrar'}
      </button>
      <button onClick={() => setIsSignUp(v => !v)}>
        {isSignUp ? 'Já tenho conta' : 'Criar conta'}
      </button>
    </div>
  )
}