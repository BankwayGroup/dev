// @flow strict
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import plansAnimation from "/public/lottie/code.json";
import processingAnimation from "/public/lottie/processing.json";

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
    deliveryTime: "3 days",
    revisions: "2",
    contact: "@DevZahirRobot",
    link: "https://devzahir.com/",
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
    deliveryTime: "5 days",
    revisions: "3",
    contact: "@DevZahirRobot",
    link: "https://devzahir.com/",
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
    deliveryTime: "10 days",
    revisions: "5",
    contact: "@DevZahirRobot",
    link: "https://devzahir.com/",
  },
];

function AboutSection() {
  const [step, setStep] = useState("packages");
  const [activePlan, setActivePlan] = useState(null);
  const [modalInput, setModalInput] = useState("");

  const handleCheckout = async (plan, orderDetails) => {
    try {
      setStep("processing");
      const response = await axios.post("/api/checkout", {
        title: plan.title,
        price: plan.price,
        orderDetails,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to initiate checkout.");
      setStep("packages");
    }
  };

  return (
    <div className="relative min-h-screen py-12">
      <AnimatePresence mode="wait">
        {step === "packages" && (
          <motion.div
            key="packages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <h2 className="text-2xl font-bold text-[#16f2b3] uppercase mb-8 flex items-center">
              <i className="fas fa-box-open mr-3"></i> Packages
            </h2>

            <div className="flex justify-center mb-8">
              <div className="w-full max-w-lg">
                <AnimationLottie animationPath={plansAnimation} />
              </div>
            </div>

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
                        <strong>Delivery Time:</strong> {plan.deliveryTime}
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        <strong>Revisions:</strong> {plan.revisions}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActivePlan(plan);
                        setStep("details");
                      }}
                      className="mt-auto w-full bg-gradient-to-r from-[#7A5CFF] to-[#5D3BFE] hover:from-[#a18cff] hover:to-[#7f66ff] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            className="absolute inset-0 p-6 bg-[#1f1c46] text-white"
          >
            <h2 className="text-xl font-semibold mb-4">Customize Your Order</h2>
            <p className="text-lg mb-2">
              {activePlan.title} – <span className="text-[#7a5cff]">{activePlan.price}</span>
            </p>
            <textarea
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              className="w-full h-32 rounded-md p-3 bg-[#18153a] border border-[#333] text-sm"
              placeholder="Add details or custom notes..."
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("packages")}
                className="text-sm text-gray-400 hover:underline"
              >
                ← Back
              </button>
              <button
                onClick={() => handleCheckout(activePlan, modalInput)}
                className="bg-[#7A5CFF] hover:bg-[#9b84ff] text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[60vh]"
          >
            <AnimationLottie animationPath={processingAnimation} />
            <p className="text-white mt-4">Processing your invoice...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AboutSection;
