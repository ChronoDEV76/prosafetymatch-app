export default function FilterInput({ icon, placeholder, type = "text", label, ...rest }) {
  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
        aria-label={label}
        {...rest}
      />
    </div>
  );
}

