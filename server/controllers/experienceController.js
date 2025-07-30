import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

export const createExperienceBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    console.log("Creating experience booking for bookingId:", bookingId);
    // 1. Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }
    console.log("Valid bookingId:", bookingId);

    // 2. Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(403).json({
        message: "You must have a valid hotel booking to book an experience.",
        success: false,
      });
    }
    console.log("Booking exists:", booking);

    // 3. Prevent duplicate experience bookings
    const alreadyBooked = await Experience.findOne({ bookingId: bookingId });
    if (alreadyBooked) {
      return res.status(409).json({
        message: "Experience already booked for this stay.",
        success: false,
      });
    }
    console.log("No duplicate experience booking found");

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

export const getExperienceBookings = async (req, res) => {
  try {
    const experienceBookings = await Experience.find()
      .populate({
        path: "bookingId",
        populate: [{ path: "hotel" }, { path: "user" }],
      })
      .sort({ rating: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      experienceBookings,
    });
  } catch (error) {
    console.error("Error fetching experience bookings:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
