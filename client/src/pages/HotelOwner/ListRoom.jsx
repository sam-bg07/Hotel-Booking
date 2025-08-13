import { useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { getToken, user } = UseAppContext();
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/rooms/hotel", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      const { rooms } = data.rooms;

      if (data.success) {
        setRooms(data.rooms);
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
  // const toggleRoomStatus = (id) => {
  //   setRooms(
  //     rooms.map((room) =>
  //       room.id === id ? { ...room, isActive: !room.isActive } : room
  //     )
  //   );
  // };

  const toggleRoomStatus = async (roomId) => {
    // Optimistically update UI
    const updatedRooms = rooms.map((room) =>
      room._id === roomId ? { ...room, isAvailable: !room.isAvailable } : room
    );
    setRooms(updatedRooms);

    try {
      const { data } = await axios.post(
        `/api/rooms/toggle-availability/${roomId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success("Room availability toggled successfully");
        // Optionally refresh rooms from server to sync state
        // await fetchRooms();
      } else {
        toast.error(data.message);
        // Revert UI update on failure
        setRooms(rooms);
      }
    } catch (error) {
      toast.error(error.message);
      // Revert UI update on error
      setRooms(rooms);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="w-full  mt-20 px-6 md:px-12 min-h-screen lg:px-20 py-10 z-30 max-md:mt-30">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">List of Rooms</h1>
      <p className="text-gray-500 mb-8 max-w-xl">
        Monitor your room listings, track bookings and analyze revenue—all in
        one place. Stay updated with real-time insights to ensure smooth
        operations.
      </p>
      <p className="text-gray-500 mt-8">All Rooms</p>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap max-sm:hidden">
                  Facility
                </th>
                <th className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                  Price / Night
                </th>
                <th className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rooms.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.roomType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {item.facilities.join(",")}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300">
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                        item.isAvailable ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      onClick={() => toggleRoomStatus(item._id)}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.isAvailable ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden space-y-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              {/* Header with name, price and toggle */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {room.roomType}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ${room.price}
                    </span>
                    <span className="text-sm text-gray-500"> /night</span>
                  </div>
                </div>
                <div className="ml-4">
                  {/* Custom Toggle Switch for Mobile */}
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      room.isAvailable ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    onClick={() => toggleRoomStatus(room._id)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        room.isAvailable ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Facilities section */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Facilities:</p>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status indicator */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      room.isAvailable ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      room.isAvailable ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {room.isAvailable ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoom;
