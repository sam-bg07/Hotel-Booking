import logger from "../config/logger.js";
export const userController = async (req, res) => {
  try {
    const role = req.user.roles;
    res.json({ success: true, user: req.user, roles: role });
  } catch (error) {
    logger.error("Error in userController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
