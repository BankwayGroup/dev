'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    date: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., send to API or EmailJS)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 w-full"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Book a Consultation</h2>

      <div className="mb-4">
        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#16f2b3] backdrop-blur-sm"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#16f2b3] backdrop-blur-sm"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          name="message"
          placeholder="Tell me about your project..."
          rows="4"
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#16f2b3] backdrop-blur-sm resize-none"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          placeholderText="Select a date"
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#16f2b3] backdrop-blur-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#16f2b3] to-[#0e7dff] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition duration-200 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
