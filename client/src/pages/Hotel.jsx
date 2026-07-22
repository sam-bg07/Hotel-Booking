import logger from "../utils/logger.js";
import { useState, useEffect, memo } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HotelSkeleton } from "../components/Skeletons";
import Loading from "../components/Loading.jsx";

const useQuery = () => new URLSearchParams(useLocation().search);

const Hotel = () => {
  const { currency, navigate, getToken } = UseAppContext();

  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRooms, setTotalRooms] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const query = useQuery();
  const rawDestination = query.get("destination");
  const [destination, setDestination] = useState(rawDestination || "");
  const couponId = query.get("couponId");

  // Filter states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [clickShow, setClickShow] = useState(false);

  // Derive min/max prices from selectedPriceRanges to send to backend
  const getPriceBounds = () => {
    if (selectedPriceRanges.length === 0) return { min: null, max: null };

    let min = Infinity;
    let max = -Infinity;

    selectedPriceRanges.forEach((range) => {
      switch (range) {
        case "$ 0 to 500":
          min = Math.min(min, 0);
          max = Math.max(max, 500);
          break;
        case "$ 500 to 1000":
          min = Math.min(min, 500);
          max = Math.max(max, 1000);
          break;
        case "$ 1000 to 2000":
          min = Math.min(min, 1000);
          max = Math.max(max, 2000);
          break;
        case "$ 2000 to 3000":
          min = Math.min(min, 2000);
          max = Math.max(max, 3000);
          break;
        default:
          break;
      }
    });

    return {
      min: min !== Infinity ? min : null,
      max: max !== -Infinity ? max : null,
    };
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", limit);

      if (destination) {
        params.append("destination", destination);
      }

      if (selectedRoomTypes.length > 0) {
        params.append("roomTypes", selectedRoomTypes.join(","));
      }

      if (sortBy) {
        params.append("sort", sortBy);
      }

      const { min, max } = getPriceBounds();
      if (min !== null) params.append("minPrice", min);
      if (max !== null) params.append("maxPrice", max);

      const res = await axios.get(`/api/rooms?${params.toString()}`);

      if (res.data.success) {
        setRoom(res.data.rooms || []);
        setTotalRooms(res.data.totalRooms || 0);
        setTotalPages(res.data.totalPages || 1);
      }
      setIsLoading(false);
    } catch (err) {
      logger.error("Error fetching data:", err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    destination,
    selectedRoomTypes,
    selectedPriceRanges,
    sortBy,
  ]);

  // If filters change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRoomTypes, selectedPriceRanges, sortBy, destination]);

  const amenitiesIcons = {
    "Free WiFi": <Wifi className="w-4 h-4 " />,
    "Room Service": <Utensils className="w-4 h-4 " />,
    "Mountain View": <Mountain className="w-4 h-4 " />,
    "Pool Access": <Waves className="w-4 h-4 " />,
    "Concierge Service": <ConciergeBell className="w-4 h-4 " />,
  };

  // Handlers for Filters
  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(roomType)
        ? prev.filter((type) => type !== roomType)
        : [...prev, roomType],
    );
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange)
        ? prev.filter((range) => range !== priceRange)
        : [...prev, priceRange],
    );
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const clearAllFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSortBy("");
    setDestination("");
    navigate("/hotels", { replace: true });
  };

  const handleClickShow = () => {
    setClickShow(!clickShow);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      // logic to only show +- 2 pages from current or ellipses could go here for massive scale
      // but simply listing all for up to ~10 pages is visually fine.
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
            currentPage === i
              ? "bg-black text-white font-bold"
              : "border border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pages}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  if (isLoading && room.length === 0) return <HotelSkeleton />;

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
            Showing room(s) {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalRooms)} of {totalRooms}
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loading message="Updating results..." />
          </div>
        ) : room.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No rooms found matching your criteria
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {room.map((roomData, idx) => (
              <div
                key={roomData._id || idx}
                className="flex flex-col group bg-white p-4 rounded-xl shadow-md mb-10 my-6 "
              >
                <div className=" flex flex-col md:flex-row gap-5 max-w-full ">
                  {/* Image */}
                  <img
                    loading="lazy"
                    onClick={() => {
                      if (couponId) {
                        navigate(
                          `/hotels/${roomData._id}?couponId=${couponId}`,
                        );
                      } else {
                        navigate(`/hotels/${roomData._id}`);
                      }
                    }}
                    src={roomData.images[0] || roomData.images[2]}
                    alt="hotel-image"
                    className="w-full md:w-[50%] h-65 rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                  {/* Text Content */}
                  <div className="flex flex-col justify-between w-full md:flex-1">
                    <div className="mb-2">
                      <span className="text-gray-600 text-sm">
                        {roomData.hotel?.city || "Unknown City"}
                      </span>
                      <h3 className="text-2xl font-stretch-500%">
                        {roomData.hotel?.name || "Premium Hotel"}
                      </h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                        {roomData.roomType}
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
                        {roomData.hotel?.address || "Location Unavailable"}
                      </span>
                    </div>
                    {/* Amenities */}
                    <div className="flex gap-2 flex-wrap mb-3">
                      {roomData.facilities?.map((amenity, index) => (
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
                        ${roomData.price}
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
            ))}

            {/* Pagination Controls */}
            {renderPagination()}
          </>
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
            {destination && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Destination:</span>{" "}
                  {destination}
                </p>
              </div>
            )}

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
                ),
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
                ),
              )}
            </div>

            {/* Active filters summary */}
            {(selectedRoomTypes.length > 0 ||
              selectedPriceRanges.length > 0 ||
              sortBy ||
              destination) && (
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
                  {destination && (
                    <p className="text-xs text-gray-600 truncate">
                      Dest: {destination}
                    </p>
                  )}
                  {selectedRoomTypes.length > 0 && (
                    <p className="text-xs text-gray-600">
                      Types: {selectedRoomTypes.join(", ")}
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

export default memo(Hotel);
