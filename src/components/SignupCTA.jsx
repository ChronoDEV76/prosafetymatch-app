import React from 'react';

export default function SignupCTA() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Klaar om je opdracht te plaatsen of gevonden te worden?
        </h2>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-brand hover:bg-slate-100"
          >
            Plaats een opdracht
          </a>
          <a
            href="#"
            className="rounded-xl ring-2 ring-white/70 px-6 py-3 font-semibold hover:bg-white/10"
          >
            Ik ben expert
          </a>
        </div>
      </div>
    </section>
  );
}

