import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-50 p-4 border-r">
          <p className="text-gray-600">Sidebar met extra navigatie</p>
        </aside>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} ProSafetyMatch
      </footer>
    </div>
  );
}


