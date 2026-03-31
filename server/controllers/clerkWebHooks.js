import logger from "../config/logger.js";
import User from "../models/User.js";

import { Webhook } from "svix";
import dotenv from "dotenv";
dotenv.config();

export const clerkWebhookSecret = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = await webhook.verify(JSON.stringify(req.body), headers);

    const { data, type } = payload;

    // logger.info("Webhook event received:", type);

    if (type === "user.created") {
      const user = new User({
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        username: data.username || "",
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        image: data.image_url || "",
        roles: data.roles?.includes("admin") ? "admin" : "user",
      });

      await user.save();
      // logger.info("User created:", user);
    } else if (type === "user.updated") {
      await User.findByIdAndUpdate(
        data.id,
        {
          email: data.email_addresses?.[0]?.email_address || "",
          username: data.username || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          image: data.image_url || "",
          roles: data.roles?.includes("admin") ? "admin" : "user",
        },
        { new: true }
      );
      // logger.info("User updated:", data.id);
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      // logger.info("User deleted:", data.id);
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    logger.error("Error processing Clerk webhook:", error.message);
    res.status(500).json({
      message: "Error processing webhook",
      error: error.message,
    });
  }
};

export default clerkWebhookSecret;
