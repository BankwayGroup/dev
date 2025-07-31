'use client';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
    date: null,
  });

  // Detect timezone on mount
  useEffect(() => {
    const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedZone);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.name ||
      !userInput.email ||
      !userInput.message ||
      !userInput.date
    ) {
      setError(true);
      return;
    }

    // Enforce 48-hour rule
    const now = new Date();
    const minimumAllowed = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours ahead
    if (userInput.date < minimumAllowed) {
      toast.error("Please choose a date at least 48 hours in advance.");
      return;
    }

    try {
      setIsLoading(true);
      const telegramBotToken = "YOUR_TOKEN"; // Replace
      const telegramChatId = "YOUR_CHAT_ID"; // Replace
      const topicId = 153;

      const formattedDate = userInput.date.toLocaleString("en-US", {
        timeZone: timezone,
        dateStyle: "full",
        timeStyle: "short",
      });

      const telegramMessage = `📅 New Consultation Booking:\n\n👤 Name: ${userInput.name}\n📧 Email: ${userInput.email}\n🌐 Timezone: ${timezone}\n🗓️ Selected Time: ${formattedDate}\n\n📝 Message:\n${userInput.message}`;

      await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: telegramChatId,
          message_thread_id: topicId,
          text: telegramMessage,
        }
      );

      toast.success("✅ Booking submitted successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
        date: null,
      });
      setError(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const minSelectableDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours from now

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="input-style"
        value={userInput.name}
        onChange={(e) =>
          setUserInput({ ...userInput, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Your Email"
        className="input-style"
        value={userInput.email}
        onChange={(e) =>
          setUserInput({ ...userInput, email: e.target.value })
        }
      />
      <DatePicker
        selected={userInput.date}
        onChange={(date) => setUserInput({ ...userInput, date })}
        showTimeSelect
        timeIntervals={30}
        minDate={minSelectableDate}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="input-style"
        placeholderText="Select a consultation date & time"
      />
      <textarea
        rows={4}
        placeholder="Tell me about your project..."
        className="input-style"
        value={userInput.message}
        onChange={(e) =>
          setUserInput({ ...userInput, message: e.target.value })
        }
      />
      {error && (
        <p className="text-red-500 text-sm">All fields are required.</p>
      )}
      <p className="text-sm text-gray-400 italic">
        Times shown in your timezone: <strong>{timezone}</strong>
      </p>
      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Book Consultation"}
      </button>
    </form>
  );
}

export default ContactForm;
