import crypto from "crypto";
import jwt from "jsonwebtoken";

export function hashCode(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function createTempToken(payload, ttlSec = 600) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ttlSec, algorithm: "HS256" });
}

export function verifyToken(token) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function sessionCookie(user) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  const jwtSession = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d", algorithm: "HS256" }
  );

  const isProd = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  const cookieParts = [
    `psm_session=${jwtSession}`,
    "Path=/",
    "HttpOnly",
    isProd ? "Secure" : "",
    "SameSite=Lax",
    "Max-Age=604800", // 7 days
    `Expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`
  ].filter(Boolean);

  return cookieParts.join("; ");
}

