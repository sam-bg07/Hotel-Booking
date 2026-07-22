import logger from "../config/logger.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import transporter from "../config/nodeMailer.js";
import stripe from "stripe";
import Coupon from "../models/Coupon.js";
import { dispatchBookingEmail } from "../services/emailService.js";

const checkAvailability = async ({ room, checkInDate, checkOutDate }) => {
  try {
    const existingBooking = await Booking.findOne({
      room: room,
      $or: [
        { checkInDate: { $lte: checkOutDate, $gte: checkInDate } },
        { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } },
      ],
    });
    const isAvailable = !existingBooking;
    return isAvailable;
  } catch (error) {
    logger.error("Error checking room availability:", error);
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    if (isAvailable) {
      res.json({
        success: true,
        message: "Room is available",
        isAvailable: true,
      });
    } else {
      res.json({
        success: false,
        message: "Room is not available",
        isAvailable: false,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to create booking
export const createBooking = async (req, res) => {
  try {
    const {
      room,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests,
      coupon: couponId,
    } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Room is not available",
        isAvailable: false,
      });
    }
    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.json({
        success: false,
        message: "Room not found",
        isAvailable: false,
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiffernce = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiffernce / (1000 * 3600 * 24));

    const totalAmount = roomData.price * nights;
    logger.info("Total amount calculation:", { price: roomData.price, nights, totalAmount });
    
    let finalAmount = totalAmount;
    let appliedCouponId = null;
    let isDiscounted = false;

    // Use coupon data if validated by middleware
    if (req.couponData) {
      const coupon = req.couponData;
      
      // Additional safety check for minimum amount and expiry
      const isStillValid = new Date() <= new Date(coupon.validUntil) && 
                          (!coupon.minimumOrderAmount || totalAmount >= coupon.minimumOrderAmount);

      if (isStillValid) {
        const discount = (totalAmount * coupon.discountValue) / 100;
        finalAmount = totalAmount - discount;
        appliedCouponId = coupon._id;
        isDiscounted = true;
        
        // Increment redemption count
        await Coupon.findByIdAndUpdate(coupon._id, { $inc: { redeemedCount: 1 } });
        logger.info("Coupon applied during creation:", { code: coupon.couponCode, discount });
      } else {
        logger.warn("Coupon failed final validation", { code: coupon.couponCode });
      }
    }

    const booking = await Booking.create({
      user: req.user._id,
      hotel: roomData.hotel,
      room: room,
      coupon: appliedCouponId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      originalPrice: totalAmount,
      discountedPrice: isDiscounted ? finalAmount : undefined,
      isdiscounted: isDiscounted,
      guests: +guests,
      paymentMethod: "Cash",
      isPaid: false,
    });

    const roomData1 = await Room.findById(room).populate("hotel");

    // Fire-and-forget: offload email dispatch to background
    dispatchBookingEmail(
      req.user,
      booking,
      roomData1,
      finalAmount, // Pass the final amount (discounted or not)
      checkIn,
      checkOut,
    );

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    logger.error("Error creating booking:", error);
    res.json({ success: false, message: error.message });
  }
};

//api to GET all bookings by user
export const getAllBookingsByUser = async (req, res) => {
  try {
    const userID = req.user._id;

    // Pagination basics
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalBookings = await Booking.countDocuments({ user: userID });
    
    const bookings = await Booking.find({ user: userID })
      .populate([
        { path: "room" },
        { path: "hotel" },
        { path: "user" },
        { path: "coupon" },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ 
      success: true, 
      bookings, 
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: page 
    });
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

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalBookings = await Booking.countDocuments({ hotel: hotel._id });

    // Execute paginated query
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate([{ path: "room" }, { path: "user" }, { path: "hotel" }])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate total revenue at DB level to prevent memory bloat
    const revenueAggregation = await Booking.aggregate([
      { $match: { hotel: hotel._id } },
      { $group: { _id: null, totalRevenue: { $sum: "$originalPrice" } } },
    ]);
    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    res.json({
      success: true,
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings,
        currentPage: page,
        totalPages: Math.ceil(totalBookings / limit),
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const stripePayment = async (req, res) => {
  try {
    const { bookingId, finalPrice } = req.body;
    // logger.info("Booking ID:", bookingId);
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room);
    if (!booking || !roomData) {
      return res.json({ success: false, message: "Booking or room not found" });
    }
    // Use finalPrice if provided, otherwise use original booking price
    const totalAmount =
      finalPrice !== undefined && finalPrice !== null
        ? finalPrice
        : booking.totalPrice;
    // logger.info("Total Amount:", totalAmount);
    const { origin } = req.headers;

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: roomData.hotel.hotelName || "Hotel Name",
          },
          unit_amount: totalAmount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",

      success_url: `${origin}/loader/my-booking`,
      cancel_url: `${origin}/my-booking`,
      metadata: {
        bookingId,
      },
    });

    // Remove premature update of booking status here
    // booking.isPaid = true;
    // booking.paymentMethod = "Stripe";
    // await booking.save();

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
