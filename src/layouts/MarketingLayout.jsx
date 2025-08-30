import { Outlet } from "react-router-dom";
import Header from "../features/landing/components/Header.jsx";

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

