import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Constants voor de stappen
const STEP_CREDENTIALS = "email";
const STEP_OTP = "otp";

function Field({ label, htmlFor, error, children }) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  );
}

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const [step, setStep] = useState(STEP_CREDENTIALS);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const emailRef = useRef(null);
  const otpRef = useRef(null);

  useEffect(() => {
    // Focus op relevante input bij stapwissel
    if (step === STEP_CREDENTIALS) {
      emailRef.current?.focus();
    } else if (step === STEP_OTP) {
      otpRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    // Check of al ingelogd, dan redirect
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) nav(redirectTo, { replace: true });
      })
      .catch(() => {});
  }, [nav, redirectTo]);

  async function requestOtp(e) {
    e.preventDefault();
    setErrors({});
    if (!isValidEmail(email)) {
      setErrors({ email: "Geen geldig e-mailadres" });
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Fout bij verzenden code");
      setStep(STEP_OTP);
      setMsg("We hebben je een verificatiecode gemaild.");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setErrors({});
    if (otp.length !== 6) {
      setErrors({ otp: "Code moet uit 6 cijfers bestaan" });
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Verificatie mislukt");
      nav(redirectTo, { replace: true });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 440, margin: "64px auto", padding: 24 }}>
      <h1 className="text-3xl font-bold mb-6">Inloggen</h1>
      {step === STEP_CREDENTIALS && (
        <form onSubmit={requestOtp} noValidate>
          <Field label="E-mail" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="email"
              required
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-md bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Versturen…" : "Stuur inlogcode"}
          </button>
          {msg && <p className="mt-4 text-sm text-green-600">{msg}</p>}
        </form>
      )}
      {step === STEP_OTP && (
        <form onSubmit={verifyOtp} noValidate>
          <p className="mb-4 text-gray-700">
            Code naar: <b>{email}</b>. Voer hier je 6-cijferige code in:
          </p>
          <Field label="Code (6 cijfers)" htmlFor="otp" error={errors.otp}>
            <input
              id="otp"
              inputMode="numeric"
              pattern="[0-9]*"
              minLength={6}
              maxLength={6}
              required
              value={otp}
              ref={otpRef}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-center tracking-widest text-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </Field>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex-1 rounded-md bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Controleren…" : "Inloggen"}
            </button>
            <button
              type="button"
              onClick={() => setStep(STEP_CREDENTIALS)}
              disabled={loading}
              className="flex-1 rounded-md border border-gray-300 py-3 font-medium hover:bg-gray-100 disabled:opacity-50"
            >
              Terug
            </button>
          </div>
          {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
        </form>
      )}
    </div>
  );
}

