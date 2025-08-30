import { SESSION_MAX_AGE } from './jwt.js';

export function setSessionCookie(res, token) {
  const cookie = [
    `psm_session=${token}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${SESSION_MAX_AGE}`,
    `Secure`, // Vercel is HTTPS
  ].join('; ');
  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `psm_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`
  );
}

export function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  const map = Object.fromEntries(
    raw.split(';').map(v => v.trim()).filter(Boolean).map(v => v.split('=').map(decodeURIComponent))
  );
  return map[name] || null;
}

