import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';
import axios from 'axios';
import path from 'path';

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// Helper: Send Telegram message
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

// Helper: Generate HTML email
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

// Helper: Send email
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

// Helper: Check SQLite IP submission limit
async function hasSubmittedRecently(ip) {
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

  const result = await db.get(
    `SELECT last_submission FROM contact_submissions WHERE ip = ?`,
    ip
  );

  const now = new Date();

  if (result) {
    const last = new Date(result.last_submission);
    const hours = (now - last) / 1000 / 60 / 60;
    if (hours < 24) return true;
  }

  await db.run(
    `REPLACE INTO contact_submissions (ip, last_submission) VALUES (?, ?)`,
    ip,
    now.toISOString()
  );

  return false;
}

// POST handler
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

    const blocked = await hasSubmittedRecently(ip);
    if (blocked) {
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
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
