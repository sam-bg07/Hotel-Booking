import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { createRoom } from "../controllers/roomController.js";
import {
  getAllRooms,
  getAllRoomsByHotel,
  toggleRoomAvailability,
  getRoomById,
} from "../controllers/roomController.js";
import { upload } from "../middleware/uploadImage.js";
const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), authMiddle, createRoom);
roomRouter.get("/", cacheMiddleware, getAllRooms);
roomRouter.get("/hotel", authMiddle, getAllRoomsByHotel); // Intentionally not cached (owner specific)
roomRouter.get("/single/:roomId", cacheMiddleware, getRoomById);
roomRouter.post(
  "/toggle-availability/:roomId",
  authMiddle,
  toggleRoomAvailability,
);

export default roomRouter;
