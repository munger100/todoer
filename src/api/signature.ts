import crypto from "crypto";
import { serialize } from "cookie";
import { NextApiResponse } from "next";

export function generateTokenSignature(token: string) {
  const hmac = crypto.createHmac("sha256", process.env.APP_SECRET);
  hmac.update(token);
  return hmac.digest("hex");
}

export function verifyTokenSignature(token: string, signature: string) {
  if (!token || !signature) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(generateTokenSignature(token)),
    Buffer.from(signature)
  );
}

export const signatureCookieName = "token_signature";

export function setSignatureCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    "Set-Cookie",
    serialize(signatureCookieName, generateTokenSignature(token), {
      httpOnly: true,
      sameSite: true,
      path: "/",
      maxAge: 31536000,
      // HTTPS-only on production
      secure: process.env.NODE_ENV === "production",
    })
  );
}
