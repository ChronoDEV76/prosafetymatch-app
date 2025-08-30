import { getCookie } from '../_lib/cookies.js';
import { verifySession } from '../_lib/jwt.js';
import { withCORS } from '../_lib/cors.js';

async function handler(req, res) {
  const token = getCookie(req, 'psm_session');
  if (!token) return res.status(200).json({ authenticated: false });

  const payload = await verifySession(token);
  if (!payload) return res.status(200).json({ authenticated: false });

  return res.status(200).json({ authenticated: true, user: { email: payload.sub } });
}

export default withCORS(handler);

