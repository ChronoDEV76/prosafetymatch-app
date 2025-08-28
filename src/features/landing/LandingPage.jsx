import { useState } from "react";
import PrimaryButton from "./components/PrimaryButton.jsx";
import FilterBar from "./components/FilterBar.jsx";
import BackgroundDecor from "./components/BackgroundDecor.jsx";
import heroBg from "./assets/hero.webp";

const PROFILES = [
  { id: 1, name: "Jan Brandwacht", city: "Amsterdam", rate: "€38/u", tags: "Industrieel, VCA" },
  { id: 2, name: "Petra Veilig", city: "Rotterdam", rate: "€40/u", tags: "Evenementen, EHBO" },
  { id: 3, name: "Omar Preventie", city: "Utrecht", rate: "€35/u", tags: "Manschap A, BHV" },
];

function ProfileCard({ p }) {
  const initials = p.name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
  return (
    <article
      tabIndex={0}
      className="block rounded-3xl bg-white/90 backdrop-blur-md border border-white/30
                 shadow-md focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-400 
                 hover:shadow-lg transition-transform hover:-translate-y-1"
      aria-label={`Bekijk profiel van ${p.name}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div
            className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center 
                       font-bold text-lg select-none"
            aria-hidden="true"
          >
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
    </article>
  );
}

export default function LandingPage() {
  const [filters, setFilters] = useState({ type: "", region: "", rate: "" });

  const filteredProfiles = PROFILES.filter(p =>
    (!filters.type || p.tags.toLowerCase().includes(filters.type.toLowerCase())) &&
    (!filters.region || p.city.toLowerCase().includes(filters.region.toLowerCase())) &&
    (!filters.rate || parseInt(p.rate) >= parseInt(filters.rate))
  );

  return (
    <main id="home" className="relative min-h-screen w-full">
      <BackgroundDecor />

      {/* HERO */}
      <section
        aria-label="Introductie"
        className="relative isolate flex flex-col items-center justify-center min-h-[80vh]
                   px-6 text-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 12%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/80 via-[#0b1220]/55 to-[#0b1220]/35" />
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
        <div className="relative z-10 max-w-4xl">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 
                       text-xs font-semibold tracking-tight ring-1 ring-white/25 backdrop-blur-sm"
            aria-label="DBA-proof en onafhankelijk"
          >
            🔒 DBA-proof & onafhankelijk
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight tracking-wide">
            Wij matchen expertise aan jouw <wbr /> opdracht
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-indigo-200 text-lg leading-relaxed">
            Binnen 24 uur voorstellen · Transparant tarief · Landelijke dekking
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <PrimaryButton
              href="/signup?role=client"
              variant="primary"
              className="px-7 py-4 text-lg min-w-[180px]"
            >
              Ik zoek een expert
            </PrimaryButton>
            <PrimaryButton
              href="/signup?role=pro"
              variant="ghost"
              className="px-7 py-4 text-lg min-w-[180px]"
            >
              Ik ben professional
            </PrimaryButton>
          </div>
          <p className="mt-6 text-xs text-indigo-300 tracking-wide">
            💳 Gratis aanmelden · Geen verborgen kosten
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-3 shadow-md z-20 border-b border-indigo-200">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Recent Profiles */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 mb-20">
        <div className="rounded-3xl bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-black/5 p-8">
          <h2 className="text-center text-3xl font-extrabold text-indigo-900 mb-8">
            Recente profielen
          </h2>
          {filteredProfiles.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((p) => (
                <ProfileCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Geen profielen gevonden die aan de filters voldoen.
            </p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20"
        aria-labelledby="how-it-works"
      >
        <h2
          id="how-it-works"
          className="text-center text-3xl font-semibold text-indigo-900 mb-8"
        >
          Hoe werkt het?
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3 list-none">
          {[
            { t: "Plaats je opdracht", d: "Omschrijf kort en helder wat je zoekt." },
            { t: "Ontvang matches", d: "Binnen 24 uur reacties van geschikte experts." },
            { t: "Kies & start", d: "Maak afspraken, regel tarief en begin soepel." },
          ].map(({ t, d }) => (
            <li
              key={t}
              className="rounded-2xl bg-indigo-50 p-6 shadow-lg border border-indigo-100 text-center"
            >
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-indigo-700 text-sm">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
          <div className="rounded-3xl bg-indigo-900 px-8 py-14 shadow-xl max-w-xl mx-auto">
            <h3 className="text-3xl font-extrabold">Klaar om te starten?</h3>
            <p className="mt-4 text-indigo-300 text-lg">
              Gratis aanmelden, je zit nergens aan vast.
            </p>
            <PrimaryButton
              href="/signup?role=client"
              className="mt-8 inline-flex items-center rounded-xl bg-white text-indigo-700 px-8 py-4 font-semibold hover:bg-indigo-50 transition"
            >
              Plaats je opdracht
            </PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}

