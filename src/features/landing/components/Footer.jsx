import React from 'react';

// src/features/landing/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-14 border-t border-black/10">
      <div className="container-page py-8 text-sm text-black/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ProSafetyMatch</p>
        <nav className="flex gap-5">
          <a className="hover:text-black/80" href="#aanbod">Aanbod</a>
          <a className="hover:text-black/80" href="#how">Hoe werkt het</a>
          <a className="hover:text-black/80" href="/privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}

