export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const topicId = process.env.TELEGRAM_TOPIC_ID;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const payload = {
    chat_id: chatId,
    message_thread_id: Number(topicId),
    text: message,
    parse_mode: "HTML",
  };

  try {
    const telegramRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await telegramRes.json();

    if (!telegramRes.ok) throw new Error(data.description || "Unknown Telegram error");

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Telegram error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
