import React, { useEffect, useState } from "react";
import { CalendarCheck, DollarSign, CreditCard } from "lucide-react";
import axios from "axios";
import { UseAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { currency, getToken, user } = UseAppContext();
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookings, setBookings] = useState([]);

  // Fetch data from the server
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setTotalBookings(data.dashboardData.totalBookings);
        setTotalRevenue(data.dashboardData.totalRevenue);
        setBookings(data.dashboardData.bookings);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);
  return (
    <div className="w-full  mt-20 px-6 md:px-12 lg:px-20 py-10 z-30 max-md:mt-30">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8 max-w-xl">
        Monitor your room listings, track bookings and analyze revenue—all in
        one place. Stay updated with real-time insights to ensure smooth
        operations.
      </p>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ">
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <CalendarCheck className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h2 className="text-xl font-bold">{totalBookings}</h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold">
              {currency} {totalRevenue}
            </h2>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Bookings
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md md:block hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">User Name</th>
              <th className="px-6 py-4 whitespace-nowrap">Room Name</th>
              <th className="px-6 py-4 whitespace-nowrap">Total Amount</th>
              <th className="px-6 py-4 whitespace-nowrap">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{booking.user.name}</td>
                <td className="px-6 py-4">{booking.room.roomType}</td>
                <td className="px-6 py-4">
                  {currency}
                  {booking.totalPrice}
                </td>
                <td className="px-6 py-4">
                  {booking.isPaid ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View (only below sm) */}
      <div className="space-y-4 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-800">
                {booking.hotel.hotelName} - {booking.room.roomType}
              </h3>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  booking.isPaid
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.isPaid ? "Completed" : "Pending"}
              </span>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-500">User:</span>{" "}
                {booking.user.firstName + " " + booking.user.lastName}
              </p>
              <p>
                <span className="font-medium text-gray-500">Amount:</span> $
                {booking.totalPrice}
              </p>
              <p>
                <span className="font-medium text-gray-500">Check-in:</span>{" "}
                {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-500">Check-out:</span>{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
