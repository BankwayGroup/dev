let cachedTweets = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 1000 * 60 * 5; // 5 minutes cache

export async function GET() {
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  if (!BEARER_TOKEN) {
    return new Response(JSON.stringify({ error: "Bearer token not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const now = Date.now();

  // Return cached data if not expired
  if (cachedTweets && now - cacheTimestamp < CACHE_DURATION_MS) {
    return new Response(JSON.stringify(cachedTweets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const username = "devzahirjs";

    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!userRes.ok) {
      const error = await userRes.json();
      throw new Error(error.title || "Failed to get user");
    }

    const userData = await userRes.json();
    const userId = userData.data.id;

    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!tweetsRes.ok) {
      const error = await tweetsRes.json();
      throw new Error(error.title || "Failed to fetch tweets");
    }

    const tweetsData = await tweetsRes.json();

    // Cache the tweets and update timestamp
    cachedTweets = tweetsData.data || [];
    cacheTimestamp = now;

    return new Response(JSON.stringify(cachedTweets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Twitter API]", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch tweets" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
