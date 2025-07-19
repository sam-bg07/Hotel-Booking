export const userController = async (req, res) => {
  try {
    const role = req.user.role;
    res.json({ sucess: true, user: req.user, role: role });
  } catch (error) {
    console.error("Error in userController:", error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};
