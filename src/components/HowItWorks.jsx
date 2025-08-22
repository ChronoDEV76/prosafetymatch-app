import React from 'react';

const steps = [
  { n: 1, title: "Plaats opdracht", text: "Omschrijf je behoefte en voorwaarden." },
  { n: 2, title: "Krijg matches", text: "Wij tonen geschikte experts met bewijs." },
  { n: 3, title: "Kies & start", text: "Selecteer de beste match en ga aan de slag." },
];

export default function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Zo werkt het</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-brand text-white grid place-items-center font-bold">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

