import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';
import axios from 'axios';
import path from 'path';

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// Telegram message sender
async function sendTelegramMessage(token, chat_id, message, topic_id) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
      message_thread_id: topic_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Telegram Error:', error.response?.data || error.message);
    return false;
  }
}

// Email template
function generateEmailTemplate(name, email, msg) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>New Message from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${msg}</blockquote>
    </div>
  `;
}

// Email sender
async function sendEmail(payload, textMessage) {
  const { name, email, message } = payload;
  try {
    await transporter.sendMail({
      from: "Portfolio",
      to: process.env.EMAIL_ADDRESS,
      subject: `New Message from ${name}`,
      html: generateEmailTemplate(name, email, message),
      text: textMessage,
      replyTo: email,
    });
    return true;
  } catch (err) {
    console.error('Email Error:', err.message);
    return false;
  }
}

// SQLite logic
async function hasSubmittedRecently(ip: string) {
  const db = await open({
    filename: path.resolve(process.cwd(), 'contact.sqlite'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      ip TEXT PRIMARY KEY,
      last_submission TEXT
    );
  `);

  const existing = await db.get("SELECT last_submission FROM contact_submissions WHERE ip = ?", ip);
  const now = new Date();

  if (existing) {
    const last = new Date(existing.last_submission);
    const hoursPassed = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    if (hoursPassed < 24) return true;
  }

  await db.run("REPLACE INTO contact_submissions (ip, last_submission) VALUES (?, ?)", ip, now.toISOString());
  return false;
}

// API handler
export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message } = payload;

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const submitted = await hasSubmittedRecently(ip);
    if (submitted) {
      return NextResponse.json({
        success: false,
        message: 'You can only submit once per day.',
      }, { status: 429 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const topicId = 153;
    const fullMessage = `🌐 DevZahir.com\nContact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const telegramSuccess = await sendTelegramMessage(botToken, chatId, fullMessage, topicId);
    const emailSuccess = await sendEmail(payload, fullMessage);

    if (telegramSuccess && emailSuccess) {
      return NextResponse.json({ success: true, message: 'Sent successfully!' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to send via one or more channels.' }, { status: 500 });
    }

  } catch (err) {
    console.error('API Error:', err.message);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
