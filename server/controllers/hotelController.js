import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const hotelController = async (req, res) => {
  try {
    const { hotelName, phoneNumber, address, city } = req.body;
    const owner = req.user._id; // Assuming req.user is set by auth middleware

    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res
        .status(400)
        .json({ message: "Hotel already exists for this owner" });
    }
    await Hotel.create({
      hotelName,
      phoneNumber,
      address,
      city,
      owner,
    });

    await User.findByIdAndUpdate(owner, {
      $set: { role: "hotelOwner" },
    });
    res.json({ message: "Hotel Registered successfully", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};
