"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CancelPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f1f1f] to-[#3b0a0a] text-white px-4">
      <div className="backdrop-blur-md bg-white/5 border border-red-800/20 rounded-2xl p-10 max-w-lg w-full shadow-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-400">
          Payment Cancelled
        </h1>
        <p className="text-base md:text-lg text-red-200 mb-8">
          Looks like you didn’t finish your payment. No worries — you can try again anytime.
        </p>

        <Link
          href="https://devzahir.com"
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-red-700/40"
        >
          <FaArrowLeft className="text-sm" />
          Go back to DevZahir.com
        </Link>
      </div>
    </main>
  );
}
