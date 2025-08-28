import React from 'react';

const data = [
  { id: 1, title: "HSE Specialist – Chemie", location: "Rotterdam", rate: "€95/u" },
  { id: 2, title: "QA/QC Inspector – Offshore", location: "Den Helder", rate: "€110/u" },
  { id: 3, title: "Maintenance Engineer – Food", location: "Eindhoven", rate: "€85/u" },
];

export default function MatchCardGrid() {
  return (
    <section id="aanbod" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Actuele matches</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((x) => (
            <article key={x.id} className="rounded-xl bg-white p-6 shadow-sm border">
              <h3 className="text-lg font-semibold">{x.title}</h3>
              <p className="mt-1 text-slate-600">{x.location}</p>
              <p className="mt-1 font-medium">{x.rate}</p>
              <button className="mt-4 w-full rounded-lg bg-brand px-4 py-2 text-white font-medium hover:bg-brand-dark">
                Bekijk details
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

