import React, { useMemo, useState, memo } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "./components/PrimaryButton.jsx";
import FilterBar from "./components/FilterBar.jsx";
import BackgroundDecor from "./components/BackgroundDecor.jsx";
import heroBg from "./assets/hero.webp";

// Mock data (replace later with API)
const PROFILES = [
  { id: 1, name: "Jan Brandwacht", city: "Amsterdam", rate: "€38/u", tags: "Industrieel, VCA" },
  { id: 2, name: "Petra Veilig", city: "Rotterdam", rate: "€40/u", tags: "Evenementen, EHBO" },
  { id: 3, name: "Omar Preventie", city: "Utrecht", rate: "€35/u", tags: "Manschap A, BHV" },
];

const ProfileCard = memo(({ p }) => {
  const initials = useMemo(
    () => p.name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(),
    [p.name]
  );

  return (
    <article
      tabIndex={0}
      className="rounded-3xl bg-white/90 backdrop-blur-md border border-white/30 shadow-md
                 focus:outline-none focus:ring-2 focus:ring-indigo-400
                 transition-transform hover:-translate-y-1 hover:shadow-lg"
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
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-slate-600 text-sm">{p.city}</p>
          </div>
        </div>
        <p className="mt-4 font-medium text-indigo-700">{p.rate}</p>
        <p className="text-slate-700 text-sm">{p.tags}</p>
      </div>
    </article>
  );
});

export default function LandingPageCentered() {
  const [filters, setFilters] = useState({ type: "", region: "", rate: "" });

  const filteredProfiles = useMemo(() => {
    const fType = filters.type.trim().toLowerCase();
    const fReg = filters.region.trim().toLowerCase();
    const fRate = parseInt(filters.rate, 10);
    return PROFILES.filter((p) => {
      const okType = !fType || p.tags.toLowerCase().includes(fType);
      const okReg = !fReg || p.city.toLowerCase().includes(fReg);
      const okRate = Number.isNaN(fRate) || parseInt(p.rate, 10) >= fRate;
      return okType && okReg && okRate;
    });
  }, [filters]);

  return (
    <main id="home" className="relative min-h-screen w-full">
      <BackgroundDecor />
      {/* HERO (centered and shifted right) */}
      <section
        aria-label="Introductie"
        className="relative isolate min-h-[80vh] flex items-center justify-center px-6 py-16
                   text-white text-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 12%",
        }}
      >
        {/* Readable overlay with brand tint and subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/80 via-[#0b1220]/55 to-[#0b1220]/35" />
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
        {/* Content with left padding to shift right */}
        <div className="relative z-10 mx-auto max-w-3xl pl-12 sm:pl-20 lg:pl-32 xl:pl-40">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2
                       text-xs font-semibold tracking-tight ring-1 ring-white/25 backdrop-blur-sm"
            aria-label="DBA-proof en onafhankelijk"
          >
            🔒 DBA-proof & onafhankelijk
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide">
            Wij matchen expertise aan jouw <wbr /> opdracht
          </h1>
          <p className="mt-4 text-indigo-200/95 text-base sm:text-lg leading-relaxed">
            Binnen 24 uur voorstellen · Transparant tarief · Landelijke dekking
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            <PrimaryButton
              as={Link}
              to="/signup?role=client"
              variant="primary"
              className="px-6 py-3 sm:px-7 sm:py-4 text-base sm:text-lg min-w-[180px]"
              aria-label="Ik zoek een expert"
            >
              Ik zoek een expert
            </PrimaryButton>
            <PrimaryButton
              as={Link}
              to="/signup?role=pro"
              variant="ghost"
              className="px-6 py-3 sm:px-7 sm:py-4 text-base sm:text-lg min-w-[180px]"
              aria-label="Ik ben professional"
            >
              Ik ben professional
            </PrimaryButton>
          </div>
          <p className="mt-6 text-xs text-indigo-200/90 tracking-wide">
            💳 Gratis aanmelden · Geen verborgen kosten
          </p>
        </div>
      </section>
      {/* Filterbar (sticky with nice focus) */}
      <div
        className="sticky top-0 z-20 border-b border-indigo-200/40 bg-white/90 backdrop-blur-md
                   px-4 sm:px-6 py-2.5 shadow-md"
        role="region"
        aria-label="Filterbalk"
      >
        <div className="mx-auto max-w-7xl">
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>
      </div>
      {/* Recent Profiles */}
      <section
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 mb-16 sm:mb-20"
        aria-labelledby="recent-profiles"
      >
        <div className="rounded-3xl bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-black/5 p-6 sm:p-8">
          <h2
            id="recent-profiles"
            className="text-center text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-6 sm:mb-8"
          >
            Recente profielen
          </h2>
          {filteredProfiles.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((p) => (
                <ProfileCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 italic">
              Geen profielen gevonden die aan de filters voldoen.
            </p>
          )}
        </div>
      </section>
      {/* How it works */}
      <section
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20"
        aria-labelledby="how-it-works"
      >
        <h2
          id="how-it-works"
          className="text-center text-2xl sm:text-3xl font-semibold text-indigo-900 mb-6 sm:mb-8"
        >
          Hoe werkt het?
        </h2>
        <ul className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 sm:grid-cols-3 list-none">
          {[
            { t: "Plaats je opdracht", d: "Omschrijf kort en helder wat je zoekt." },
            { t: "Ontvang matches", d: "Binnen 24 uur reacties van geschikte experts." },
            { t: "Kies & start", d: "Maak afspraken, regel tarief en begin soepel." },
          ].map(({ t, d }) => (
            <li
              key={t}
              className="rounded-2xl bg-indigo-50 p-5 sm:p-6 shadow-lg border border-indigo-100 text-center"
            >
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-indigo-700 text-sm">{d}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Footer CTA */}
      <section className="bg-indigo-700 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mx-auto max-w-xl rounded-3xl bg-indigo-900 px-6 sm:px-8 py-12 sm:py-14 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Klaar om te starten?</h3>
            <p className="mt-3 sm:mt-4 text-indigo-300 text-base sm:text-lg">
              Gratis aanmelden, je zit nergens aan vast.
            </p>
            <PrimaryButton
              as={Link}
              to="/signup?role=client"
              className="mt-6 sm:mt-8 inline-flex items-center rounded-xl bg-white text-indigo-700
                         px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-indigo-50 transition"
              aria-label="Plaats je opdracht"
            >
              Plaats je opdracht
            </PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}

