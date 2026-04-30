import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "../features/auth/AuthGuard";
import { LoginPage } from "../features/auth/LoginPage";
import { AlbumPage } from "../features/album/AlbumPage";
import { ResultsPage } from "../features/results/ResultsPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { CountryDetailPage } from "../features/album/CountryDetailPage";
import { MissingPage } from "../features/missing/MissingPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { ProfilePage } from "../features/profile/ProfilePage";
import { AuthCallbackPage } from "../features/auth/AuthCallbackPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/missing" element={<MissingPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/album/:code" element={<CountryDetailPage />} />
          <Route path="/missing" element={<MissingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/album" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
