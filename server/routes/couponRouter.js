import express from "express";
import {
  createCoupon,
  deleteCoupon,
  get3Coupons,
  getAllCoupons,
  updatecoupon,
  validateCoupon,
} from "../controllers/couponController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
const couponRouter = express.Router();

couponRouter.post("/", authMiddle, createCoupon);
couponRouter.post("/validate", authMiddle, validateCoupon);
couponRouter.get("/getallcoupons", authMiddle, getAllCoupons);
couponRouter.delete("/deletecoupon/:id", authMiddle, deleteCoupon);
couponRouter.put("/updatecoupon/:id", authMiddle, updatecoupon);

couponRouter.get("/get3coupons", get3Coupons);

export default couponRouter;
