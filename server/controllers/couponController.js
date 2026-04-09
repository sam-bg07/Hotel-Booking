import logger from "../config/logger.js";
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
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "This coupon code already exists. Please use a unique code.",
      });
    }
    logger.error("Error creating coupon:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const {
      couponCode: bodyCouponCode,
      bookingId,
      coupon: couponIdInBody,
      room: roomId,
      checkInDate,
      checkOutDate,
    } = req.body;
    let couponCode = bodyCouponCode;

    // Handle initial selection from landing page where ID is passed as 'coupon'
    if (couponIdInBody && !couponCode) {
      const couponFromId = await Coupon.findById(couponIdInBody);
      if (couponFromId) couponCode = couponFromId.couponCode;
    }

    if (!couponCode) {
      return next();
    }

    logger.info("Validating coupon code:", couponCode);
    const coupon = await Coupon.findOne({
      couponCode,
      isActive: true,
    }).populate("hotel");

    if (!coupon) {
      return res.json({
        success: false,
        message: "Invalid or inactive coupon",
      });
    }

    // Basic Validation: Expiry and Minimum Amount
    if (new Date() > new Date(coupon.validUntil)) {
      return res.json({ success: false, message: "Coupon has expired" });
    }

    if (coupon.usageLimit && coupon.redeemedCount >= coupon.usageLimit) {
      return res.json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    // --- CASE 1: MANUAL APPLY (Post-Booking) ---
    if (bookingId) {
      const booking = await Booking.findById(bookingId);
      if (!booking)
        return res.json({ success: false, message: "Booking not found" });

      if (
        coupon.minimumOrderAmount &&
        booking.originalPrice < coupon.minimumOrderAmount
      ) {
        return res.json({
          success: false,
          message: `Minimum amount of ${coupon.minimumOrderAmount} required`,
        });
      }

      const discountedPrice =
        booking.originalPrice -
        (booking.originalPrice * coupon.discountValue) / 100;

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { $set: { discountedPrice, isdiscounted: true, coupon: coupon._id } },
        { new: true },
      );

      await Coupon.findByIdAndUpdate(coupon._id, {
        $inc: { redeemedCount: 1 },
      });

      return res.json({
        success: true,
        message: "Coupon applied successfully",
        coupon,
        booking: updatedBooking,
      });
    }

    // --- CASE 2: AUTO-APPLY (Pre-Booking Migration) ---
    // If it's a creation request, we attach the coupon data to req for the controller
    if (roomId && checkInDate && checkOutDate) {
      req.couponData = coupon;
      return next();
    }

    // If it's neither, we just confirm validity (for validation checks)
    return res.json({ success: true, message: "Coupon is valid", coupon });
  } catch (error) {
    logger.error("Error validating coupon:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const coupons = await Coupon.find({})
      .populate("hotel")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCoupons = await Coupon.countDocuments();

    res.json({
      success: true,
      message: "Coupons fetched successfully",
      coupons,
      page,
      totalPages: Math.ceil(totalCoupons / limit),
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
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "This coupon code already exists. Please use a unique code.",
      });
    }
    logger.error("Error updating coupon:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const get3Coupons = async (req, res) => {
  try {
    const now = new Date();

    const coupons = await Coupon.find({
      isActive: true,
      validFrom: { $lte: now }, // Must have started
      validUntil: { $gte: now }, // Must not be expired
      $expr: { $lt: ["$redeemedCount", "$usageLimit"] }, // Usage limit not reached
    })
      .sort({
        discountValue: -1, // Biggest discount first
        validUntil: 1, // Then, those expiring soonest (urgency factor)
      })
      .limit(3)
      .populate("hotel");

    res.json({
      success: true,
      message:
        coupons.length > 0
          ? "Featured coupons fetched"
          : "No active coupons found",
      coupons,
    });
  } catch (error) {
    logger.error("Error in get3Coupons:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
