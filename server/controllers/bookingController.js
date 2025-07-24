import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../config/nodeMailer.js";
import stripe from "stripe";

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
    console.error("Error checking room availability:", error);
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
    const { room, checkInDate, checkOutDate, totalPrice, guests } = req.body;
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
    let totalAmount = roomData.price;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
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
    const mailOptions = {
      from: "samarthgabani2005@gmail.com",
      to: req.user.email,
      subject: "Booking Confirmation",
      html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${req.user.firstName} ${req.user.lastName},</p>
      <p>Your booking has been confirmed!</p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Hotel:</strong> ${
          roomData.hotel?.hotelName || "Hotel Name"
        }</li>
        <li><strong>Location:</strong> ${
          roomData.hotel?.address || "Hotel Address"
        }</li>
        <li><strong>Check-in Date:</strong> ${checkIn.toDateString()}</li>
        <li><strong>Check-out Date:</strong> ${checkOut.toDateString()}</li>
        <li><strong>Amount:</strong> $${totalAmount}</li>
      </ul>
      <p>Need help? Contact us at support@yourdomain.com</p>
      <p>Thank you for choosing our service!</p>
      <p>The Hotel Booking Team</p>
    `,
    };
    // console.log(mailOptions);
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email send failed:", error); // 🔥 this will show SMTP error
      } else {
        console.log("Email sent:", info.response); // ✅ shows 250 OK if successful
      }
    });

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
      isAvailable: true,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, isAvailable: false });
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
    // if (totalBookings === 0) {
    //   return res.json({
    //     success: false,
    //     message: "No bookings found for this hotel",
    //   });
    // }
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

export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    console.log("Booking ID:", bookingId);
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room);
    if (!booking || !roomData) {
      return res.json({ success: false, message: "Booking or room not found" });
    }
    const totalAmount = booking.totalPrice;
    console.log("Total Amount:", totalAmount);
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
