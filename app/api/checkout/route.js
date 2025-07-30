import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, price } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: title },
            unit_amount: parseInt(price.replace("$", "")) * 100, // convert $ to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://devzahir.com/success",
      cancel_url: "https://devzahir.com/cancel",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Stripe session creation failed." }),
      { status: 500 }
    );
  }
}
