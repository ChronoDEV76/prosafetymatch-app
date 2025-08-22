import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-slate-600">© {new Date().getFullYear()} ProSafetyMatch</p>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="text-slate-600 hover:text-brand">Privacy</a>
          <a href="#" className="text-slate-600 hover:text-brand">Voorwaarden</a>
          <a href="#" className="text-slate-600 hover:text-brand">Contact</a>
        </nav>
      </div>
    </footer>
  );
}


