import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
/* ---------------- Frontend helpers (inline) ---------------- */

async function sendSignupCode(email) {
  const r = await fetch("/api/auth/request-signup-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.message || "Kon verificatiecode niet versturen");
  return j;
}

async function verifySignupCode(email, code) {
  const r = await fetch("/api/auth/verify-signup-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.message || "Verificatie mislukt");
  return j; // verondersteld dat server een sessie-cookie zet of token teruggeeft
}
/* ---------------- Utilities ---------------- */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const STEP = { EMAIL: "email", OTP: "otp" };
function Field({ label, htmlFor, hint, error, children }) {
  return (
    <label className="block" htmlFor={htmlFor}>
      {label && (
        <span className="block text-sm font-medium text-slate-800">{label}</span>
      )}
      <div className="mt-1">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  );
}
/* ---------------- Component ---------------- */

export default function SignupPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(STEP.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (step === STEP.EMAIL) emailRef.current?.focus();
    if (step === STEP.OTP) otpRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current = setInterval(() => {
      setCooldown((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  async function onSend(e) {
    e?.preventDefault?.();
    setErrors({});
    setNotice("");
    if (!isValidEmail(email)) {
      setErrors({ email: "Geen geldig e-mailadres" });
      return;
    }
    setLoading(true);
    try {
      await sendSignupCode(email.trim());
      setStep(STEP.OTP);
      setNotice("Er is een verificatiecode naar je e-mail gestuurd.");
      setCooldown(30);
    } catch (err) {
      setNotice(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onVerify(e) {
    e?.preventDefault?.();
    setErrors({});
    setNotice("");
    const clean = (otp || "").replace(/\D/g, "");
    if (clean.length !== 6) {
      setErrors({ otp: "Code moet uit 6 cijfers bestaan" });
      return;
    }
    setLoading(true);
    try {
      await verifySignupCode(email.trim(), clean);
      setNotice("Account aangemaakt! Je bent ingelogd.");
      // Navigeer bijvoorbeeld naar dashboard na registratie
      nav("/dashboard", { replace: true });
    } catch (err) {
      setNotice(err.message);
    } finally {
      setLoading(false);
    }
  }

  function onPasteOTP(e) {
    const txt = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (txt.length === 6) {
      e.preventDefault();
      setOtp(txt);
    }
  }

  const otpHelp = useMemo(() => {
    if (cooldown > 0) {
      return `Geen e-mail? Je kunt over ${cooldown}s opnieuw verzenden.`;
    }
    return "Geen e-mail ontvangen? Controleer je spam of verzend opnieuw.";
  }, [cooldown]);

  return (
    <main className="min-h-screen grid place-items-center bg-gradient-to-b from-indigo-50 to-white px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Registreren</h1>
          <p className="mt-1 text-sm text-slate-600">
            Veilig & wachtwoordloos registreren met een e-mailcode.
          </p>
        </header>
        {step === STEP.EMAIL && (
          <form onSubmit={onSend} noValidate>
            <Field
              label="E-mail"
              htmlFor="email"
              hint="We sturen je een 6-cijferige code."
              error={errors.email}
            >
              <input
                id="email"
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="jij@bedrijf.nl"
              />
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Verzenden…" : "Verificatiecode aanvragen"}
            </button>
            {notice && <p className="mt-3 text-sm text-slate-700" role="status">{notice}</p>}
          </form>
        )}
        {step === STEP.OTP && (
          <form onSubmit={onVerify} noValidate>
            <p className="mb-4 text-sm text-slate-700">
              Code verstuurd naar: <b className="font-medium">{email}</b>
            </p>
            <Field
              label="Code (6 cijfers)"
              htmlFor="otp"
              hint={otpHelp}
              error={errors.otp}
            >
              <input
                id="otp"
                ref={otpRef}
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={6}
                maxLength={6}
                value={otp}
                onPaste={onPasteOTP}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center tracking-widest text-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="••••••"
                aria-describedby={errors.otp ? "otp-error" : undefined}
              />
            </Field>
            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={loading || (otp || "").replace(/\D/g, "").length !== 6}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Controleren…" : "Account aanmaken"}
              </button>
              <button
                type="button"
                onClick={() => setStep(STEP.EMAIL)}
                disabled={loading}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
              >
                Ander e-mailadres
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
              <button
                type="button"
                onClick={() => onSend()}
                disabled={loading || cooldown > 0}
                className="underline decoration-indigo-400 underline-offset-2 disabled:no-underline disabled:opacity-50"
              >
                Code opnieuw versturen
              </button>
              <span>Problemen? support@prosafetymatch.app</span>
            </div>
            {notice && (
              <p className="mt-3 text-sm" role="status">
                {notice.startsWith("Kon") || notice.startsWith("Verificatie")
                  ? <span className="text-rose-600">{notice}</span>
                  : <span className="text-emerald-600">{notice}</span>}
              </p>
            )}
          </form>
        )}
        <footer className="mt-8 text-center text-xs text-slate-500">
          Door aan te melden ga je akkoord met onze{" "}
          <a href="/terms" className="text-indigo-600 hover:underline">voorwaarden</a> en{" "}
          <a href="/privacy" className="text-indigo-600 hover:underline">privacyverklaring</a>.
        </footer>
      </section>
    </main>
  );
}

