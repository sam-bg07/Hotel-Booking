import logger from "./logger.js";
import mongoose from "mongoose";
import cron from "node-cron";
import Coupon from "../models/Coupon.js"; // Adjust the import path as necessary

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/hotel-booking`, {
      serverSelectionTimeoutMS: 10000,
    });
    mongoose.connection.on("connected", () =>
      logger.info("Database connected")
    );
    logger.info("MongoDB connected successfully");

    cron.schedule("0 0 * * *", async () => {
      const now = new Date();
      await Coupon.updateMany(
        {
          isActive: true,
          $or: [
            { validUntil: { $lt: now } },
            { $expr: { $gte: ["$redeemedCount", "$usageLimit"] } },
          ],
        },
        { $set: { isActive: false } }
      );
      logger.info("Coupon status updated (via cron job)");
    });
  } catch (error) {
    logger.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
export default connectDB;
