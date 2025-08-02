"use client";

import React, { useEffect, useState } from "react";
import { testimonials } from "@/utils/data/testimonials";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const AUTO_SCROLL_DELAY = 5000;

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTO_SCROLL_DELAY);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentIndex];

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center bg-[#0f172a] text-white rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 uppercase text-[#16f2b3]">
        Testimonials
      </h2>
      <motion.div
        key={testimonial.name}
        className="max-w-2xl text-center px-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaQuoteLeft className="text-[#16f2b3] text-2xl mb-4 mx-auto" />
        <p className="text-base md:text-lg text-[#d3d8e8] mb-6">{testimonial.text}</p>
        <p className="text-sm font-medium uppercase text-[#16f2b3]">{testimonial.name}</p>
        <p className="text-xs text-[#94a3b8]">{testimonial.role}</p>
      </motion.div>

      <div className="flex gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex ? "bg-[#16f2b3]" : "bg-[#334155]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
