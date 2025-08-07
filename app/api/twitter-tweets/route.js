// @flow strict
let cachedTweets = null;
let cacheTimestamp = 0;
let isFetching = false;
let pendingResolvers = [];
const CACHE_DURATION_MS = 1000 * 60 * 5; // 5 minutes

export async function GET() {
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  if (!BEARER_TOKEN) {
    return new Response(JSON.stringify({ error: "Bearer token not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const now = Date.now();

  // ✅ Serve from cache if valid
  if (cachedTweets && now - cacheTimestamp < CACHE_DURATION_MS) {
    return new Response(JSON.stringify(cachedTweets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Prevent duplicate fetches by queueing pending requests
  if (isFetching) {
    return new Promise((resolve) => {
      pendingResolvers.push(resolve);
    });
  }

  isFetching = true;

  try {
    const username = "devzahirjs";

    // 🔍 Step 1: Get user ID
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

    // 🔍 Step 2: Get tweets
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

    // ✅ Update cache
    cachedTweets = tweetsData.data || [];
    cacheTimestamp = now;

    const response = new Response(JSON.stringify(cachedTweets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // ✅ Resolve all waiting requests
    pendingResolvers.forEach((resolve) => resolve(response.clone()));
    pendingResolvers = [];

    return response;
  } catch (error) {
    console.error("[Twitter API]", error.message);

    // 🛡️ Fallback: Serve stale cache if available
    if (cachedTweets) {
      return new Response(JSON.stringify(cachedTweets), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "n/a" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    isFetching = false;
  }
}
