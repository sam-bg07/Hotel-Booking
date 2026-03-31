import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const authMiddle = async (req, res, next) => {
  // const userID = req.auth;
  console.log("Auth middleware called");
  const { userId } = getAuth(req);
  if (!userId) {
    console.log("User not authenticated", userId);
    return res.status(401).json({
      message: "User not authenticated.",
    });
  } else {
    const user = await User.findById(userId);
    console.log("Authenticated user:", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    } else {
      req.user = user;
      next();
    }
  }
};
