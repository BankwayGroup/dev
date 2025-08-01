// @flow strict
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import plansAnimation from "/public/lottie/code.json";

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
  const [step, setStep] = useState("packages"); // 'packages' | 'details' | 'processing'
  const [activePlan, setActivePlan] = useState(null);
  const [orderDetails, setOrderDetails] = useState("");

  // IntersectionObserver for fade-in cards (keep as you had it)
  useEffect(() => {
    const cards = document.querySelectorAll(".fade-in-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
          } else {
            entry.target.classList.remove("fade-in-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const handleCheckout = async () => {
    try {
      setStep("processing");
      const response = await axios.post("/api/checkout", {
        title: activePlan.title,
        price: activePlan.price,
        orderDetails,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was an error creating the Stripe checkout session.");
      setStep("details");
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <AnimatePresence mode="wait" initial={false}>
        {/* Packages List View */}
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

            {/* Lottie Animation */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-lg">
                <AnimationLottie animationPath={plansAnimation} />
              </div>
            </div>

            {/* Plans Grid */}
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
                        setOrderDetails("");
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

        {/* Details + Checkout View */}
        {step === "details" && activePlan && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#1f1c46] p-8 rounded-xl text-white max-w-3xl mx-auto left-0 right-0 top-20 bottom-20 overflow-auto"
            style={{ margin: "auto" }}
          >
            <h2 className="text-3xl font-bold mb-4">{activePlan.title}</h2>
            <p className="text-xl text-[#7a5cff] font-semibold mb-6">{activePlan.price}</p>
            <p className="mb-6 text-gray-300">{activePlan.description}</p>

            <ul className="list-disc list-inside text-gray-400 mb-6 space-y-1">
              {activePlan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <label htmlFor="order-details" className="block mb-2 font-semibold text-gray-400">
              Additional Order Details (optional):
            </label>
            <textarea
              id="order-details"
              rows={5}
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              placeholder="Add any custom instructions or requirements here..."
              className="w-full rounded-md p-3 bg-[#18153a] border border-[#333] text-white resize-none mb-6"
            />

            <div className="flex justify-between">
<button
  onClick={() => {
    if (window.location.href === "https://devzahir.com/#packages") {
      // Do nothing or maybe scroll?
    } else {
      window.location.href = "https://devzahir.com/#packages";
    }
  }}
  className="text-gray-400 hover:underline"
>
  ← Back
</button>


              <button
                onClick={handleCheckout}
                className="bg-[#7A5CFF] hover:bg-[#9b84ff] px-6 py-3 rounded-md font-semibold shadow-md transition-transform hover:scale-105"
              >
                Continue to Checkout →
              </button>
            </div>
          </motion.div>
        )}

        {/* Processing Spinner View */}
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
