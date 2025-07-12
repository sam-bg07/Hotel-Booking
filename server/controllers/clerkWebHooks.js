const User = require("../models/User");
const { Webhook } = require("svix");

const clerkWebhookSecret = async () => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // Assuming you want to return the webhook secret for further use
    const headers = {
      "svix-id": req.headers["svix-id"], // Replace with your actual webhook ID
      "svix-timestamp": req.headers["svix-timestamp"], // Replace with your actual webhook timestamp
      "svix-signature": req.headers["svix-signature"], // Replace with your actual webhook signature
    };
    await webhook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      username: data.username,
      email: data.email_addresses[0].email_address,
      image: data.profile_image_url,
    };

    const user = new User(userData);

    if (type === "user.created") {
      // Create a new user in your database
      await user.save();
    } else if (type === "user.updated") {
      // Update an existing user in your database
      await User.findByIdAndUpdate(data.id, userData, { new: true });
    } else if (type === "user.deleted") {
      // Delete the user from your database
      await User.findByIdAndDelete(data.id);
    }
    res.JSON({ message: "Webhook processed successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching Clerk webhook secret:", error);
    res
      .status(500)
      .json({ message: "Error processing webhook", error: error.message });
  }
};

module.exports = clerkWebhookSecret;
