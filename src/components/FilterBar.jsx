import React from 'react';

export default function FilterBar() {
  return (
    <section className="bg-white border-b">
      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full sm:w-1/2 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          placeholder="Zoeken op expertise, locatie, etc."
        />
        <div className="flex gap-3">
          <select className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand">
            <option>Alle categorieën</option>
            <option>HSE / Safety</option>
            <option>QA / QC</option>
            <option>Maintenance</option>
          </select>
          <button className="rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">
            Filter toepassen
          </button>
        </div>
      </div>
    </section>
  );
}
