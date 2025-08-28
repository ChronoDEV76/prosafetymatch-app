import React from 'react';

const items = [
  { title: "Onafhankelijk", text: "Geen verborgen belangen. Altijd de beste match." },
  { title: "DBA-proof", text: "Compliance geregeld, dus zorgeloos samenwerken." },
  { title: "Snel & gericht", text: "Slim zoeken op skills, beschikbaarheid en regio." },
];

export default function USPList() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-6 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{i.title}</h3>
            <p className="mt-2 text-slate-600">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
