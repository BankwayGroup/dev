// @flow strict
"use client";

import { FaSpinner } from "react-icons/fa";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";

function OrderDetailsInner() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState("");
  const [processing, setProcessing] = useState(false);

  const plan = {
    title: searchParams.get("plan") || "",
    price: searchParams.get("price") || "",
    description: searchParams.get("description") || "",
    deliveryTime: searchParams.get("deliveryTime") || "",
  };

const handleCheckout = async () => {
  const trimmed = orderDetails.trim();

  if (!trimmed) {
    alert("Please enter order details.");
    return;
  }

  if (trimmed.length < 100) {
    alert("Order details must be at least 100 characters long.");
    return;
  }

  setProcessing(true);
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: plan.title,
        price: plan.price,
        orderDetails,
      }),
    });

    const data = await response.json();
    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to create checkout session.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred during checkout.");
  } finally {
    setProcessing(false);
  }
};

  return (
    <div className="min-h-screen py-20 px-4 max-w-xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1f1c46] p-6 rounded-xl shadow-2xl"
      >
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co/k2Q9R4w9/photo-2025-07-31-22-40-16.jpg"
            alt="Dev Zahir Logo"
            className="h-12 w-auto rounded-md shadow-md"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">{plan.title}</h1>
        <p className="text-center text-[#7a5cff] font-semibold mb-2">{plan.price}</p>
        <p className="text-sm text-gray-300 mb-4 text-center">{plan.description}</p>
        <p className="text-sm text-gray-400 mb-6 text-center">
          <strong>Delivery Time:</strong> {plan.deliveryTime} 
        </p>

        <textarea
          rows={4}
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          placeholder="Add any custom instructions (required)"
          className="w-full p-3 mb-4 rounded-md bg-[#2c2b55] border border-[#444] resize-none text-sm text-white"
        />

        <div className="flex justify-between gap-4">
          <a
            href="https://devzahir.com/#packages"
            className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 rounded-xl transition-transform duration-200 font-semibold shadow-md hover:scale-105 text-center"
          >
            ← Back to Home
          </a>
          <button
            onClick={handleCheckout}
            disabled={processing}
            className={`w-1/2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md hover:scale-105 ${
              processing
                ? "bg-[#5D3BFE] opacity-70 cursor-not-allowed"
                : "bg-[#7A5CFF] hover:bg-[#9b84ff]"
            }`}
          >
  {processing ? (
  <div className="flex items-center justify-center gap-2">
    <FaSpinner className="animate-spin text-white w-4 h-4" />
    Processing...
  </div>
) : (
  "Proceed to Payment →"
)}

          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-24">Loading...</div>}>
      <OrderDetailsInner />
    </Suspense>
  );
}





