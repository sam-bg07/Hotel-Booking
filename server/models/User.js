import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Clerk user ID
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    roles: {
      type: String,
      enum: ["admin", "user", "hotelOwner"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
