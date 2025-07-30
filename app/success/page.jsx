"use client";

import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white border border-gray-300 rounded-3xl p-10 md:p-14 text-center max-w-lg w-full shadow-lg"
      >
        <FaCheckCircle className="text-6xl text-indigo-600 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you — your payment was processed successfully. We’ll be in touch shortly.
        </p>
        <Link
          href="https://devzahir.com"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow transition duration-300 hover:shadow-indigo-500/50"
        >
          Back to DevZahir.com
          <FaArrowRight className="text-sm" />
        </Link>
      </motion.div>
    </main>
  );
}
