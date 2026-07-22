import logger from "../utils/logger.js";
import React, { useEffect, useState, memo } from "react";

import {
  Calendar,
  Check,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Tag,
  Users,
  X,
  AlertCircle,
} from "lucide-react";
import { UseAppContext } from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading.jsx";
import DownloadTcket from "../components/DownloadTcket.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MyBooking = () => {
  const { user, getToken } = UseAppContext();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(`/api/bookings/user?page=${currentPage}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserBookings(data.bookings);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId, finalPrice = null) => {
    try {
      const token = await getToken();
      // If no finalPrice is provided, use the selectedBooking's price
      const priceToSend =
        finalPrice !== null
          ? finalPrice
          : selectedBooking?.isdiscounted
            ? selectedBooking.discountedPrice
            : selectedBooking.originalPrice;

      const { data } = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId, finalPrice: priceToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlecheckcoupon = async (couponCode) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/coupon/validate",
        { couponCode, bookingId: selectedBooking._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      logger.info(data);
      if (data.success) {
        toast.success(data.message);
        setAppliedCoupon(data.coupon);
        // Update the selected booking with the new data
        if (data.booking) {
          setSelectedBooking({
            ...selectedBooking,
            ...data.booking,
          });
        }
      } else {
        toast.error(data.message);
        setAppliedCoupon(null);
      }
    } catch (error) {
      toast.error(error.message);
      setAppliedCoupon(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Popup handlers
  const handlePayNow = (booking) => {
    setSelectedBooking(booking);
    setShowCouponInput(false);
    // setCouponCode("");
    // setAppliedCoupon(null);
    // setCouponError("");
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
    // setShowCouponInput(false);
    // setCouponCode("");
    // setAppliedCoupon(null);
    // setCouponError("");
  };

  const handleUseCoupon = () => {
    setShowCouponInput(true);
    setCouponError("");
  };

  const calculateDiscountedPrice = (originalPrice, coupon) => {
    if (coupon.discountType === "percentage") {
      return originalPrice - (originalPrice * coupon.discountValue) / 100;
    } else {
      return Math.max(0, originalPrice - coupon.discountValue);
    }
  };

  const getDiscountAmount = (originalPrice, coupon) => {
    if (coupon.discountType === "percentage") {
      return (originalPrice * coupon.discountValue) / 100;
    } else {
      return Math.min(coupon.discountValue, originalPrice);
    }
  };

  const handleProceedToPayment = () => {
    // Use the applied coupon price if available, otherwise check if booking already has a discount
    const finalPrice = appliedCoupon
      ? calculateDiscountedPrice(selectedBooking.originalPrice, appliedCoupon)
      : selectedBooking.isdiscounted
        ? selectedBooking.discountedPrice
        : selectedBooking.originalPrice;

    handlePayment(selectedBooking._id, finalPrice);
    handleClosePopup();
  };

  useEffect(() => {
    // Simulate user being logged in
    fetchUserBookings();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mt-30 px-6 md:px-16 lg:px-20 xl:px-28">
      {/* Title Section */}
      <div className="flex flex-col items-start text-left mb-8">
        <h1 className="text-4xl font-bold max-sm:mx-6">My Bookings</h1>
        <p className="text-gray-600 mt-5 max-sm:mx-4 max-w-4xl">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>
      <div className="max-w-7xl mt-5 w-full mb-24">
        {/* Table Headers - Desktop Only */}
        <div className="hidden md:grid md:grid-cols-3 border-b border-gray-600 text-sm font-medium uppercase text-gray-700 py-3">
          <div className="text-center">Hotel Name</div>
          <div className="text-center">Date and Timing</div>
          <div className="text-center">Payment</div>
        </div>
        {/* Booking List */}
        {userBookings.map((booking) => (
          <div
            key={booking._id}
            className="w-full md:grid md:grid-cols-3 border-b border-gray-200 text-base py-4 hover:bg-gray-50 transition shadow-md my-5"
          >
            {/* Mobile Card Design */}
            <div className="md:hidden">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                {/* Hotel Image */}
                <div className="relative">
                  <img loading="lazy"
                    src={
                      (booking.room &&
                        booking.room.images &&
                        booking.room.images[0]) ||
                      "/placeholder.svg"
                    }
                    alt={booking.hotel.hotelName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {booking.room.roomType}
                    </span>
                  </div>
                </div>
                {/* Card Content */}
                <div className="p-5 space-y-2">
                  {/* Hotel Name & Location */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 ml-1">
                      {booking.hotel.hotelName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.hotel.address}</span>
                    </div>
                  </div>
                  {/* Guests & Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Guests: {booking.guests}</span>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        {booking.isdiscounted ? (
                          <>
                            <span className="text-lg font-bold text-gray-900 line-through">
                              ${booking.originalPrice}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              ${booking.discountedPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${booking.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Check-in & Check-out */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Check In
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(booking.checkInDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-300 mx-3"></div>
                      <div className="text-center flex-1">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Check Out
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(booking.checkOutDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Payment Status */}
                  <div className="flex items-center justify-center pt-3">
                    {booking.isPaid ? (
                      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full shadow-sm">
                          <Clock className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-700">
                            Payment Pending
                          </span>
                        </div>
                        <button
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md w-full max-w-xs justify-center"
                          onClick={() => handlePayNow(booking)}
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Desktop Layout */}
            <div className="hidden md:block w-full px-2">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <img loading="lazy"
                  src={
                    (booking.room &&
                      booking.room.images &&
                      booking.room.images[0]) ||
                    "/placeholder.svg"
                  }
                  alt={booking.hotel.hotelName}
                  className="w-52 lg:w-40 h-32 lg:h-28 object-cover rounded-md shadow border"
                />
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-lg font-semibold text-gray-800">
                      {booking.hotel.hotelName}
                    </span>
                    <span className="hidden md:block text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700 font-medium">
                      {booking.room.roomType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Guests: {booking.guests}</span>
                  </div>
                  <p className="text-md">
                    {booking.isdiscounted ? (
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-black line-through">
                          ${booking.originalPrice}
                        </span>
                        <span className="font-semibold text-green-600">
                          ${booking.discountedPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold text-black">
                        ${booking.originalPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Date and Time - Desktop */}
            <div className="hidden w-full md:flex items-center md:justify-evenly gap-4 text-center">
              <div>
                <p className="text-sm font-medium">Check In:</p>
                <span className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">Check Out:</p>
                <span className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* Payment Status - Desktop */}
            <div className="hidden md:flex w-full flex-col items-center justify-center gap-2 text-center">
              {booking.isPaid ? (
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Paid
                  <DownloadTcket booking={booking} />
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Pending
                  </span>
                  <button
                    className="mt-1 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md shadow cursor-pointer"
                    onClick={() => handlePayNow(booking)}
                  >
                    Pay Now
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                  currentPage === i + 1
                    ? "bg-black text-white font-bold"
                    : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {/* Empty State */}
      {userBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500">You haven't made any bookings yet.</p>
        </div>
      )}

      {/* Payment Popup */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Booking Details
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Hotel Info */}
              <div className="flex items-center space-x-4">
                <img loading="lazy"
                  src={
                    (selectedBooking.room &&
                      selectedBooking.room.images &&
                      selectedBooking.room.images[0]) ||
                    "/placeholder.svg"
                  }
                  alt={selectedBooking.hotel.hotelName}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedBooking.hotel.hotelName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.room.roomType}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedBooking.hotel.address}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check In:</span>
                  <span className="font-medium">
                    {new Date(selectedBooking.checkInDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check Out:</span>
                  <span className="font-medium">
                    {new Date(selectedBooking.checkOutDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{selectedBooking.guests}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border-t border-gray-200 pt-4">
                {selectedBooking.isdiscounted ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-gray-900">
                        Coupon Applied
                      </span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coupon Code:</span>
                        <span className="font-medium">DISCOUNT</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-medium text-green-600">
                          $
                          {(
                            selectedBooking.originalPrice -
                            selectedBooking.discountedPrice
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : showCouponInput ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        Apply Coupon
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => handlecheckcoupon(couponCode)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{couponError}</span>
                      </div>
                    )}
                    {appliedCoupon && (
                      <div className="flex items-center space-x-2 text-green-600 text-sm">
                        <Check className="h-4 w-4" />
                        <span>Coupon applied successfully!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleUseCoupon}
                    disabled={selectedBooking.isdiscounted}
                    className={`flex items-center space-x-2 transition-colors cursor-pointer ${
                      selectedBooking.isdiscounted
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    <Tag className="h-4 w-4" />
                    <span>
                      {selectedBooking.isdiscounted
                        ? "Coupon Applied"
                        : "Use Coupon"}
                    </span>
                  </button>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Price:</span>
                  <span
                    className={
                      appliedCoupon || selectedBooking.isdiscounted
                        ? "line-through text-gray-500"
                        : "font-semibold"
                    }
                  >
                    ${selectedBooking.originalPrice}
                  </span>
                </div>

                {(appliedCoupon || selectedBooking.isdiscounted) && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>
                        -$
                        {appliedCoupon
                          ? (
                              selectedBooking.originalPrice -
                              selectedBooking.discountedPrice
                            ).toFixed(2)
                          : (
                              selectedBooking.originalPrice -
                              selectedBooking.discountedPrice
                            ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                      <span>Final Price:</span>
                      <span className="text-green-600">
                        $
                        {appliedCoupon
                          ? calculateDiscountedPrice(
                              selectedBooking.originalPrice,
                              appliedCoupon,
                            ).toFixed(2)
                          : selectedBooking.discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}

                {!(appliedCoupon || selectedBooking.isdiscounted) && (
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span>${selectedBooking.originalPrice}</span>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handleProceedToPayment}
                className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MyBooking);
