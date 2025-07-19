import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URL);
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGO_URL}/hotel-booking`, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connection string:", process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Connection string:", process.env.MONGO_URL);
    process.exit(1); // Exit the process with failure
  }
};
export default connectDB;
