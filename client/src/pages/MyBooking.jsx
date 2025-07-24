import React, { useEffect, useState } from "react";
import { userBookingsDummyData } from "../assets/assets";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Users,
} from "lucide-react";
import { UseAppContext } from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const MyBooking = () => {
  const { user, getToken } = UseAppContext();
  const [userBookings, setUserBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="mt-40 px-6 md:px-16 lg:px-20 xl:px-28">
      {/* Title Section */}
      <div className="flex flex-col items-start text-left mb-8">
        <h1 className="text-4xl font-stretch-150% font-bold max-sm:mx-6">
          My Bookings
        </h1>
        <p className="text-gray-600 mt-5 max-sm:mx-4 max-w-180">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>

      <div className="max-w-8xl mt-5 w-full mb-24">
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
                  <img
                    src={booking.room.images[0] || "/placeholder.svg"}
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
                      <span className="text-lg font-bold text-gray-900">
                        ${booking.room.price}
                      </span>
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
                            }
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
                            }
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
                          onClick={() => handlePayment(booking._id)}
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

            {/* Desktop Layout - Unchanged */}
            <div className="hidden md:block w-full px-2">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <img
                  src={booking.room.images[0]}
                  alt={booking.hotel.hotelName}
                  className="w-52 lg:w-40 h-32 lg:h-28 object-cover rounded-md shadow border"
                />
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-lg font-poppins text-gray-800">
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
                    <span className="font-semibold text-black">Total:</span> $
                    {booking.room.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Date and Time - Desktop */}
            <div className="hidden w-full md:flex  items-center md:justify-evenly gap-4 text-center">
              <div>
                <p className="font-poppins text-sm">Check In:</p>
                <span className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="font-poppins text-sm">Check Out:</p>
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
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Pending
                  </span>
                  <button
                    className="mt-1 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md shadow cursor-pointer"
                    onClick={() => handlePayment(booking._id)}
                  >
                    Pay Now
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default MyBooking;
