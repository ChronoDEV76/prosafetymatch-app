import nodemailer from "nodemailer";

export function transporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP configuration incomplete. Please set SMTP_HOST, SMTP_USER and SMTP_PASS in your environment.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false otherwise
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendOtpMail({ to, code }) {
  if (!to) throw new Error("Recipient email ('to') is required.");
  if (!code) throw new Error("OTP code is required.");

  const t = transporter();
  const from = process.env.EMAIL_FROM || "no-reply@prosafetymatch.app";
  const html = `
    <div style="font-family:Inter, system-ui, Arial, sans-serif;">
      <h2>Je ProSafetyMatch beveiligingscode</h2>
      <p>Gebruik onderstaande code om in te loggen. Deze verloopt over 10 minuten.</p>
      <p style="font-size:24px; font-weight:700; letter-spacing:0.25em; user-select: all;">${code}</p>
      <p>Als je dit niet was, negeer deze e-mail.</p>
    </div>
  `;

  try {
    const info = await t.sendMail({
      from,
      to,
      subject: "Je beveiligingscode",
      html,
    });
    console.log(`Verificatiecode e-mail verstuurd naar ${to}: ${info.messageId}`);
  } catch (error) {
    console.error("Fout bij versturen verificatiecode:", error);
    throw error;
  }
}
