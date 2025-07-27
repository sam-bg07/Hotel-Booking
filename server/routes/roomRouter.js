import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { createRoom } from "../controllers/roomController.js";
import {
  getAllRooms,
  getAllRoomsByHotel,
  toggleRoomAvailability,
} from "../controllers/roomController.js";
import { upload } from "../middleware/uploadImage.js";
const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), authMiddle, createRoom);
roomRouter.get("/", getAllRooms);
roomRouter.get("/hotel", authMiddle, getAllRoomsByHotel);
// roomRouter.get("/:roomId", authMiddle, getRoomById);
roomRouter.post(
  "/toggle-availability/:roomId",
  authMiddle,
  toggleRoomAvailability
);

export default roomRouter;
