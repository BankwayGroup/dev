"use client";

import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/5 border border-green-800/30 shadow-2xl rounded-3xl p-10 md:p-14 text-center max-w-lg w-full"
      >
        <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold mb-4 text-green-300 drop-shadow-md">
          Payment Successful
        </h1>
        <p className="text-lg text-green-100 mb-8">
          Thank you — your payment went through. We’ll reach out shortly.
        </p>
        <Link
          href="https://devzahir.com"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-300 hover:shadow-green-500/50"
        >
          Back to DevZahir.com
          <FaArrowRight className="text-sm" />
        </Link>
      </motion.div>
    </main>
  );
}
