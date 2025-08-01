// app/order-details/page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const price = searchParams.get("price");

  const [orderDetails, setOrderDetails] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!plan || !price) return;
    try {
      setProcessing(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: plan, price, orderDetails }),
      });
      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
        setProcessing(false);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("An error occurred. Please try again later.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-[#1f1c46] text-white">
      <div className="max-w-md w-full space-y-6 bg-[#18153a] p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">{plan}</h1>
        <p className="text-[#7a5cff] text-center text-lg">{price}</p>

        <textarea
          rows={4}
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          placeholder="Add any custom instructions..."
          className="w-full p-3 rounded-md bg-[#2c2b55] border border-[#444] resize-none text-sm text-white"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:underline"
          >
            ← Back
          </button>
          <button
            onClick={handleCheckout}
            disabled={processing}
            className="bg-[#7A5CFF] hover:bg-[#9b84ff] px-5 py-2 rounded-md transition-all font-medium"
          >
            {processing ? "Processing..." : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
