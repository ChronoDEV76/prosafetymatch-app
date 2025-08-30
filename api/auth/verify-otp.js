import { get, del } from '../_lib/redis.js';
import { signSession } from '../_lib/jwt.js';
import { setSessionCookie } from '../_lib/cookies.js';
import { withCORS } from '../_lib/cors.js';

function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, otp } = req.body || {};
  if (!isValidEmail(email) || !/^\d{6}$/.test(otp || '')) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const stored = await get(`otp:${email}`);
  if (!stored || stored !== otp) {
    return res.status(401).json({ error: 'Invalid or expired code' });
  }

  // Consume OTP
  await del(`otp:${email}`);

  // Issue session
  const token = await signSession({ sub: email, role: 'user' });
  setSessionCookie(res, token);

  return res.status(200).json({ ok: true });
}

export default withCORS(handler);

