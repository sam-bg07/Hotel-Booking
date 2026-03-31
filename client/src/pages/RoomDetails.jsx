import React, { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { UseAppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-hot-toast";
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
import Loading from "../components/Loading.jsx";

const useQuery = () => new URLSearchParams(useLocation().search);

const RoomDetails = () => {
  const { id } = useParams();
  const { getToken, navigate, rooms, isLoadingrooms } = UseAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const query = useQuery();
  const couponId = query.get("couponId");

  const [isChecking, setIsChecking] = useState(false);

  const [isAvailable, setIsAvailable] = useState(false);
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
    const fetchRoomDetails = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/single/${id}`);
        if (data.success && data.room) {
          setRoom(data.room);
          setMainImage(data.room.images[0]);
        }
      } catch (error) {
        console.error("Error fetching room details", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

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

  const checkAvailabilityHandler = async (data) => {
    const token = await getToken();
    if (!token) {
      toast.error("Please login to check availability");
      return;
    }

    const { checkInDate, checkOutDate } = data;

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    try {
      setIsChecking(true);
      const res = await axios.post(
        "/api/bookings/check-availability",
        {
          room: id,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        setIsAvailable(false);
        return;
      }

      if (!res.data.isAvailable) {
        toast.error("Room is not available");
        setIsAvailable(false);
      } else {
        toast.success("Room is available!");
        setIsAvailable(true);
      }
    } catch (error) {
      toast.error("Error checking availability");
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  const bookNowHandler = async (data) => {
    const token = await getToken();
    if (!token) {
      toast.error("Please login to book");
      return;
    }

    try {
      const bookRes = await axios.post(
        "/api/bookings/create-booking",
        {
          room: id,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          guests: data.guests,
          coupon: couponId || null,
          totalPrice: room.price,
          hotel: room.hotel._id,
          paymentMethod: "Cash (At Hotel)",
          isPaid: false,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (bookRes.data.success) {
        toast.success("Booking successful!");
        navigate("/my-booking");
        scrollTo(0, 0);
      } else {
        toast.error(bookRes.data.message);
      }
    } catch (error) {
      toast.error("Error while booking");
    }
  };

  if (isLoadingrooms)
    return (
      <div>
        <Loading message="Loading room details..." />
      </div>
    );

  return (
    room && (
      <div className="mt-32 px-6 md:px-16 lg:px-24 xl:px-28  ">
        {/* title */}
        <div className="flex items-center gap-x-3 flex-wrap mb-3">
          <p className="text-3xl font-Poppins text-gray-800">
            {room.hotel.hotelName}
          </p>
          <span className="text-sm text-gray-500 italic">
            ({room.roomType})
          </span>
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
            <img loading="lazy"
              src={mainImage}
              alt="Main room"
              className="w-full min-h-[270px] mt-6 md:mt-10 lg:mt-0 mx-auto rounded-xl shadow-xl object-cover max-h-[500px]"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center">
            <p className="text-lg font-semibold mb-5 text-gray-700">
              More Photos
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {room.images.map((image, index) => (
                <img loading="lazy"
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
              {room.facilities.map((amenity, index) => (
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
                  {index < room.facilities.length - 1 && (
                    <div className="w-[3px] h-10 bg-gray-400 hidden md:block shadow-sm rounded self-center"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <span className="text-2xl font-poppins ">
            ${room.price} <span className="text-sm text-gray-600"> /night</span>
          </span>
        </div>

        <form
          onSubmit={handleSubmit(
            isAvailable ? bookNowHandler : checkAvailabilityHandler,
          )}
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
              min={new Date().toISOString().split("T")[0]}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              {...register("checkInDate", {
                required: "Check-in date is required",
              })}
            />
            {errors.checkInDate && (
              <span className="text-xs text-red-500 mt-1">
                {errors.checkInDate.message}
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
              min={checkInDate || new Date().toISOString().split("T")[0]}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              {...register("checkOutDate", {
                required: "Check-out date is required",
              })}
            />
            {errors.checkOutDate && (
              <span className="text-xs text-red-500 mt-1">
                {errors.checkOutDate.message}
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
              placeholder="0"
              min={0}
              max={4}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-black"
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

          {/* Submit Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              disabled={isChecking}
              className="w-full md:w-auto flex justify-center items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md text-sm font-medium transition cursor-pointer"
            >
              <SearchIcon className="w-4 h-4" />
              {isAvailable
                ? "Book Now"
                : isChecking
                  ? "Checking..."
                  : "Check Availability"}
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

export default memo(RoomDetails);
