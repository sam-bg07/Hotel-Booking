import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const authMiddle = async (req, res, next) => {
  // const userID = req.auth;
  const { userId } = getAuth(req);
  if (!userId) {
    res.json({
      message: "User not authenticated.",
    });
  } else {
    const user = await User.findById(userId);
    if (!user) {
      res.json({
        message: "User not found.",
      });
    } else {
      req.user = user;
      next();
    }
  }
};
