import { Outlet } from "react-router-dom";
import Header from "../features/landing/components/Header.jsx";
import Footer from "../features/landing/components/Footer.jsx";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet /> {/* Renders nested routes (LoginPage, LandingPage, Dashboard etc.) */}
      </main>
      <Footer />
    </div>
  );
}

