'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    date: null,
    time: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', form);
    // Handle submission here (email, database, etc.)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full p-3 rounded-md bg-[#1a1443] text-white placeholder-gray-400"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full p-3 rounded-md bg-[#1a1443] text-white placeholder-gray-400"
        value={form.email}
        onChange={handleChange}
        required
      />
      <DatePicker
        selected={form.date}
        onChange={(date) => setForm({ ...form, date })}
        placeholderText="Select Date"
        className="w-full p-3 rounded-md bg-[#1a1443] text-white placeholder-gray-400"
        minDate={new Date()}
        dateFormat="MMMM d, yyyy"
        required
      />
      <select
        name="time"
        value={form.time}
        onChange={handleChange}
        className="w-full p-3 rounded-md bg-[#1a1443] text-white"
        required
      >
        <option value="">Select Time</option>
        <option>10:00 AM</option>
        <option>11:00 AM</option>
        <option>1:00 PM</option>
        <option>2:00 PM</option>
        <option>3:00 PM</option>
        <option>4:00 PM</option>
      </select>
      <textarea
        name="message"
        placeholder="Additional Info"
        className="w-full p-3 rounded-md bg-[#1a1443] text-white placeholder-gray-400"
        rows={4}
        value={form.message}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-[#16f2b3] text-gray-800 font-semibold py-3 px-6 rounded-md hover:scale-105 transition"
      >
        Book Consultation →
      </button>
    </form>
  );
}

export default ContactForm;
