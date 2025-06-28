import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ room, index }) => {
  const Navigate = useNavigate();
  // Handle case where room data is not available
  return (
    // {
    //     "_id": "67f763d8197ac559e4089b7a",
    //     "hotel": hotelDummyData,
    //     "roomType": "Single Bed",
    //     "pricePerNight": 199,
    //     "amenities": ["Free WiFi", "Room Service", "Pool Access"],
    //     "images": [roomImg4, roomImg1, roomImg2, roomImg3],
    //     "isAvailable": true,
    //     "createdAt": "2025-04-10T06:23:20.252Z",
    //     "updatedAt": "2025-04-10T06:23:20.252Z",
    //     "__v": 0
    // }
    <NavLink
      to="/rooms"
      onClick={() => scrollTo(0, 0)}
      className="max-w-70 shadow-[0px_1px_3px_rgba(0,0,0,0.4)] rounded-md rounded-t-xl hover:translate-y-1 transition-all duration-300"
    >
      <img
        src={room?.images[0]}
        alt="firstImage"
        className="rounded-t-xl  relative "
      />
      <p className=" absolute bg-amber-200 top-3 left-0">Best Seller</p>
      <div className="p-4 pt-5">
        <div className="flex flex-wrap items-center justify-between ">
          <span className="text-xl font-stretch-100%">{room.hotel.name}</span>
          <div className="flex items-center justify-center gap-1">
            <img src={assets.starIconFilled} alt="Star-Fill" />
            <span>4.5</span>
          </div>
        </div>
        <div className="flex  items-center gap-1 mt-0.5">
          <img src={assets.locationIcon} alt="Location" />
          <span className="text-gray-700 text-sm">{room.hotel.address}</span>
          {/* location icon and address */}
        </div>
        <div className="flex flex-wrap justify-between mt-5">
          <p className="text-gray-700 text-sm">
            <span className="text-xl font-stretch-100% text-black">
              ${room.pricePerNight}
            </span>
            /night
          </p>
          <button className=" hover:bg-black hover:text-white cursor-pointer text-md px-2 py-2 border-1 hover:border-red-800 rounded">
            Book Now
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default HotelCard;
