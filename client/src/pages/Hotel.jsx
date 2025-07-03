import React, { useState } from "react";
import { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Wifi,
  Utensils,
  Mountain,
  ConciergeBell,
  Waves,
} from "lucide-react";
const Hotel = () => {
  const amenitiesIcons = {
    "Free WiFi": <Wifi className="w-4 h-4 " />,
    "Room Service": <Utensils className="w-4 h-4 " />,
    "Mountain View": <Mountain className="w-4 h-4 " />,
    "Pool Access": <Waves className="w-4 h-4 " />,
    "Concierge Service": <ConciergeBell className="w-4 h-4 " />,
  };

  const navigate = useNavigate();
  const [clickShow, setClickShow] = useState(false);
  const handleClickShow = () => {
    setClickShow(!clickShow);
  };
  return (
    <div className="mt-40 px-6 md:px-16 lg:px-20 xl:px-28 flex max-lg:flex-col-reverse">
      <div>
        <div className="flex flex-col items-start text-left ">
          <h1 className="text-4xl  font-stretch-150%  max-sm:mx-6">
            Hotel Rooms
          </h1>
          <p className="text-gray-600 mt-5   max-sm:mx-4 max-w-180 ">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room, idx) => (
          <div
            key={idx}
            className="flex flex-col group bg-white p-4 rounded-xl shadow-md my-16 "
          >
            <div className=" flex flex-col md:flex-row gap-5 max-w-full ">
              {/* Image */}
              <img
                onClick={() => navigate(`/hotels/${room._id}`)}
                src={room.images[0]}
                alt="hotel-image"
                className="w-full md:w-[50%] h-65 rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />

              {/* Text Content */}
              <div className="flex flex-col justify-between w-full md:flex-1">
                <div className="mb-2">
                  <span className="text-gray-600 text-sm">
                    {room.hotel.city}
                  </span>
                  <h3 className="text-2xl font-stretch-500%">
                    {room.hotel.name}
                  </h3>
                </div>

                {/* Star ratings */}
                <div className="flex gap-1 mb-3 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4
                          ? "text-orange-500 fill-orange-400 group-hover:fill-orange-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                  ))}
                  <p className="text-sm ml-2 text-gray-600">200+ reviews</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 text-sm">
                    {room.hotel.address}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-sm shadow-sm"
                    >
                      {amenitiesIcons[amenity] || (
                        <span className="w-4 h-4 text-gray-500">?</span>
                      )}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <p className="text-gray-700 text-sm">
                  <span className="text-lg font-semibold text-black">
                    ${room.pricePerNight}
                  </span>{" "}
                  /night
                </p>
              </div>
            </div>
            <div className="w-full col-span-2 px-2 mt-7 transition-all duration-500  max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100">
              <p className="text-sm text-gray-600 border-t pt-2">
                📝 <strong>Note:</strong> Rooftop bar, shuttle service, and
                special packages available at .
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* filter */}
      <div className="border-0  w-80 lg:mx-auto ">
        <div className="mt-10 mx-3 my-1.5 border-2 border-gray-300 rounded">
          <div className="flex justify-between items-center border-b-2 px-4 py-3 border-gray-300">
            <p className="font-stretch-100% text-md">FILTERS</p>
            <span className="max-lg:hidden cursor-pointer text-gray-600 text-sm">
              CLEAR
            </span>
            <span
              onClick={() => handleClickShow()}
              className="lg:hidden cursor-pointer text-gray-600 text-sm"
            >
              {clickShow ? "HIDE" : "SHOW"}
            </span>
          </div>

          <div
            className={`flex flex-col px-5 py-4 ${
              clickShow ? "block" : "hidden"
            } lg:block`}
          >
            <div className="mb-6">
              <h3 className="text-md  font-stretch-100% mb-2">
                Popular filters
              </h3>
              {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map(
                (item, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 mb-2 text-sm text-gray-500"
                  >
                    <input type="checkbox" className="accent-black" />
                    <span>{item}</span>
                  </label>
                )
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-md  font-stretch-100% mb-2">Price Range</h3>
              {[
                "$ 0 to 500",
                "$ 500 to 1000",
                "$ 1000 to 2000",
                "$ 2000 to 3000",
              ].map((range, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 mb-2 text-sm  text-gray-500"
                >
                  <input type="checkbox" className="accent-black" />
                  <span>{range}</span>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div>
              <h3 className="text-md  font-stretch-100% mb-2">Sort By</h3>
              {["Price Low to High", "Price High to Low", "Newest First"].map(
                (option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 mb-2 text-sm  text-gray-500"
                  >
                    <input type="radio" name="sort" className="accent-black" />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
