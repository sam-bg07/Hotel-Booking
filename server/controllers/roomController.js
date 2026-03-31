import logger from "../config/logger.js";
//API to create new room for hotel

import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

export const createRoom = async (req, res) => {
  try {
    const { roomType, price, facilities } = req.body;
    const ownerId = req.user._id;

    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    logger.info("req.files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadImages = await req.files.map(async (file) => {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64",
      )}`;
      const response = await cloudinary.uploader.upload(base64);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const { roomTypes, minPrice, maxPrice, sort, destination } = req.query;

    let query = {};

    // 1. Destination (Hotel matching)
    if (destination) {
      const hotels = await Hotel.find({
        city: { $regex: destination, $options: "i" },
      });
      const hotelIds = hotels.map((h) => h._id);
      query.hotel = { $in: hotelIds };
    }

    // 2. Room Types
    if (roomTypes) {
      const typesArray = roomTypes.split(",");
      query.roomType = { $in: typesArray };
    }

    // 3. Price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 4. Sort
    let sortObj = { createdAt: -1 }; // Default
    if (sort === "Price Low to High") sortObj = { price: 1 };
    else if (sort === "Price High to Low") sortObj = { price: -1 };
    else if (sort === "Newest First") sortObj = { createdAt: -1 };

    const totalRooms = await Room.countDocuments(query);
    const rooms = await Room.find(query)
      .populate("hotel")
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      rooms,
      totalRooms,
      totalPages: Math.ceil(totalRooms / limit) || 1,
      currentPage: page,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRoomsByHotel = async (req, res) => {
  try {
    const userId = req.user._id;
    const hotelId = await Hotel.findOne({ owner: userId });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const rooms = await Room.find({ hotel: hotelId._id })
      .populate("hotel")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalRooms = await Room.countDocuments({ hotel: hotelId._id });

    res.json({
      success: true,
      rooms,
      page,
      limit,
      totalPages: Math.ceil(totalRooms / limit),
      totalRooms,
    });
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

export const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId).populate("hotel");
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, room });
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
