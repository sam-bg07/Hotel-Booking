import logger from "./logger.js";
import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    logger.info("✅ Connected to Cloudinary successfully");
  } catch (error) {
    logger.error("❌ Error configuring Cloudinary:", error);
  }
};
