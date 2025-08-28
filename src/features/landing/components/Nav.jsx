import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Nav() {
  const { user, loading } = useAuth();

  if (loading) return <nav className="p-4">Laden…</nav>;

  return (
    <nav className="flex gap-6 p-4 bg-gray-100 shadow">
      <Link to="/" className="text-indigo-600 hover:underline">Home</Link>

      {user ? (
        <>
          <Link to="/dashboard" className="text-indigo-600 hover:underline">
            Dashboard
          </Link>
          <Link to="/logout" className="text-indigo-600 hover:underline">
            Uitloggen
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Aanmelden
          </Link>
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inloggen
          </Link>
        </>
      )}
    </nav>
  );
}

