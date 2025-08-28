// src/LandingPage.jsx
import { useMemo, useState } from "react";
import PrimaryButton from "./components/PrimaryButton.jsx";
import FilterBar from "./components/FilterBar.jsx";
import heroBg from "./assets/hero.webp";

// --- Mock data ---
const PROFILES = [
  { id: 1, name: "Jan Brandwacht", city: "Amsterdam", rate: "€38/u", tags: "Industrieel, VCA" },
  { id: 2, name: "Petra Veilig",   city: "Rotterdam",  rate: "€40/u", tags: "Evenementen, EHBO" },
  { id: 3, name: "Omar Preventie", city: "Utrecht",    rate: "€35/u", tags: "Manschap A, BHV" },
];

// Parse "€38/u" -> 38 safely
const parseRate = (r) => {
  const n = Number(String(r).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function ProfileCard({ p }) {
  const initials = useMemo(
    () => p.name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(),
    [p.name]
  );

  return (
    <a
      href="#"
      className="block rounded-3xl bg-white/90 backdrop-blur-md border border-white/30 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
      aria-label={`Bekijk profiel van ${p.name}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center font-bold text-lg">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-slate-600 text-sm">{p.city}</p>
          </div>
        </div>
        <p className="mt-4 font-medium text-indigo-700">{p.rate}</p>
        <p className="text-slate-700 text-sm">{p.tags}</p>
      </div>
    </a>
  );
}

export default function LandingPage() {
  const [filters, setFilters] = useState({ type: "", region: "", rate: "" });

  const filteredProfiles = useMemo(() => {
    const min = parseRate(filters.rate);
    const hasMin = !!filters.rate;

    return PROFILES.filter((p) => {
      const matchType   = !filters.type   || p.tags.toLowerCase().includes(filters.type.toLowerCase());
      const matchRegion = !filters.region || p.city.toLowerCase().includes(filters.region.toLowerCase());
      const matchRate   = !hasMin || parseRate(p.rate) >= min;
      return matchType && matchRegion && matchRate;
    });
  }, [filters]);

  return (
    <div id="home" className="min-h-screen w-full">
      {/* HERO */}
      <section
        className="relative isolate flex flex-col items-center justify-center min-h-[70vh] md:min-h-[76vh]"
        aria-label="Introductie"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 10%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header-color bridge (makes hero top match a semi-white header) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm" />

        {/* Cinematic/fade overlays for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_20%,rgba(2,6,23,0),rgba(2,6,23,0.7))]" />
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />

        {/* Content */}
        <div className="relative max-w-7xl w-full px-6 py-16 text-center text-white z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-tight ring-1 ring-white/25">
            🔒 DBA-proof & onafhankelijk
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl mx-auto tracking-wide">
            Wij matchen expertise aan jouw <br className="hidden sm:block" />
            opdracht
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-indigo-200 text-lg leading-relaxed">
            Binnen 24 uur voorstellen · Transparant tarief · Landelijke dekking
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <PrimaryButton href="/signup?role=client" variant="primary" className="px-8 py-4 text-lg">
              Ik zoek een expert
            </PrimaryButton>
            <PrimaryButton href="/signup?role=pro" variant="ghost" className="px-8 py-4 text-lg">
              Ik ben professional
            </PrimaryButton>
          </div>

          <p className="mt-6 text-xs text-indigo-300 tracking-wide">
            💳 Gratis aanmelden · Geen verborgen kosten
          </p>
        </div>
      </section>

      {/* FilterBar (below hero) */}
      <div className="px-6 -mt-10 sm:-mt-12 relative z-20">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Recent profiles */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-20 mb-20">
        <div className="rounded-3xl bg-white shadow-lg border border-slate-100">
          <h2 className="pt-12 text-center text-3xl font-extrabold text-indigo-900">
            Recente profielen
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 sm:px-8 lg:px-12 pb-12">
            {filteredProfiles.map((p) => (
              <ProfileCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <h2 className="text-center text-3xl font-semibold text-indigo-900">Hoe werkt het?</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            { t: "Plaats je opdracht", d: "Omschrijf kort en helder wat je zoekt." },
            { t: "Ontvang matches",  d: "Binnen 24 uur reacties van geschikte experts." },
            { t: "Kies & start",     d: "Maak afspraken, regel tarief en begin soepel." },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-2xl bg-indigo-50 p-6 shadow-md border border-indigo-100 text-center"
            >
              <h3 className="font-semibold mb-2">{s.t}</h3>
              <p className="text-indigo-700 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
          <div className="rounded-3xl bg-indigo-900 px-8 py-14 shadow-xl max-w-xl mx-auto">
            <h3 className="text-3xl font-extrabold">Klaar om te starten?</h3>
            <p className="mt-4 text-indigo-300 text-lg">
              Gratis aanmelden, je zit nergens aan vast.
            </p>
            <div className="mt-8">
              <a
                href="/signup?role=client"
                className="inline-flex items-center rounded-xl bg-white text-indigo-700 px-8 py-4 font-semibold hover:bg-indigo-50 transition"
              >
                Plaats je opdracht
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

