// app/api/twitter-tweets/route.js

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

    // Step 1: Get user ID from username
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

    // Step 2: Get tweets from user ID
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

    return new Response(JSON.stringify(tweetsData.data || []), {
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
