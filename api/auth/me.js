export const config = { runtime: 'nodejs' };
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  try {
    const cookie = req.headers.cookie || '';
    const match = cookie.match(/(?:^|;\s*)psm_session=([^;]+)/);
    if (!match) {
      return res.status(401).json({ type: 'not_authenticated', message: 'no session' });
    }

    const token = decodeURIComponent(match[1]);
    const payload = jwt.verify(token, process.env.SESSION_SECRET);

    res.status(200).json({ user: { email: payload.sub, role: payload.role } });
  } catch (error) {
    res.status(401).json({ type: 'not_authenticated', message: 'invalid session' });
  }
}

