import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import MarketingLayout from "./layouts/MarketingLayout.jsx";
import LandingPage from "./features/landing/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx"; // Fixed variable name
import Dashboard from "./features/dashboard/Dashboard.jsx";
import SignupPage from './pages/SignupPage.jsx';
import ProtectedRoute from "./features/landing/components/ProtectedRoute.jsx"; // Import the ProtectedRoute wrapper

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route index element={<LandingPage />} />  {/* "/" */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Wrap Dashboard route with ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

