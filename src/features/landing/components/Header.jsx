import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // ✅ your path

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ProSafetyMatch" className="h-8 w-8" />
          <span className="font-bold text-indigo-700">
            ProSafetyMatch <span className="text-gray-400 text-sm">(Dev)</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#aanbod" className="text-slate-700 hover:text-indigo-600">Aanbod</a>
          <a href="#how" className="text-slate-700 hover:text-indigo-600">Hoe werkt het</a>
          <Link to="/login" className="text-slate-700 hover:text-indigo-600">Inloggen</Link>
          <Link
            to="/signup"
            className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
          >
            Aanmaken
          </Link>
        </nav>
      </div>
    </header>
  );
}

