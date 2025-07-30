"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CancelPage() {
  return (
    <main className="flex items-center justify-center min-h-screen text-white px-4">
      <div className="bg-white/5 border border-gray-500/20 rounded-2xl p-10 max-w-lg w-full shadow-xl text-center backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
          Payment Cancelled
        </h1>
        <p className="text-base md:text-lg text-gray-400 mb-8">
          Your payment was not completed. You can return and try again anytime.
        </p>

        <Link
          href="https://devzahir.com"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-200 hover:shadow-indigo-700/40"
        >
          <FaArrowLeft className="text-sm" />
          Back to DevZahir.com
        </Link>
      </div>
    </main>
  );
}
