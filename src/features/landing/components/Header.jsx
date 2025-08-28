// ./src/components/Header.jsx
// React 17+ style: geen expliciete import React nodig
import { useEffect, useRef } from "react";
import logo from "../assets/logo.png";

export default function Header() {
  const headerRef = useRef(null);

  // Shrink-on-scroll (zet data-attribuut voor shadow/transition)
  useEffect(() => {
    const el = headerRef.current;
    const onScroll = () => {
      if (!el) return;
      el.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="
        sticky top-0 z-40
        bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-md
        border-b border-black/5 transition-shadow
        data-[scrolled=true]:shadow-md
      "
      aria-label="Hoofdnavigatie"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + merknaam */}
        <a href="#home" className="flex items-center gap-3" aria-label="Ga naar home">
          <img
            src={logo}
            alt="ProSafetyMatch"
            className="h-12 w-auto rounded-lg shadow-sm"
            loading="eager"
          />
          <span className="font-semibold tracking-tight">
            ProSafetyMatch <span className="text-xs text-slate-500">(Dev)</span>
          </span>
        </a>

        {/* Nav rechts */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="Primaire navigatie">
          <a href="#aanbod" className="text-sm text-slate-700 hover:text-slate-900">
            Aanbod
          </a>
          <a href="#how" className="text-sm text-slate-700 hover:text-slate-900">
            Hoe werkt het
          </a>
          <a href="#login" className="text-sm text-slate-700 hover:text-slate-900">
            Inloggen
          </a>
          <a
            href="#signup"
            className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Aanmelden
          </a>
        </nav>
      </div>
    </header>
  );
}

