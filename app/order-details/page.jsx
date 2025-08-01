// @flow strict
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: 1,
    title: "Starter Website or Bot",
    price: "$80",
    description:
      "A basic bot with essential features OR a simple 1-page static website tailored to your needs!",
    deliveryTime: 3,
  },
  {
    id: 2,
    title: "Multi-Page Website or Bot",
    price: "$165",
    description:
      "Get a multi-page responsive website with dynamic features and user-friendly navigation.",
    deliveryTime: 5,
  },
  {
    id: 3,
    title: "E-Commerce Website or Bot",
    price: "$425",
    description:
      "Get a fully functional e-commerce website or an advanced site with backend integration.",
    deliveryTime: 10,
  },
];

export default function AboutSection() {
  const router = useRouter();

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

  const handleNavigate = (plan) => {
    const query = new URLSearchParams({
      plan: plan.title,
      price: plan.price,
      description: plan.description,
      deliveryTime: plan.deliveryTime.toString(),
    }).toString();
    router.push(`/order-details?${query}`);
  };

  return (
    <div id="packages" className="relative min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <motion.div
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
            <div
              key={plan.id}
              className="fade-in-card h-full flex flex-col justify-between rounded-2xl border border-[#2c2b55] bg-gradient-to-br from-[#18153a] to-[#1f1c46] p-6 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-lg font-semibold text-[#7a5cff] mb-4">{plan.price}</p>
                <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                <p className="text-sm text-gray-400">
                  <strong>Delivery Time:</strong> {plan.deliveryTime} days
                </p>
              </div>
              <button
                onClick={() => handleNavigate(plan)}
                className="mt-auto w-full bg-gradient-to-r from-[#7A5CFF] to-[#5D3BFE] hover:from-[#a18cff] hover:to-[#7f66ff] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Purchase →
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
