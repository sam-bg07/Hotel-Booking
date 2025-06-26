import React, { useState } from "react";
import { assets } from "../assets/assets";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      destination,
      checkIn,
      checkOut,
      guests,
    };
    console.log("Searching hotels with:", formData);
  };

  return (
    <div className='h-screen flex flex-col md:top-0 justify-center items-start text-white px-6 md:px-16 lg:px-24 xl:px-32 bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover '>
      <p className="bg-[#F0F8FF90] text-black rounded-2xl px-3 py-1 ">
        The Ultimate Hotel Experience
      </p>
      <div className=" text-white  text-3xl font-semibold md:font-bold max-w-2xl md:text-5xl md:leading-14 mt-6  ">
        Discover Your Perfect Gateway Destination
      </div>
      <p className="max-w-120 mt-4">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-800 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto"
      >
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <datalist id="destinations">
            <option value="New York" />
            <option value="Los Angeles" />
            <option value="Paris" />
            <option value="Tokyo" />
            <option value="London" />
          </datalist>
        </div>

        {/* Check-in */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        {/* Check-out */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        {/* Guests */}
        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-3 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
        >
          <img src={assets.searchIcon} alt="searchIcon" className="h-6" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Home;
