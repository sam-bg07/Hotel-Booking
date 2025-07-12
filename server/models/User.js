const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // This will store Clerk's user ID (e.g., user_abc123)
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false, // Optional: not always set in Clerk
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    roles: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // Default role is 'user'
    },
  },
  { timestamps: true }
);

// For serverless or reloading environments (like Vercel)
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
