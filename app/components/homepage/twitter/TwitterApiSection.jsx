"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiTwitter } from "react-icons/si";

type Tweet = {
  id: string;
  text: string;
  created_at: string;
};

export default function RecentTweets() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Your Twitter username
  const username = "devzahirx3";

  // Twitter API URLs
  const userByUsernameUrl = `https://api.twitter.com/2/users/by/username/${username}`;
  // You can adjust tweet fields & expansions as needed
  const tweetsUrl = (userId: string) =>
    `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`;

  useEffect(() => {
    async function fetchTweets() {
      try {
        setLoading(true);
        setError(null);

        const bearerToken = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
        if (!bearerToken) {
          setError("Twitter API token not found. Please set it in environment variables.");
          setLoading(false);
          return;
        }

        // 1. Get user ID by username
        const userRes = await fetch(userByUsernameUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const userData = await userRes.json();

        if (!userData.data?.id) throw new Error("User ID not found");

        // 2. Get recent tweets by user ID
        const tweetsRes = await fetch(tweetsUrl(userData.data.id), {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (!tweetsRes.ok) throw new Error("Failed to fetch tweets");
        const tweetsData = await tweetsRes.json();

        setTweets(tweetsData.data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchTweets();
  }, []);

  return (
    <section className="mt-20 px-6 md:px-0 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-[#0e0c2b]/70 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full border border-white/20">
            <SiTwitter size={18} color="#1DA1F2" />
          </div>
          <h2 className="text-lg font-bold text-white">Recent Tweets - @{username}</h2>
        </div>

        {loading && <p className="text-gray-400">Loading tweets...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && tweets.length === 0 && (
          <p className="text-gray-400">No tweets found.</p>
        )}

        <ul className="space-y-4 text-gray-300 text-sm">
          {tweets.map(({ id, text, created_at }) => (
            <li key={id} className="border border-[#25213b] rounded-lg p-4 hover:bg-[#25213b] transition">
              <p>{text}</p>
              <a
                href={`https://twitter.com/${username}/status/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DA1F2] mt-2 inline-block text-xs"
              >
                View on Twitter &rarr;
              </a>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
