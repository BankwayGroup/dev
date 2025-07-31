export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body;

  const token = "8153922399:AAH2_pfw1cxcUD2AdmAeBBlvX_PdXDb76vA";
  const chatId = "-1002853662444";
  const topicId = 153;

  const text = `🌐 DevZahir.com\n<b>Contact Form Submission</b>:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message:\n${message}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_thread_id: topicId,
        text,
        parse_mode: "HTML",
      }),
    });

    const data = await telegramRes.json();

    if (!telegramRes.ok) {
      throw new Error(data.description || "Telegram API error");
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Telegram error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
