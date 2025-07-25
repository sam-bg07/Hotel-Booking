import mongoose from "mongoose";

const experienceBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      ref: "Booking",
      required: true,
    },
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    phone: { type: String, required: true },
    experience: {
      type: String,
      required: true,
      enum: [
        "sunset-trek",
        "luxury-spa",
        "culinary-journey",
        "cultural-workshop",
        "family-adventure",
      ],
    },
    date: { type: Date, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    specialRequests: { type: String },
    feedback: { type: String, required: true },
    agreeToTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceBookingSchema);
export default Experience;
