// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const plans = [
  {
    id: 1,
    title: "🚀 Starter Website or Bot Plan",
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
  },
  {
    id: 2,
    title: "🌐 Dynamic Multi-Page Website",
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
  },
  {
    id: 3,
    title: "💎 Premium: Functional E-Commerce Website",
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
  },
];

function AboutSection() {
  return (
    <div>
      {/* Plans Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-[#16f2b3] uppercase mb-8">
          Packages
        </h2>
        <div className="relative">
          {/* Container for Plans */}
          <div className="overflow-x-auto px-4">
            <div className="flex space-x-8 animate-scroll-infinite scroll-smooth">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="max-w-[320px] w-full bg-[#1a1443] text-white p-6 rounded-lg shadow-lg flex-shrink-0 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                  {/* Emphasizing Price */}
                  <p className="text-2xl font-bold mb-4 text-[#16f2b3] hover:text-[#12d9f7] transition-colors duration-300">
                    {plan.price}
                  </p>
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
                  <a
                    href="https://devzahir.com/#contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 px-6 py-3 text-center text-white font-medium bg-gradient-to-r from-[#16f2b3] via-[#12d9f7] to-[#16f2b3] rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:from-[#12d9f7] hover:via-[#16f2b3] hover:to-[#12d9f7] animate-pulse"
                  >
                    Contact Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="my-12 lg:my-16 relative">
        <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
          <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
            ABOUT ME
          </span>
          <span className="h-36 w-[2px] bg-[#1a1443]"></span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
              Who I am?
            </p>
            <p className="text-gray-200 text-sm lg:text-lg">
              {personalData.description}
            </p>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="Abu Said"
              className="rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
