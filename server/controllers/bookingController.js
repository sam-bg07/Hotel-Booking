import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

const checkAvailability = async ({ room, checkInDate, checkOutData }) => {
  try {
    const existingBooking = await Booking.findOne({
      room: room,
      $or: [
        { checkInDate: { $lte: checkOutData, $gte: checkInDate } },
        { checkOutDate: { $gte: checkInDate, $lte: checkOutData } },
      ],
    });
    const isAvailable = existingBooking.length === 0;
    return isAvailable;
  } catch (error) {
    console.error("Error checking room availability:", error);
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutData } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutData,
    });
    if (isAvailable) {
      res.json({ success: true, message: "Room is available" });
    } else {
      res.json({ success: false, message: "Room is not available" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to create booking
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutData, totalPrice, guests } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutData,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }
    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }
    let totalAmount = roomData.price;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutData);
    const timeDiffernce = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiffernce / (1000 * 3600 * 24));

    totalAmount = totalAmount * nights;
    const booking = await Booking.create({
      user: req.user._id,
      hotel: roomData.hotel,
      room: room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: totalAmount,
      guests: +guests,
      paymentMethod: "Cash",
      isPaid: false,
    });
    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to GET all bookings by user
export const getAllBookingsByUser = async (req, res) => {
  try {
    const userID = req.user._id;
    const bookings = await Booking.find({ user: userID })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to GET all bookings by hotel
export const getAllBookingsByHotel = async (req, res) => {
  try {
    const hotelID = req.user._id;
    const hotel = await Hotel.findOne({ owner: hotelID });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room")
      .populate("user")
      .populate("hotel")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    if (totalBookings === 0) {
      return res.json({
        success: false,
        message: "No bookings found for this hotel",
      });
    }
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
