// models/Hotel.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: String,
      ref: "Hotel",
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    facilities: {
      type: [String], // Array of strings for facilities
      required: true,
    },
    images: {
      type: [String], // Array of strings for image URLs
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true, // Default availability status
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
