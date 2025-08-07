// /pages/api/twitter-tweets.js
import axios from "axios";

export default async function handler(req, res) {
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

  if (!BEARER_TOKEN) {
    return res.status(500).json({ error: "Bearer token not set" });
  }

  try {
    const username = "devzahirx3";

    // Get user ID
    const userRes = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    const userId = userRes.data.data.id;

    // Get recent tweets
    const tweetsRes = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    res.status(200).json(tweetsRes.data.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
