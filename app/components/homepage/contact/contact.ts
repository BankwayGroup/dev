import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // configure Redis URL in .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (!ip) return res.status(400).json({ error: "Unable to determine IP" });

  const ipKey = `contact-ip-${ip}`;
  const exists = await redis.get(ipKey);

  if (exists) {
    return res.status(429).json({ error: "You can only submit once per day." });
  }

  // Save IP with 24-hour expiry
  await redis.set(ipKey, "submitted", "EX", 60 * 60 * 24);

  // Process your message here (e.g., send to Telegram)
  return res.status(200).json({ success: true });
}
