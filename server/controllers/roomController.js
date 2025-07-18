//API to create new room for hotel

import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

export const createRoom = async (req, res) => {
  try {
    const { roomType, price, facilities } = req.body;
    const owner = req.auth.userId;

    const hotel = await Hotel.findOne(owner);
    if (!hotel) {
      return res.json({ message: "Hotel not found" });
    }

    const UploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(UploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      price,
      facilities: JSON.parse(facilities),
      images,
    });
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate("hotel").sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRoomsByHotel = async (req, res) => {
  try {
    // const hotelId = req.params.hotelId;
    const hotelId = req.auth.userId; // Assuming the hotel ID is the same as the authenticated user's ID
    const rooms = await Room.find({ hotel: hotelId })
      .populate("hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.json({
      success: true,
      message: "Room availability toggled successfully",
      room,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    await Room.deleteOne({ _id: roomId });

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
