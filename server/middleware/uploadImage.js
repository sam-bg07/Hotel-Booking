// middleware/uploadImage.js
import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // store file buffer in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
  },
});
