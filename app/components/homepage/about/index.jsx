// @flow strict
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import plansAnimation from "/public/lottie/code.json";
import { useRouter } from "next/navigation"; // ✅ Add this

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
  const router = useRouter(); // ✅ Add this
  const [step, setStep] = useState("packages");
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("fade-in-active", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".fade-in-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleContinue = () => {
    if (activePlan) {
      window.location.href = `/order-details?plan=${encodeURIComponent(
        activePlan.title
      )}&price=${encodeURIComponent(activePlan.price)}`;
    }
  };

  return (
<div className="min-h-screen py-12 px-6 max-w-7xl mx-auto bg-gray-50">
  <AnimatePresence mode="wait" initial={false}>
    {step === "packages" && (
      <motion.div
        key="packages"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
      >
        <h2
          id="packages"
          className="text-3xl font-extrabold text-gray-900 mb-10 flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v4a2 2 0 002 2h4m10 0h4v4a2 2 0 01-2 2h-4m-6 0H5v-4a2 2 0 012-2h4m4 0h4v-4a2 2 0 00-2-2h-4m-2 2v4"
            />
          </svg>
          <span className="uppercase tracking-wide text-indigo-600">Packages</span>
        </h2>

        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xl">
            <AnimationLottie animationPath={plansAnimation} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <GlowCard identifier={`plan-${plan.id}`}>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h3>
                  <p className="text-3xl font-extrabold text-indigo-600 mb-4">{plan.price}</p>
                  <p className="text-gray-600 mb-6 flex-grow">{plan.description}</p>

                  <ul className="mb-6 space-y-2 text-gray-700 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="text-gray-500 text-sm mb-6 space-y-1">
                    <p><strong>Delivery Time:</strong> {plan.deliveryTime}</p>
                    <p><strong>Revisions:</strong> {plan.revisions}</p>
                  </div>

                  <button
                    onClick={() => {
                      const query = new URLSearchParams({
                        plan: plan.title,
                        price: plan.price,
                        description: plan.description,
                        deliveryTime: plan.deliveryTime.toString(),
                      }).toString();
                      router.push(`/order-details?${query}`);
                    }}
                    className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-transform transform hover:scale-105 shadow-md"
                  >
                    Purchase →
                  </button>
                </div>
              </GlowCard>
            </div>
          ))}

          {/* Custom Project Card */}
          <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <GlowCard identifier="custom-plan">
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Project</h3>
                <p className="text-3xl font-extrabold text-indigo-600 mb-4">Starting at $800+</p>
                <p className="text-gray-600 mb-6 flex-grow">
                  Need something more advanced or tailored? Let&apos;s build your dream app, dashboard, bot, or automation.
                </p>
                <ul className="mb-6 space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Fully tailored to your needs
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Scalable & maintainable code
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ongoing support available
                  </li>
                </ul>

                <div className="text-gray-500 text-sm mb-6 space-y-1">
                  <p><strong>Delivery Time:</strong> Varies</p>
                  <p><strong>Revisions:</strong> Unlimited (in consultation)</p>
                </div>

                <button
                  onClick={() => router.push("https://devzahir.com/#contact")}
                  className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-transform transform hover:scale-105 shadow-md"
                >
                  Custom Inquiry →
                </button>
              </div>
            </GlowCard>
          </div>
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
            className="fixed inset-0 bg-[#1f1c46] p-6 rounded-xl text-white max-w-md mx-auto top-28 bottom-28 overflow-auto shadow-2xl z-50"
          >
            <h2 className="text-xl font-bold mb-2 text-center">{activePlan.title}</h2>
            <p className="text-[#7a5cff] text-center mb-6">{activePlan.price}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep("packages")}
                className="text-gray-400 hover:underline"
              >
                ← Back
              </button>
              <button
                onClick={handleContinue}
                className="bg-[#7A5CFF] hover:bg-[#9b84ff] text-white px-5 py-2 rounded-md transition-all font-medium"
              >
                Add Order Details →
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
