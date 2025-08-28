import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./features/landing/components/Header.jsx"; // Pas dit pad aan als Header elders staat
import LandingPage from "./features/landing/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";   // of het juiste pad
const SignupPage = () => <div className="p-8">Aanmelden</div>; // placeholder

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

