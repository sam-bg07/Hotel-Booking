import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import {
  getAllHotels,
  hotelController,
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// Middleware to check if the user is authenticated
hotelRouter.post("/", authMiddle, hotelController);
hotelRouter.get("/", cacheMiddleware, getAllHotels);

export default hotelRouter;
