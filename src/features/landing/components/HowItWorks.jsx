import React from 'react';

// src/components/HowItWorks.js
const items = [
  { title: "Onafhankelijk", text: "Geen verborgen belangen. Altijd de beste match." },
  { title: "DBA-proof", text: "Compliance geregeld, dus zorgeloos samenwerken." },
  { title: "Snel & gericht", text: "Slim zoeken op skills, beschikbaarheid en regio." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="container-page py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Zo werkt het</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="card p-5">
            <h3 className="font-semibold text-lg mb-1.5">{i.title}</h3>
            <p className="text-black/70">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

