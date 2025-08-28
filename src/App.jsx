import { Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./layouts/MarketingLayout.jsx";

// Pages
import LandingPage from "./features/landing/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx"; // ✅ your file

export default function App() {
  return (
    <Routes>
      {/* Public/marketing routes WITHOUT sidebar */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPag />} />
      </Route>

      {/* (Optional) other app routes with your sidebar layout can go here */}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

