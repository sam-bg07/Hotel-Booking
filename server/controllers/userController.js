export const userController = async (req, res) => {
  try {
    const role = req.user.roles;
    res.json({ success: true, user: req.user, roles: role });
  } catch (error) {
    console.error("Error in userController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
