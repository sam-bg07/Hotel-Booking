import stripe from "stripe";
import Booking from "../models/Booking.js";

// api to handle stripe payment

export const stripeWebhook = async (req, res) => {
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook event received:", event.type);
  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // ✅ Use "checkout.session.completed"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    console.log("Booking ID from session metadata:", bookingId);

    if (!bookingId) {
      console.error("No bookingId found in session metadata");
      return res.status(400).json({ success: false, message: "No bookingId" });
    }

    try {
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });

      console.log("Booking updated as paid:", bookingId);
    } catch (err) {
      console.error("Failed to update booking:", err.message);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
