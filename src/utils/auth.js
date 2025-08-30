// src/utils/auth.js
export async function sendCode(email) {
  const r = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || 'Kon code niet versturen');
  return j;
}

export async function verifyCode(email, otp) {
  const r = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || 'Verificatie mislukt');
  return j; // cookie is now set by server
}

