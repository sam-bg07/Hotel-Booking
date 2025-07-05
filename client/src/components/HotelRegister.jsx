import React from "react";
import { assets } from "../assets/assets";
import heroImage from "../assets/heroImage.png";

const HotelRegister = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-200 bg-black/70 flex justify-center items-center">
      <form action="" className="bg-white rounded-xl flex max-w-4xl">
        {/* Left Image Section */}
        <img src={heroImage} alt="image" className="w-1/2 rounded-l-xl" />

        {/* Form Section */}
        <div className="relative flex flex-col p-8 md:w-1/2">
          {/* Close Button */}
          <img
            src={assets.closeIcon}
            alt="closeIcon"
            className="absolute top-4 right-4 cursor-pointer h-4 w-4"
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
            />
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <label htmlFor="PhoneNumber" className="text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="PhoneNumber"
              placeholder="Add Your Phone Number"
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
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
            >
              <option value="">Select City</option>
              <option value="city1">Surat</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
              <option value="city4">City 4</option>
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
