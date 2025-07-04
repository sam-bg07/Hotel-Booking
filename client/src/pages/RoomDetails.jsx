import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import { Star, MapPin } from "lucide-react";
import {
  Wifi,
  Utensils,
  Mountain,
  ConciergeBell,
  Waves,
  Home,
  ShieldCheck,
  HeartHandshake,
  LogIn,
  LogOut,
  Users,
  SearchIcon,
} from "lucide-react";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const amenitiesIcons = {
    "Free WiFi": <Wifi className="w-5 h-5 " />,
    "Room Service": <Utensils className="w-5 h-5 " />,
    "Mountain View": <Mountain className="w-5 h-5 " />,
    "Pool Access": <Waves className="w-5 h-5 " />,
    "Concierge Service": <ConciergeBell className="w-5 h-5 " />,
  };

  const highlights = [
    {
      icon: <Home className="w-5 h-5 text-gray-700 fill-gray-400" />,
      title: "Clean & Safe Stay",
      description: "A well-maintained and hygienic space just for you.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gray-700 fill-gray-400" />,
      title: "Enhanced Cleaning",
      description: "This host follows Staybnb’s strict cleaning standards.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-gray-700 fill-gray-400" />,
      title: "Excellent Location",
      description: "90% of guests rated the location 5 stars.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-gray-700 fill-gray-400" />,
      title: "Smooth Check-In",
      description: "100% of guests gave check-in a 5-star rating.",
    },
  ];

  const roomDescription =
    "Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment that has a true city feeling. The price quoted is for two guests; please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.";

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    if (!room) {
      console.error("Room not found");
      return;
    }
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [room]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: 1,
    },
  });
  const handleSearch = (data) => {
    const { checkIn, checkOut, guests } = data;
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-in date must be before check-out date");
      return;
    }
    console.log("Search submitted:", { checkIn, checkOut, guests });
  };

  return (
    room && (
      <div className="mt-32 px-6 md:px-16 lg:px-24 xl:px-28  ">
        {/* title */}
        <div className="flex items-center gap-x-3 flex-wrap mb-3">
          <p className="text-3xl font-Poppins text-gray-800">Urbanza Suites</p>
          <span className="text-sm text-gray-500 italic">(Double Bed)</span>
          <p className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
            20% OFF
          </p>
        </div>

        {/* Star ratings */}
        <div className="flex gap-1 mb-3 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= 4
                  ? "text-orange-500 fill-orange-400 "
                  : "text-gray-400 "
              }`}
            />
          ))}
          <p className="text-md ml-2">200+ reviews</p>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700 text-sm">{room.hotel.address}</span>
        </div>

        {/*  Image Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16 px-4 md:px-10 ">
          {/* Main Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Main room"
              className="w-full mt-6 md:mt-10 lg:mt-0 mx-auto rounded-xl shadow-xl object-cover max-h-[500px]"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center">
            <p className="text-lg font-semibold mb-5 text-gray-700">
              More Photos
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room image ${index + 1}`}
                  className={`w-[44%]  aspect-video object-cover rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out
            ${
              mainImage === image
                ? "ring-2 ring-orange-500 scale-[1.03]"
                : "hover:scale-[1.03] hover:ring-2 hover:ring-orange-400"
            }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Room Details Section */}
        <div className="flex max-md:flex-col justify-between md:items-center max-md:gap-y-7 font-Poppins my-5 mx-4 ">
          <div className="flex flex-col justify-center  max-md:gap-y-2">
            <p className="text-3xl  text-gray-800">
              Experience Luxury Like Never Before
            </p>
            {/* Amenities */}
            <div className="flex gap-2 flex-wrap mt-3 max-md:gap-x-4">
              {room.amenities.map((amenity, index) => (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-sm shadow-sm  "
                  >
                    {amenitiesIcons[amenity] || (
                      <span className="w-4 h-4 text-gray-500">?</span>
                    )}
                    <span>{amenity}</span>
                  </div>
                  {index < room.amenities.length - 1 && (
                    <div className="w-[3px] h-10 bg-gray-400 hidden md:block shadow-sm rounded self-center"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <span className="text-xl font-bold ">$399/night</span>
        </div>

        <form
          onSubmit={handleSubmit(handleSearch)}
          className="mt-16 bg-white rounded-2xl px-6 md:px-16 lg:px-24 xl:px-36 py-8 shadow-lg max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap"
        >
          {/* Check-in */}
          <div className="flex flex-col w-full md:w-auto">
            <label
              htmlFor="checkIn"
              className="flex items-center gap-2 text-sm text-gray-600 mb-1"
            >
              <LogIn className="w-4 h-4" />
              Check-In
            </label>
            <input
              type="date"
              id="checkIn"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              {...register("checkIn", {
                required: "Check-in date is required",
              })}
            />
            {errors.checkIn && (
              <span className="text-xs text-red-500 mt-1">
                {errors.checkIn.message}
              </span>
            )}
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-full md:w-auto">
            <label
              htmlFor="checkOut"
              className="flex items-center gap-2 text-sm text-gray-600 mb-1"
            >
              <LogOut className="w-4 h-4" />
              Check-Out
            </label>
            <input
              type="date"
              id="checkOut"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              {...register("checkOut", {
                required: "Check-out date is required",
              })}
            />
            {errors.checkOut && (
              <span className="text-xs text-red-500 mt-1">
                {errors.checkOut.message}
              </span>
            )}
          </div>

          {/* Guests */}
          <div className="flex flex-col w-full md:w-auto">
            <label
              htmlFor="guests"
              className="flex items-center gap-2 text-sm text-gray-600 mb-1"
            >
              <Users className="w-4 h-4" />
              Guests
            </label>
            <input
              type="number"
              id="guests"
              min={1}
              max={4}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="0"
              {...register("guests", {
                required: "Number of guests is required",
                min: { value: 1, message: "At least 1 guest required" },
                max: { value: 4, message: "Max 4 guests allowed" },
              })}
            />
            {errors.guests && (
              <span className="text-xs text-red-500 mt-1">
                {errors.guests.message}
              </span>
            )}
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md text-sm font-medium transition"
            >
              <SearchIcon className="w-4 h-4" />
              Check Availability
            </button>
          </div>
        </form>

        <div className="mt-16 px-6   py-10 space-y-8">
          {/* Highlights List */}

          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-md font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}

          {/* Room Description */}
          <div className="mt-16 py-12 text-gray-700 leading-relaxed text-sm md:text-base border-y border-gray-300">
            {roomDescription}
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
