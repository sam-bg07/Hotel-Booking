// components/HotelRegister.jsx

import React, { useState } from "react";
import { assets } from "../assets/assets";
import heroImage from "../assets/heroImage.png";
import { UseAppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";

const HotelRegister = () => {
  const { setShowHotelReg, setIsOwner, getToken } = UseAppContext();
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [hotelName, setHotelName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const token = await getToken();
      console.log("Token:", token);

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      console.log("Sending request to:", `${API_BASE}/api/hotels`);
      console.log("Request payload:", {
        hotelName,
        phoneNumber,
        address,
        city,
      });

      const { data } = await axios.post(
        `${API_BASE}/api/hotels`,
        { hotelName, phoneNumber, address, city },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response received:", data);

      if (data.success) {
        toast.success("Hotel Registered Successfully");
        setShowHotelReg(false);
        setIsOwner(true);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error in hotel registration:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-200 bg-black/70 flex justify-center items-center"
      onClick={() => setShowHotelReg(false)}
    >
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl flex max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Image Section */}
        <img src={heroImage} alt="image" className="w-1/2 rounded-l-xl" />

        {/* Form Section */}
        <div className="relative flex flex-col p-8 md:w-1/2">
          {/* Close Button */}
          <img
            src={assets.closeIcon}
            alt="closeIcon"
            className="absolute top-4 right-4 cursor-pointer h-4 w-4"
            onClick={() => {
              setShowHotelReg(false);
            }}
          />

          <p className="text-center font-poppins text-xl mt-2">
            Register Your Hotel
          </p>

          {/* Hotel Name */}
          <div className="mt-4">
            <label htmlFor="hotelName" className="text-gray-700 font-medium">
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              placeholder="Type your hotel name here"
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Add Your Phone Number"
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="mt-4">
            <label htmlFor="address" className="text-gray-700 font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Add Your Address"
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City Dropdown */}
          <div className="mt-4 w-full max-w-60 flex gap-x-3 items-center">
            <label htmlFor="city" className="text-gray-700 font-medium">
              City:
            </label>
            <select
              name="city"
              id="city"
              className="border rounded-full border-gray-200 px-3 py-1 outline-amber-400 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="Surat">Surat</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-black text-white text-sm py-2 px-4 rounded-md hover:bg-gray-800 transition-all cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRegister;
