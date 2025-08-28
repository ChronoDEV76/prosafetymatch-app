import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative isolate">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#0f1622]" />
      <div
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          background:
            "radial-gradient(800px 400px at 20% 20%, #6a6dff33, transparent 60%), radial-gradient(800px 400px at 80% 30%, #00d7ff22, transparent 60%)",
        }}
      />
      <div className="container-page py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <span className="badge mb-6">Matchen met zekerheid</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            ProSafetyMatch
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed">
            wij matchen expertise aan jouw opdracht volledig onafhankelijk &amp; DBA-proof
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#aanbod" className="btn-primary px-5 py-3">Bekijk het aanbod</a>
            <a href="#how" className="btn-ghost px-5 py-3">Hoe werkt het?</a>
          </div>
        </div>
      </div>
    </section>
  );
}
