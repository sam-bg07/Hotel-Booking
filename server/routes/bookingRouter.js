import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getAllBookingsByUser,
  getAllBookingsByHotel,
  stripePayment,
} from "../controllers/bookingController.js";
import { validateCoupon } from "../controllers/couponController.js";

const bookingRouter = express.Router();

// Middleware to check if the user is authenticated
bookingRouter.post("/check-availability", authMiddle, checkAvailabilityAPI);
bookingRouter.post(
  "/create-booking",
  authMiddle,
  validateCoupon,
  createBooking
);
bookingRouter.get("/user", authMiddle, getAllBookingsByUser);
bookingRouter.get("/hotel", authMiddle, getAllBookingsByHotel);

bookingRouter.post("/stripe-payment", authMiddle, stripePayment);

export default bookingRouter;
