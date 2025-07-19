import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/hotel-booking`, {
      serverSelectionTimeoutMS: 10000,
    });
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
export default connectDB;
