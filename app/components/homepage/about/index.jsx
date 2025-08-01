"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../../helper/glow-card";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: 1,
    title: "Starter Website or Bot",
    price: "$80",
    description:
      "A basic bot with essential features OR a simple 1-page static website tailored to your needs!",
    features: [
      "E-commerce functionality",
      "Content upload and management",
      "Speed optimization",
      "Social media icons",
      "Plugin/extension setup",
      "Payment processing integration",
      "Opt-in form and autoresponder setup",
      "Hosting setup support",
      "1 beautifully designed page",
    ],
    deliveryTime: 3,
    revisions: "2",
  },
  {
    id: 2,
    title: "Multi-Page Website or Bot",
    price: "$165",
    description:
      "Get a multi-page responsive website with dynamic features and user-friendly navigation.",
    features: [
      "Up to 5 pages",
      "Content upload & management",
      "Functionality enhancements",
      "3 plugins/extensions",
      "E-commerce features for 20 products",
      "Payment processing integration",
      "Opt-in form & autoresponder setup",
      "Speed optimization",
      "Hosting setup assistance",
      "Social media icons for branding",
    ],
    deliveryTime: 5,
    revisions: "3",
  },
  {
    id: 3,
    title: "E-Commerce Website or Bot",
    price: "$425",
    description:
      "Get a fully functional e-commerce website or an advanced site with backend integration.",
    features: [
      "Content upload & management",
      "5 plugins/extensions",
      "E-commerce setup for 50 products",
      "Payment processing integration",
      "Opt-in form & autoresponder setup",
      "Speed optimization",
      "Hosting setup support",
      "Social media icons",
      "Up to 10 pages",
    ],
    deliveryTime: 10,
    revisions: "5",
  },
];

function AboutSection() {
  const [step, setStep] = useState("packages");
  const [activePlan, setActivePlan] = useState(null);
  const [orderDetails, setOrderDetails] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!activePlan || !orderDetails.trim()) {
      alert("Please enter additional instructions for your order.");
      return;
    }

    try {
      setProcessing(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activePlan.title,
          price: activePlan.price,
          orderDetails,
        }),
      });
      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed.");
        setProcessing(false);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
      setProcessing(false);
    }
  };

  const getETA = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div id="packages" className="relative min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <AnimatePresence mode="wait" initial={false}>
        {step === "packages" && (
          <motion.div
            key="packages"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#16f2b3] uppercase mb-8 flex items-center">
              <i className="fas fa-box-open mr-3"></i> Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <GlowCard key={plan.id} identifier={`plan-${plan.id}`}>
                  <div className="fade-in-card h-full flex flex-col justify-between rounded-2xl border border-[#2c2b55] bg-gradient-to-br from-[#18153a] to-[#1f1c46] p-6 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/20">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                      <p className="text-lg font-semibold text-[#7a5cff] mb-4">{plan.price}</p>
                      <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-400 mb-1">
                        <strong>Delivery Time:</strong> {plan.deliveryTime} days
                      </p>
                      <p className="text-sm text-gray-400 mb-1">
                        <strong>Estimated by:</strong> {getETA(plan.deliveryTime)}
                      </p>
                      <p className="text-sm text-gray-400">
                        <strong>Revisions:</strong> {plan.revisions}
                      </p>
                    </div>
                    <button
                      aria-label={`Purchase ${plan.title}`}
                      onClick={() => {
                        setActivePlan(plan);
                        setStep("details");
                      }}
                      className="mt-auto w-full bg-gradient-to-r from-[#7A5CFF] to-[#5D3BFE] hover:from-[#a18cff] hover:to-[#7f66ff] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7A5CFF]"
                    >
                      Purchase →
                    </button>
                  </div>
                </GlowCard>
              ))}
            </div>
          </motion.div>
        )}

        {step === "details" && activePlan && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#1f1c46] p-6 rounded-xl text-white max-w-md mx-auto top-28 bottom-28 overflow-auto shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-2 text-center">{activePlan.title}</h2>
            <p className="text-[#7a5cff] text-center mb-4">{activePlan.price}</p>
            <p className="text-sm text-gray-300 text-center mb-6">
              Estimated delivery: <strong>{getETA(activePlan.deliveryTime)}</strong>
            </p>
            <textarea
              rows={5}
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              placeholder="Add any custom instructions (required)"
              className="w-full p-3 rounded-md bg-[#2c2b55] border border-[#444] resize-none text-sm text-white"
            />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setStep("packages")}
                className="text-gray-400 hover:underline"
              >
                ← Back
              </button>
              <button
                onClick={handleContinue}
                disabled={processing}
                className="bg-[#7A5CFF] hover:bg-[#9b84ff] px-5 py-2 rounded-md transition-all font-medium"
              >
                {processing ? "Processing..." : "Proceed to Payment →"}
              </button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-[60vh]"
          >
            <div className="w-16 h-16 border-4 border-t-[#7A5CFF] border-[#2c2b55] rounded-full animate-spin" />
            <p className="text-white mt-4">Processing your invoice...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AboutSection;
