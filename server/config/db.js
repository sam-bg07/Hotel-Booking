import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URL);
    await mongoose.connect(`${process.env.MONGO_URL}/hotel-booking`);
    console.log("Connection string:", process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Connection string:", process.env.MONGO_URL);
    process.exit(1); // Exit the process with failure
  }
};
