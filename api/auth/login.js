import { createTempToken, hashCode } from "../_lib/security.js";
import { sendOtpMail } from "../_lib/mailer.js";

// Mock user check - in productie vervang je deze met echte DB lookup + hashed password check
async function mockUserCheck(email, password) {
  if (email && password && password.length >= 4) {
    // TODO: Hash en salted wachtwoorden gebruiken & database check
    return { id: "u_123", email };
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "E-mail en wachtwoord zijn verplicht" });
  }

  // Check user bestaat en wachtwoord klopt (mock)
  const user = await mockUserCheck(email, password);
  if (!user) {
    return res.status(401).json({ message: "Onjuiste inloggegevens" });
  }

  // Genereer 6-cijferige OTP code
  const code = ("" + Math.floor(100000 + Math.random() * 900000)).slice(-6);
  const codeHash = hashCode(code);

  // Maak tijdelijk token met user info + OTP hash, 10 minuten geldig
  const tempToken = createTempToken({ sub: user.id, email: user.email, codeHash }, 600);

  // Probeer OTP code per mail te versturen
  try {
    await sendOtpMail({ to: user.email, code });
  } catch (e) {
    console.error("Fout bij versturen OTP e-mail:", e);
    return res.status(500).json({ message: "Kon e-mail niet versturen" });
  }

  // Informeer frontend dat OTP nodig is
  return res.status(200).json({ status: "OTP_REQUIRED", tempToken });
}

