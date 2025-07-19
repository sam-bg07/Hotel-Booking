import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { hotelController } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// Middleware to check if the user is authenticated
hotelRouter.post("/", authMiddle, hotelController);

export default hotelRouter;
