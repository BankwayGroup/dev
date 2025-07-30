"use client";

import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-screen text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 border border-indigo-600/20 rounded-2xl p-10 max-w-lg w-full shadow-2xl text-center backdrop-blur-md"
      >
        <FaCheckCircle className="text-6xl text-indigo-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-300 drop-shadow-md">
          Payment Successful
        </h1>
        <p className="text-lg text-indigo-100 mb-8">
          Thank you — your payment was processed successfully. We’ll be in touch shortly.
        </p>
        <Link
          href="https://devzahir.com"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300 hover:shadow-indigo-700/50"
        >
          Back to DevZahir.com
          <FaArrowRight className="text-sm" />
        </Link>
      </motion.div>
    </main>
  );
}
