import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Niet ingelogd');
        return res.json();
      })
      .then((data) => setUser(data?.user ?? null))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    } catch {
      alert('Uitloggen mislukt, probeer opnieuw.');
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '48px auto', padding: 24 }}>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p>Bezig met laden…</p>}
      {error && <p className="text-red-600">Fout: {error}</p>}
      {user && <p>Ingelogd als <b>{user.email}</b></p>}
      <button 
        onClick={logout} 
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Uitloggen
      </button>
    </main>
  );
}

