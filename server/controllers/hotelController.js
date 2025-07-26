import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

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
      $set: { roles: "hotelOwner" },
    });
    res.json({ message: "Hotel Registered successfully", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const destination = req.query.destination;
    // console.log("Searching for hotels in:", destination);

    // Step 1: Find hotels matching destination in address
    const hotels = await Hotel.find({
      city: { $regex: destination, $options: "i" },
    });

    if (hotels.length === 0) {
      return res.json({ success: true, rooms: [] });
    }

    // Step 2: Extract hotel IDs
    const hotelIds = hotels.map((hotel) => hotel._id);

    // Step 3: Find rooms that belong to the found hotels
    const rooms = await Room.find({ hotel: { $in: hotelIds } })
      .populate("hotel") // optional: only if you want hotel info
      .sort({ createdAt: -1 });

    // Step 4: Return only rooms
    res.json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
