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
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Message from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 3px solid #ccc; padding-left: 10px;">${msg}</blockquote>
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
    const topicId = 153;

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
