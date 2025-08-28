// src/components/BackgroundDecor.jsx
// Subtle mesh + dotted grid + vignette behind the whole site
export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* soft base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-indigo-100" />

      {/* mesh blobs */}
      <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full
                      bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent)]
                      blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-[32rem] w-[32rem] rounded-full
                      bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)]
                      blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full
                      bg-[radial-gradient(closest-side,rgba(244,114,182,0.25),transparent)]
                      blur-3xl" />

      {/* very light dotted grid */}
      <div className="absolute inset-0 opacity-25
                      [background-image:radial-gradient(#dbe4ff_1px,transparent_1px)]
                      [background-size:18px_18px]" />

      {/* vignette to keep focus on content */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
    </div>
  );
}

