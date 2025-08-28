import FilterInput from "./FilterInput.jsx";

export default function FilterBar({ filters, setFilters }) {
  return (
    <form
      id="aanbod"
      className="mx-auto -mt-8 max-w-7xl rounded-3xl bg-white/90 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[220px_1fr_200px_120px] gap-5 sticky top-4 z-40"
      role="search"
      aria-label="Zoek experts"
      onSubmit={e => e.preventDefault()}
    >
      <div className="relative">
        <label htmlFor="type-expert" className="sr-only">Type expert</label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🏷️</span>
        <select
          id="type-expert"
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
          aria-label="Type expert"
        >
          <option value="">Type expert</option>
          <option value="brandwacht">Brandwacht</option>
          <option value="beveiliger">Beveiliger</option>
          <option value="bhv">BHV-instructeur</option>
          <option value="EHBO/BHV">EHBO/BHV</option>
          <option value="reob monteur">REOB monteur</option>
          <option value="MVK">Middelbaar veiligheidskundige</option>
          <option value="MGK">Middelbaar gasmeetkundige</option>
        </select>
      </div>
      <FilterInput
        label="Regio of postcode"
        icon="📍"
        placeholder="Regio / Postcode (bv. 1012)"
        value={filters.region}
        onChange={e => setFilters(f => ({ ...f, region: e.target.value }))}
      />
      <FilterInput
        label="Minimum tarief"
        icon="€"
        type="number"
        min="0"
        step="5"
        placeholder="Min. tarief"
        value={filters.rate}
        onChange={e => setFilters(f => ({ ...f, rate: e.target.value }))}
      />
      <button
        type="submit"
        className="rounded-xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
        aria-label="Voer zoekopdracht uit"
      >
        Zoeken
      </button>
    </form>
  );
}

