import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900">
      <img
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1502303756787-90e6c1a8eec2?q=80&w=2070&auto=format&fit=crop"
        alt=""
      />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 text-center text-white">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          ProSafetyMatch
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
          wij matchen expertise aan jouw opdracht volledig onafhankelijk & DBA-proof
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#aanbod"
            className="rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow hover:bg-brand-dark transition"
          >
            Bekijk het aanbod
          </a>
          <a
            href="#hoe-werkt-het"
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/20 transition"
          >
            Hoe werkt het?
          </a>
        </div>
      </div>
    </section>
  );
}

