import React from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets.js"; // Importing dummy data for rooms
import { useNavigate } from "react-router-dom"; // Importing Navigate for navigation

const HotelCardFeatured = () => {
  const Navigate = useNavigate(); // Initialize the navigate function
  return (
    <div className="mt-20 flex flex-col items-center  text-center ">
      <p>
        <span className="text-5xl font-stretch-500%">
          Featured Hotels And Destination
        </span>
      </p>
      <div className="text-gray-600 mt-5 max-md:text-start max-sm:mx-4">
        From serene beaches to vibrant cities, we've got your stay covered.{" "}
        <br />
        Explore our top-rated hotels and destinations, handpicked for your
        perfect getaway. <br />
        Book now and create unforgettable memories.
      </div>

      {/* hotel card  */}
      <div className="px-6 md:px-16 lg:px-24 flex flex-wrap justify-center gap-4  mt-20 w-full">
        {roomsDummyData.map((room, index) => (
          <HotelCard key={room._id} room={room} />
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            Navigate("/hotels");
          }}
          className="bg-black text-white px-5 py-2.5 mt-15 cursor-pointer rounded-md  hover:bg-gray-800 transition-colors"
        >
          View All Hotels
        </button>
      </div>
    </div>
  );
};

export default HotelCardFeatured;
