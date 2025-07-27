import { useState, useMemo, useEffect } from "react";
import { UseAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  Star,
  MapPin,
  Wifi,
  Utensils,
  Mountain,
  ConciergeBell,
  Waves,
} from "lucide-react";
import Loading from "../components/Loading";

const useQuery = () => new URLSearchParams(useLocation().search);

const Hotel = () => {
  const { currency, navigate, rooms, getToken, isLoadingrooms } =
    UseAppContext();

  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const destination = query.get("destination");
  const fetchData = async () => {
    try {
      let res;
      if (destination) {
        setIsLoading(true);
        // Search: Get filtered hotels/rooms by destination
        res = await axios.get(`/api/hotels?destination=${destination}`);
        setRoom(res.data.rooms || []); // assuming response has "hotels"
        setIsLoading(false);
      } else {
        setRoom(rooms); // Use rooms from context if no destination
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [destination, rooms]);
  const amenitiesIcons = {
    "Free WiFi": <Wifi className="w-4 h-4 " />,
    "Room Service": <Utensils className="w-4 h-4 " />,
    "Mountain View": <Mountain className="w-4 h-4 " />,
    "Pool Access": <Waves className="w-4 h-4 " />,
    "Concierge Service": <ConciergeBell className="w-4 h-4 " />,
  };
  // Filter states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Handle room type filter
  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(roomType)
        ? prev.filter((type) => type !== roomType)
        : [...prev, roomType]
    );
  };

  // Handle price range filter
  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange)
        ? prev.filter((range) => range !== priceRange)
        : [...prev, priceRange]
    );
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSortBy("");
  };

  // Check if price is in selected range
  const isPriceInRange = (price, range) => {
    switch (range) {
      case "$ 0 to 500":
        return price >= 0 && price <= 500;
      case "$ 500 to 1000":
        return price > 500 && price <= 1000;
      case "$ 1000 to 2000":
        return price > 1000 && price <= 2000;
      case "$ 2000 to 3000":
        return price > 2000 && price <= 3000;
      default:
        return true;
    }
  };

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = room;

    // Filter by room type
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter((room) =>
        selectedRoomTypes.includes(room.roomType)
      );
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((room) =>
        selectedPriceRanges.some((range) => isPriceInRange(room.price, range))
      );
    }

    // Sort rooms
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "Price Low to High":
            return a.price - b.price;
          case "Price High to Low":
            return b.price - a.price;
          case "Newest First":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [room, selectedRoomTypes, selectedPriceRanges, sortBy]);

  const [clickShow, setClickShow] = useState(false);

  const handleClickShow = () => {
    setClickShow(!clickShow);
  };

  if (isLoadingrooms) return <Loading message={"Loading rooms..."} />;

  return (
    <div className="mt-20 md:mt-40 px-6 md:px-16 lg:px-20 xl:px-28 flex  max-lg:flex-col-reverse ">
      <div className="flex-1">
        <div className="flex flex-col items-start text-left ">
          <h1 className="text-4xl mt-5 md:mt-0 font-stretch-150%  max-sm:mx-6">
            Hotel Rooms
          </h1>
          <p className="text-gray-600 mt-5   max-sm:mx-4 max-w-180 ">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
          {/* Results count */}
          <p className="text-sm text-gray-500 mt-2 max-sm:mx-4">
            Showing {filteredAndSortedRooms.length} of {room.length} rooms
          </p>
        </div>

        {room.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 text-lg mb-4">No room is found</p>
          </div>
        ) : filteredAndSortedRooms.length === 0 &&
          (selectedRoomTypes.length > 0 ||
            selectedPriceRanges.length > 0 ||
            sortBy) ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No rooms found matching your filters
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredAndSortedRooms.map((room, idx) => (
            <div
              key={idx}
              className="flex flex-col group bg-white p-4 rounded-xl shadow-md mb-10 my-16 "
            >
              <div className=" flex flex-col md:flex-row gap-5 max-w-full ">
                {/* Image */}
                <img
                  onClick={() => navigate(`/hotels/${room._id}`)}
                  src={room.images[2]}
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
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                      {room.roomType}
                    </span>
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
                    {room.facilities.map((amenity, index) => (
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
                      ${room.price}
                    </span>{" "}
                    /night
                  </p>
                </div>
              </div>
              <div className="w-full col-span-2 px-2 mt-7 transition-all duration-500  max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100">
                <p className="text-sm text-gray-600 border-t pt-2">
                  📝 <strong>Note:</strong> Rooftop bar, shuttle service, and
                  special packages available.
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* filter */}
      <div className="border-0 lg:w-80 lg:mx-15 lg:mb-20 ">
        <div className="mt-10 mx-3 my-1.5 border-2 border-gray-300 rounded">
          <div className="flex justify-between items-center border-b-2 px-4 py-3 border-gray-300">
            <p className="font-stretch-100% text-md">FILTERS</p>
            <span
              onClick={clearAllFilters}
              className="max-lg:hidden cursor-pointer text-gray-600 text-sm hover:text-black transition-colors"
            >
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
                    className="flex items-center space-x-2 mb-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedRoomTypes.includes(item)}
                      onChange={() => handleRoomTypeChange(item)}
                    />
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
                  className="flex items-center space-x-2 mb-2 text-sm  text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="accent-black"
                    checked={selectedPriceRanges.includes(range)}
                    onChange={() => handlePriceRangeChange(range)}
                  />
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
                    className="flex items-center space-x-2 mb-2 text-sm  text-gray-500 cursor-pointer hover:text-gray-700"
                  >
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortBy === option}
                      onChange={() => handleSortChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>

            {/* Active filters summary */}
            {(selectedRoomTypes.length > 0 ||
              selectedPriceRanges.length > 0 ||
              sortBy) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Active Filters
                  </h4>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {selectedRoomTypes.length > 0 && (
                    <p className="text-xs text-gray-600">
                      Room Types: {selectedRoomTypes.join(", ")}
                    </p>
                  )}
                  {selectedPriceRanges.length > 0 && (
                    <p className="text-xs text-gray-600">
                      Price: {selectedPriceRanges.join(", ")}
                    </p>
                  )}
                  {sortBy && (
                    <p className="text-xs text-gray-600">Sort: {sortBy}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
