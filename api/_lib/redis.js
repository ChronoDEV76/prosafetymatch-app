const base = process.env.UPSTASH_REDIS_REST_URL;
const auth = `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`;

async function redis(cmd, ...args) {
  const url = `${base}/${cmd}/${args.map(encodeURIComponent).join('/')}`;
  const res = await fetch(url, { headers: { Authorization: auth } });
  if (!res.ok) throw new Error(`Redis ${cmd} failed: ${res.status}`);
  return res.json();
}

export async function setex(key, seconds, value) {
  return redis('setex', key, seconds, value);
}

export async function get(key) {
  const r = await redis('get', key);
  return r.result ?? null;
}

export async function del(key) {
  return redis('del', key);
}

export async function incr(key) {
  const r = await redis('incr', key);
  return Number(r.result);
}

export async function expire(key, seconds) {
  return redis('expire', key, seconds);
}

