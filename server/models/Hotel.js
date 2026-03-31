// models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    owner: {
      type: String, // Assuming owner is a user ID
      required: true,
      ref: "User", // Reference to User model
    },
  },
  { timestamps: true }, // adds createdAt and updatedAt
);

// Indexes
hotelSchema.index({ owner: 1 });

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
