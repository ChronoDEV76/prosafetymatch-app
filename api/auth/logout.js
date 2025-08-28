export const config = { runtime: 'nodejs' };

export default function handler(req, res) {
  const isProd = process.env.VERCEL === '1';

  const cookie = [
    'psm_session=',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    isProd ? 'Secure' : '',
    'Max-Age=0', // Verloopt meteen
  ]
    .filter(Boolean)
    .join('; ');

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ ok: true });
}

