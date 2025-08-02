import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress;

  if (!ip) return res.status(400).json({ error: "Unable to determine IP" });

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const db = await open({
      filename: "./data/contact.db",
      driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if this IP submitted in last 24 hours
    const existing = await db.get(
      `SELECT * FROM contact_submissions 
       WHERE ip_address = ? AND submitted_at > datetime('now', '-1 day')`,
      [ip]
    );

    if (existing) {
      return res.status(429).json({ error: "You can only submit once per day." });
    }

    // Telegram send (optional)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const topicId = 153;

    const telegramMessage = `🌐 DevZahir.com\nContact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          message_thread_id: topicId,
          text: telegramMessage,
        }),
      }
    );

    const telegramData = await telegramRes.json();
    if (!telegramData.ok) {
      throw new Error("Telegram error: " + telegramData.description);
    }

    // Log submission
    await db.run(`INSERT INTO contact_submissions (ip_address) VALUES (?)`, [ip]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
