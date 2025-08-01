// @flow strict
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrderDetailsPage() {
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
    if (!orderDetails.trim()) {
      alert("Please enter order details.");
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
        <h1 className="text-2xl font-bold text-center mb-2">{plan.title}</h1>
        <p className="text-center text-[#7a5cff] font-semibold mb-2">{plan.price}</p>
        <p className="text-sm text-gray-300 mb-4 text-center">{plan.description}</p>
        <p className="text-sm text-gray-400 mb-6 text-center">
          <strong>Delivery Time:</strong> {plan.deliveryTime} days
        </p>

        <textarea
          rows={4}
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          placeholder="Add any custom instructions (required)"
          className="w-full p-3 mb-4 rounded-md bg-[#2c2b55] border border-[#444] resize-none text-sm text-white"
        />

        <button
          onClick={handleCheckout}
          disabled={processing}
          className="w-full bg-[#7A5CFF] hover:bg-[#9b84ff] px-5 py-3 rounded-md transition-all font-semibold"
        >
          {processing ? "Processing..." : "Proceed to Payment →"}
        </button>
      </motion.div>
    </div>
  );
}
