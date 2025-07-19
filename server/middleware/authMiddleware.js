import User from "../models/User.js";

export const authMiddle = async (req, res, next) => {
  const userID = req.auth;
  if (!userID) {
    res.json({
      message: "You are not authorized to access this resource.",
    });
  } else {
    const user = await User.findById({ userID });
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
