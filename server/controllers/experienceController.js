import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

export const createExperienceBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // 1. Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // 2. Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(403).json({
        message: "You must have a valid hotel booking to book an experience.",
        success: false,
      });
    }

    // 3. Prevent duplicate experience bookings
    const alreadyBooked = await Experience.findOne({ booking: bookingId });
    if (alreadyBooked) {
      return res.status(409).json({
        message: "Experience already booked for this stay.",
        success: false,
      });
    }

    // 4. Create the experience
    const experienceBooking = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: "Your Experience Recorded",
      experienceBooking,
    });
  } catch (error) {
    console.error("Error creating experience booking:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
