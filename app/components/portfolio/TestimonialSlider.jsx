// components/portfolio/TestimonialSlider.jsx
"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/utils/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 mb-10 text-center max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-bold text-[#16f2b3] uppercase mb-6">
        What Clients Say
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[current].name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-[#10172d] border border-[#353a52] p-6 rounded-xl text-left shadow-lg"
        >
          <p className="text-base italic text-gray-300 mb-4 leading-relaxed">
            “{testimonials[current].quote}”
          </p>
          <div className="flex items-center gap-4">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-white">
                {testimonials[current].name}
              </h4>
              <span className="text-sm text-gray-400">
                {testimonials[current].role}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
