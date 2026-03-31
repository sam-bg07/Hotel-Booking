import logger from "../config/logger.js";
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
  } catch (error) {
    logger.error("Webhook signature error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // ✅ Use "checkout.session.completed"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      logger.error("No bookingId found in session metadata");
      return res.status(400).json({ success: false, message: "No bookingId" });
    }

    try {
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });
    } catch (err) {
      logger.error("Failed to update booking:", err.message);
    }
  } else {
    logger.info(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
