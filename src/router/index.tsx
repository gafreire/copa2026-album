import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthGuard } from '../features/auth/AuthGuard'
import { LoginPage } from '../features/auth/LoginPage'
import { AlbumPage } from '../features/album/AlbumPage'
import { ResultsPage } from '../features/results/ResultsPage'
import { RegisterPage } from '../features/auth/RegisterPage'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/album" replace />} />
      </Routes>
    </BrowserRouter>
  )
}