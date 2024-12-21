// @flow strict
"use client";

import { useEffect } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

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
  useEffect(() => {
    const cards = document.querySelectorAll(".fade-in-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    // Cleanup the observer on component unmount
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <>
      {/* Plans Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-[#16f2b3] uppercase mb-8 flex items-center">
          <i className="fas fa-box-open mr-3"></i> Packages
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="fade-in-card bg-[#1a1443] text-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
              <p className="text-lg font-semibold mb-4">{plan.price}</p>
              <p className="text-sm mb-4">{plan.description}</p>
              <ul className="list-disc ml-5 mb-4 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="text-sm mb-2">
                <strong>Delivery Time:</strong> {plan.deliveryTime}
              </p>
              <p className="text-sm mb-4">
                <strong>Revisions:</strong> {plan.revisions}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Gradient Purchase Button */}
        <div className="flex justify-center mt-8">
          <a
            href="#contact"
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:scale-100"
          >
            Purchase Now
          </a>
        </div>
      </div>
    </>
  );
}

export default AboutSection;
