import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';

// In-memory IP tracking (resets on server restart)
const recentIPs = new Map();

function hasSubmittedRecently(ip) {
  const now = Date.now();
  const last = recentIPs.get(ip);
  if (last && now - last < 1000 * 60 * 60 * 24) return true;

  recentIPs.set(ip, now);
  return false;
}

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// Email template
function generateEmailTemplate(name, email, msg) {
  return `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #eaf4ff; border-radius: 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.08); border: 1px solid #cce7ff;">
    <header style="text-align: center; margin-bottom: 24px;">
      <h2 style="color: #229ed9; font-size: 24px; margin: 0;">📨 New Message Received</h2>
      <p style="color: #333; font-weight: 500;">from <strong>${name}</strong></p>
    </header>

    <section style="background: #ffffff; border-radius: 12px; padding: 20px 24px; border: 1px solid #d0e7ff;">
      <p style="margin: 0 0 12px; font-size: 14px;">
        <strong>Email:</strong> 
        <a href="mailto:${email}" style="color: #229ed9; text-decoration: none;">${email}</a>
      </p>
      <p style="margin: 16px 0 6px; font-weight: 600;">Message:</p>
      <blockquote style="margin: 0; padding: 14px 18px; background-color: #f5faff; border-left: 4px solid #229ed9; border-radius: 8px; color: #222; font-style: normal; line-height: 1.6;">
        ${msg.replace(/\n/g, "<br>")}
      </blockquote>
    </section>

    <footer style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
      <p>Delivered via <a href="https://devzahir.com" target="_blank" style="color: #229ed9; font-weight: 500;">DevZahir.com</a></p>
    </footer>
  </div>
  `;
}


// Send email
async function sendEmail(payload, plainText) {
  const { name, email, message } = payload;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_ADDRESS}>`,
      to: process.env.EMAIL_ADDRESS,
      subject: `New Message from ${name}`,
      html: generateEmailTemplate(name, email, message),
      text: plainText,
      replyTo: email,
    });
    return true;
  } catch (err) {
    console.error('Email Error:', err.message);
    return false;
  }
}

// Send Telegram
async function sendTelegramMessage(token, chat_id, message, topic_id) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      chat_id,
      message_thread_id: topic_id,
      text: message,
    });
    return res.data.ok;
  } catch (err) {
    console.error('Telegram Error:', err.response?.data || err.message);
    return false;
  }
}

// API handler
export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing fields.' },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (hasSubmittedRecently(ip)) {
      return NextResponse.json(
        { success: false, message: 'You can only submit once per day.' },
        { status: 429 }
      );
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const topicId = 253;

    const formattedMessage = `🌐 DevZahir.com\nContact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const telegramSuccess = await sendTelegramMessage(
      telegramToken,
      chatId,
      formattedMessage,
      topicId
    );

    const emailSuccess = await sendEmail(payload, formattedMessage);

    if (telegramSuccess && emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send via one or more channels.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Contact API Error:', err.stack || err.message || err);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
