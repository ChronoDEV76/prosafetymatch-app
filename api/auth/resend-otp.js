import { verifyToken, createTempToken, hashCode } from "../_lib/security.js";
import { sendOtpMail } from "../_lib/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { tempToken } = req.body || {};

  if (!tempToken) {
    return res.status(400).json({ message: "Ontbrekende gegevens" });
  }

  try {
    // Verifieer het oude token, krijg user data terug
    const old = verifyToken(tempToken); // bevat sub + email

    // Genereer nieuwe 6-cijferige code en hash
    const code = ("" + Math.floor(100000 + Math.random() * 900000)).slice(-6);
    const codeHash = hashCode(code);

    // Maak een nieuw temp token met 10 min geldigheid
    const freshToken = createTempToken(
      { sub: old.sub, email: old.email, codeHash },
      600
    );

    // Verzend de OTP e-mail
    await sendOtpMail({ to: old.email, code });

    return res.status(200).json({ tempToken: freshToken });
  } catch (e) {
    console.error("Fout bij resend OTP:", e);
    return res.status(401).json({ message: "Ongeldig of verlopen token" });
  }
}

