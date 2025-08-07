// app/api/twitter-tweets.js
import axios from "axios";

export async function GET() {
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  if (!BEARER_TOKEN) {
    return new Response(JSON.stringify({ error: "Bearer token not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const username = "devzahirx3";

    // Get user ID from username
    const userRes = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      }
    );
    const userId = userRes.data.data.id;

    // Get recent tweets from user ID
    const tweetsRes = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      }
    );

    return new Response(JSON.stringify(tweetsRes.data.data || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch tweets" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
