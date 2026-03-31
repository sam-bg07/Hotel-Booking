import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    hotel: {
      type: String,
      ref: "Hotel",
      required: true,
    },
    room: {
      type: String,
      ref: "Room",
      required: true,
    },
    coupon: {
      type: String,
      ref: "Coupon",
      required: false,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    isdiscounted: {
      type: Boolean,
      default: false,
    },
    guests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      default: "Cash (At Hotel)",
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Indexes to speed up queries
BookingSchema.index({ user: 1 });
BookingSchema.index({ hotel: 1 });
BookingSchema.index({ room: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ checkInDate: 1, checkOutDate: 1 });

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
