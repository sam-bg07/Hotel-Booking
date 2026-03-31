import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    hotel: {
      type: String,
      ref: "Hotel",
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    minimumOrderAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    redeemedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Indexes
CouponSchema.index({ hotel: 1 });

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
