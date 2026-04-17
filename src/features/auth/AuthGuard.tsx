import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function AuthGuard() {
  const { session, loading } = useAuth()

  if (loading) return null // ou um spinner depois

  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}