import Booking from "../models/Booking.js";
import Coupon from "../models/Coupon.js";
import Hotel from "../models/Hotel.js";

export const createCoupon = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const hotel = await Hotel.findOne({ owner: userId });
    const hotelId = hotel._id;
    const coupon = await Coupon.create({ hotel: hotelId, ...req.body });
    res.json({ success: true, message: "Coupon created successfully", coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const validateCoupon = async (req, res, next) => {
  const couponCod = req.body.coupon;

  if (!couponCod) {
    // No coupon provided, skip validation
    console.log("No coupon provided, skipping validation");
  }

  try {
    console.log("Validating coupon with request body:", req.body);
    let couponCode, bookingId;

    // If both fields exist, destructure them
    if (req.body.couponCode && req.body.bookingId) {
      ({ couponCode, bookingId } = req.body);
    }

    // If `req.body.coupon` exists, override `couponCode`
    console.log("req.body.coupon:", req.body.coupon);
    if (req.body.coupon) {
      const coupon = req.body.coupon;
      console.log("Validating coupon:", coupon);
      const couponCod = await Coupon.findById(coupon);
      couponCode = couponCod.couponCode;
    }

    console.log("Validating coupon code:", couponCode, bookingId);
    const coupon = await Coupon.find({ couponCode, isActive: true })
      .populate("hotel")
      .exec();
    console.log("Coupon found:", coupon);
    if (coupon.length > 0) {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        // const roomData = await Room.findById(room);
        // if (!roomData) {
        //   return res.json({
        //     success: false,
        //     message: "Room not found",
        //     isAvailable: false,
        //   });
        // }

        // await Booking.create({
        //   user: req.user._id,
        //   hotel: roomData.hotel,
        //   room: room,
        //   coupon,
        //   checkInDate: checkIn,
        //   checkOutDate: checkOut,
        //   originalPrice: totalAmount,
        //   guests: +guests,
        //   paymentMethod: "Cash",
        //   isPaid: false,
        // });
        return next();
        // console.log("Booking not found");
        // return res.json({
        //   success: false,
        //   message: "Booking not found",
        // });
      }

      const originalPrice = booking.originalPrice;
      const discountedPrice =
        originalPrice - (originalPrice * coupon[0].discountValue) / 100;
      console.log("Discounted price:", discountedPrice);

      // Update the booking with discounted price
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { $set: { discountedPrice, isdiscounted: true } },
        { new: true } // Return the updated document
      );

      const updatedCoupon = await Coupon.findByIdAndUpdate(
        coupon[0]._id,
        { $set: { redeemedCount: coupon[0].redeemedCount + 1 } },
        { new: true } // Return the updated document
      );

      return res.json({
        success: true,
        message: "Coupon applied successfully",
        coupon: coupon[0],
        booking: updatedBooking,
      });
    }

    if (!coupon || coupon.length === 0) {
      console.log("Coupon not found or inactive");
      // If coupon is invalid, ensure booking is not marked as discounted
      const booking = await Booking.findById(bookingId);
      if (booking) {
        await Booking.findByIdAndUpdate(bookingId, {
          $set: { isdiscounted: false },
        });
      }
      return res.json({
        success: false,
        message: "Coupon not found or inactive",
      });
    }
  } catch (error) {
    console.error("Error validating coupon:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).populate("hotel").exec();
    res.json({
      success: true,
      message: "Coupons fetched successfully",
      coupons,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId).populate("hotel").exec();
    res.json({ success: true, message: "Coupon fetched successfully", coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findByIdAndDelete(couponId);
    res.json({ success: true, message: "Coupon deleted successfully", coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updatecoupon = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, {
      new: true,
    });
    res.json({ success: true, message: "Coupon updated successfully", coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const get3Coupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({})
      .limit(3)
      .populate("hotel")
      .sort({ discountValue: 1 });
    res.json({
      success: true,
      message: "3 Coupons fetched successfully",
      coupons,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
