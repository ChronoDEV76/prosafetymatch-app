export const config = { runtime: 'nodejs' };
import jwt from 'jsonwebtoken';

/**
 * Haalt OTP code op uit Redis en verwijdert deze direct (idempotent).
 * @param {string} email - Gebruikerse-mail
 * @returns {Promise<string|null>} - Opgeslagen OTP code of null
 */
async function getAndDeleteCode(email) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const key = `otp:${email.toLowerCase()}`;

  // Haal de code op
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['GET', key]),
  });

  let json = await res.json();
  const stored = json?.result ?? null;

  // Verwijder de code uit Redis
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['DEL', key]),
  });

  return stored;
}

/**
 * Zet een veilige JWT sessie-cookie in de response
 * @param {object} res - HTTP response object
 * @param {object} payload - Payload voor het JWT token
 */
function setSessionCookie(res, payload) {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is niet gedefinieerd');
  }

  const token = jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: '7d' });
  const isProd = process.env.VERCEL === '1';

  const cookieParts = [
    `psm_session=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    isProd ? 'Secure' : '',
    'Max-Age=604800', // 7 dagen in seconden
  ].filter(Boolean);

  res.setHeader('Set-Cookie', cookieParts.join('; '));
}

/**
 * API handler voor OTP verificatie
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, code } = req.body || await getJson(req);

    if (!email || !code) {
      return res.status(400).json({ error: 'Ontbrekende velden' });
    }

    const stored = await getAndDeleteCode(email);

    if (!stored || stored !== code) {
      return res.status(401).json({ error: 'Ongeldige of verlopen code' });
    }

    // Optioneel: haal of maak gebruiker op uit database

    setSessionCookie(res, { sub: email.toLowerCase(), role: 'user' });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Verificatie fout:', error);
    return res.status(500).json({ error: 'Verificatie mislukt' });
  }
}

/**
 * Hulpfunctie om body JSON asynchroon uit request te lezen
 * @param {object} req - HTTP request object
 * @returns {Promise<object>} - Geparste JSON body
 */
async function getJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        reject(e);
      }
    });
  });
}

