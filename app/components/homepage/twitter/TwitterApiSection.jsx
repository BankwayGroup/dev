// @flow strict
"use client";

import { motion } from "framer-motion";
import { SiTwitter } from "react-icons/si";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TwitterApiSection() {
  return (
    <section className="mt-20 px-6 md:px-0 max-w-3xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#0e0c2b]/70 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full border border-white/20">
            <SiTwitter size={18} color="#1DA1F2" />
          </div>
          <h2 className="text-lg font-bold text-white">Twitter / X API v2</h2>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-sm mb-4"
        >
          You can fetch <strong className="text-white">tweets</strong>,{" "}
          <strong className="text-white">user profiles</strong>,{" "}
          <strong className="text-white">timelines</strong>,{" "}
          <strong className="text-white">likes</strong>, and more using the official X (formerly Twitter) API.
        </motion.p>

        <motion.ul
          variants={containerVariants}
          className="text-sm text-gray-400 list-disc pl-6 space-y-1 mb-4"
        >
          <motion.li variants={itemVariants}>
            Requires an account with{" "}
            <Link
              href="https://developer.x.com/devzahirx3"
              target="_blank"
              className="text-[#1DA1F2] hover:underline"
            >
              @devzahirx3
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            Free Tier: Only allows access to recent tweets from your own account
          </motion.li>
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="text-xs text-gray-500 italic"
        >
          Perfect for integrating your own tweets or timeline into your portfolio or dashboard.
        </motion.div>
      </motion.div>
    </section>
  );
}
