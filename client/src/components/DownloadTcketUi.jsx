// import {
//   Calendar,
//   MapPin,
//   Users,
//   Phone,
//   Mail,
//   Wifi,
//   Car,
//   Coffee,
//   Dumbbell,
//   Check,
//   Download,
//   Share2,
// } from "lucide-react";

// const DownloadTcketUi = ({ booking }) => {
//   // Your provided booking data
//   const bookingData = {
//     user: "user_305X3rZnda5AI1dqadFRXbf3wC5",
//     hotel: "688497c1951aca4925c77cb5",
//     room: "6884988a951aca4925c77cd6",
//     checkInDate: "2025-08-02T00:00:00.000+00:00",
//     checkOutDate: "2025-08-03T00:00:00.000+00:00",
//     originalPrice: 544,
//     discountedPrice: 435.2,
//     isDiscounted: true,
//     guests: 1,
//   };

//   // Mock hotel and room details (since we only have IDs)
//   const hotelDetails = {
//     name: "Grand Plaza Hotel & Resort",
//     address: "123 Ocean Drive, Miami Beach, FL 33139",
//     phone: "+1 (305) 555-0123",
//     email: "reservations@grandplaza.com",
//     rating: 4.8,
//     image: "/placeholder.svg?height=200&width=300&text=Grand+Plaza+Hotel",
//   };

//   const roomDetails = {
//     type: "Deluxe Ocean View Suite",
//     bedType: "King Size Bed",
//     size: "45 sqm",
//     maxOccupancy: 2,
//     amenities: [
//       "Ocean View",
//       "Free WiFi",
//       "Mini Bar",
//       "Room Service",
//       "Air Conditioning",
//       "Balcony",
//     ],
//   };

//   const guestDetails = {
//     name: "John Doe",
//     email: "john.doe@email.com",
//     phone: "+1 (555) 123-4567",
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     return new Date(dateString).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const calculateNights = () => {
//     const checkIn = new Date(booking.checkInDate);
//     const checkOut = new Date(booking.checkOutDate);
//     const diffTime = Math.abs(checkOut - checkIn);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const bookingReference = `BK${Date.now().toString().slice(-8)}`;
//   const nights = calculateNights();

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Main Ticket */}
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Success Banner */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 text-center">
//             <div className="flex items-center justify-center mb-2">
//               <Check className="h-8 w-8 mr-2" />
//               <span className="text-2xl font-bold">Booking Confirmed!</span>
//             </div>
//             <p className="text-green-100">
//               Confirmation Number:{" "}
//               <span className="font-bold">{bookingReference}</span>
//             </p>
//           </div>

//           <div className="p-8">
//             {/* Hotel Information */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//               <div className="lg:col-span-2">
//                 <div className="flex items-start space-x-4">
//                   <img
//                     src={booking.room.images[0] || "/placeholder.svg"}
//                     alt={booking.hotel.hotelName}
//                     className="w-24 h-24 rounded-lg object-cover shadow-md"
//                   />
//                   <div className="flex-1">
//                     <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-2">
//                       {booking.hotel.hotelName}
//                     </h2>
//                     <div className="flex items-center text-gray-600 mb-2">
//                       <MapPin className="h-4 w-4 mr-2" />
//                       <span className="text-sm">{booking.hotel.address}</span>
//                     </div>
//                     <div className="flex items-center space-x-4 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <Phone className="h-4 w-4 mr-1" />
//                         <span>{booking.hotel.phoneNumber}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {/* Check-in */}
//               <div className="bg-blue-50 rounded-lg p-6">
//                 <div className="flex items-center mb-3">
//                   <Calendar className="h-5 w-5 text-blue-600 mr-2" />
//                   <h3 className="font-semibold text-gray-900">Check-in</h3>
//                 </div>
//                 <p className="text-lg font-bold text-gray-900">
//                   {formatDate(booking.checkInDate)}
//                 </p>
//                 <p className="text-sm text-gray-600">After 3:00 PM</p>
//               </div>

//               {/* Check-out */}
//               <div className="bg-red-50 rounded-lg p-6">
//                 <div className="flex items-center mb-3">
//                   <Calendar className="h-5 w-5 text-red-600 mr-2" />
//                   <h3 className="font-semibold text-gray-900">Check-out</h3>
//                 </div>
//                 <p className="text-lg font-bold text-gray-900">
//                   {formatDate(booking.checkOutDate)}
//                 </p>
//                 <p className="text-sm text-gray-600">Before 11:00 AM</p>
//               </div>

//               {/* Duration & Guests */}
//               <div className="bg-green-50 rounded-lg p-6">
//                 <div className="flex items-center mb-3">
//                   <Users className="h-5 w-5 text-green-600 mr-2" />
//                   <h3 className="font-semibold text-gray-900">Stay Details</h3>
//                 </div>
//                 <p className="text-lg font-bold text-gray-900">
//                   {nights} Night{nights > 1 ? "s" : ""}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
//                 </p>
//               </div>
//             </div>

//             {/* Room Details */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Room Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-2">
//                     {booking.room.roomType}
//                   </h4>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <p>
//                       <span className="font-medium">Max Occupancy:</span>{" "}
//                       {booking.guests} guests
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-2">
//                     Room Amenities
//                   </h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {booking.room.facilities.map((amenity, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center text-sm text-gray-600"
//                       >
//                         <Check className="h-3 w-3 text-green-500 mr-2" />
//                         <span>{amenity}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Guest Information */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Guest Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">
//                     Primary Guest
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {booking.user.firstName} {booking.user.lastName}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Email</p>
//                   <p className="text-gray-900">{booking.user.email}</p>
//                 </div>
//                 {/* <div>
//                   <p className="text-sm font-medium text-gray-700">Phone</p>
//                   <p className="text-gray-900">{guestDetails.phone}</p>
//                 </div> */}
//               </div>
//             </div>

//             {/* Price Summary */}
//             <div className="border-t border-gray-200 bg-gray-50 rounded-lg pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Original Price:</span>
//                 <span
//                   className={
//                     booking.isdiscounted
//                       ? "line-through text-gray-500"
//                       : "font-semibold"
//                   }
//                 >
//                   ${booking.originalPrice}
//                 </span>
//               </div>

//               {booking.isdiscounted && (
//                 <>
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount Applied</span>
//                     <span>
//                       -$
//                       {(
//                         booking.originalPrice - booking.discountedPrice
//                       ).toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
//                     <span>Final Price:</span>
//                     <span className="text-green-600">
//                       ${booking.discountedPrice.toFixed(2)}
//                     </span>
//                   </div>
//                 </>
//               )}

//               {!booking.isdiscounted && (
//                 <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
//                   <span>Total:</span>
//                   <span>${booking.originalPrice}</span>
//                 </div>
//               )}
//             </div>

//             {/* Hotel Amenities */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Hotel Amenities
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="flex items-center text-gray-600">
//                   <Wifi className="h-5 w-5 mr-2 text-blue-500" />
//                   <span className="text-sm">Free WiFi</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Car className="h-5 w-5 mr-2 text-blue-500" />
//                   <span className="text-sm">Parking</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Coffee className="h-5 w-5 mr-2 text-blue-500" />
//                   <span className="text-sm">Restaurant</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Dumbbell className="h-5 w-5 mr-2 text-blue-500" />
//                   <span className="text-sm">Fitness Center</span>
//                 </div>
//               </div>
//             </div>

//             {/* Important Information */}
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
//               <h3 className="text-lg font-bold text-yellow-800 mb-3">
//                 Important Information
//               </h3>
//               <ul className="space-y-2 text-sm text-yellow-700">
//                 <li>• Please bring a valid photo ID for check-in</li>
//                 <li>
//                   • Check-in time is 3:00 PM, early check-in subject to
//                   availability
//                 </li>
//                 <li>
//                   • Check-out time is 11:00 AM, late check-out may incur
//                   additional charges
//                 </li>
//                 <li>
//                   • Cancellation policy: Free cancellation up to 24 hours before
//                   check-in
//                 </li>
//                 <li>
//                   • For any changes or inquiries, contact the hotel directly
//                 </li>
//               </ul>
//             </div>

//             {/* Footer */}
//             <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
//               <p>Thank you for choosing {booking.hotel.hotelName}!</p>
//               <p className="mt-2">
//                 Booking ID: {booking.hotel._id} | User ID: {booking.user._id}
//               </p>
//               <p className="mt-2">
//                 For support, contact us at support@grandplaza.com or +1 (305)
//                 555-0199
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadTcketUi;

import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Check,
  Download,
  Share2,
  Star,
  Clock,
  CreditCard,
  Shield,
  Gift,
  Sparkles,
} from "lucide-react";

const DownloadTicketUi = ({ booking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const bookingReference = `BK${Date.now().toString().slice(-8)}`;
  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Floating Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg mb-4">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">Your dream stay awaits</p>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
        </div>

        {/* Main Ticket Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          {/* Success Banner with Animation */}
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-1"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                  <Sparkles className="h-8 w-8 text-green-800 animate-pulse" />
                </div>
                <span className="text-3xl font-bold">
                  Reservation Confirmed
                </span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-6 py-2 inline-block">
                <p className="text-gray-900 font-semibold">
                  Confirmation:{" "}
                  <span className="text-gray-900 font-bold">
                    {bookingReference}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            {/* Hotel Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-3">
                <div className="relative">
                  <img
                    src={booking.room.images[0] || "/placeholder.svg"}
                    alt={booking.hotel.hotelName}
                    className="w-full h-64 rounded-2xl mb-2 object-cover shadow-lg"
                  />
                  <img
                    src={booking.room.images[1] || "/placeholder.svg"}
                    alt={booking.hotel.hotelName}
                    className="w-full h-64 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {booking.hotel.hotelName}
                    </h2>
                    <div className="flex items-center text-white/90 mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-lg">{booking.hotel.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{booking.hotel.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-800">
                      {nights}
                    </span>
                  </div>
                  <h3 className="font-bold text-blue-900 text-lg">
                    Night{nights > 1 ? "s" : ""}
                  </h3>
                  <p className="text-blue-700">Perfect getaway</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-800">
                      {booking.guests}
                    </span>
                  </div>
                  <h3 className="font-bold text-purple-900 text-lg">
                    Guest{booking.guests > 1 ? "s" : ""}
                  </h3>
                  <p className="text-purple-700">Luxury experience</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <Gift className="h-8 w-8 text-green-600" />
                    <span className="text-lg font-bold text-green-800">
                      {booking.isdiscounted ? "Saved!" : "Premium"}
                    </span>
                  </div>
                  <h3 className="font-bold text-green-900 text-lg">
                    {booking.isdiscounted ? "Discount Applied" : "Best Rate"}
                  </h3>
                  <p className="text-green-700">Great value</p>
                </div>
              </div>
            </div>

            {/* Check-in/Check-out Timeline */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center relative z-10">
                Your Stay Timeline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Check-in */}
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          Check-in
                        </h4>
                        <p className="text-blue-600 font-semibold">
                          Welcome Day
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {formatDate(booking.checkInDate)}
                    </p>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>After 3:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Check-out */}
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-red-100 rounded-full p-3 mr-4">
                        <Calendar className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          Check-out
                        </h4>
                        <p className="text-red-600 font-semibold">
                          Departure Day
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {formatDate(booking.checkOutDate)}
                    </p>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Before 11:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-red-500"></div>
            </div>

            {/* Room & Guest Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Room Details */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900">
                    Room Details
                  </h3>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-indigo-800 text-xl mb-3">
                    {booking.room.roomType}
                  </h4>
                  <p className="text-indigo-700 mb-4">
                    <span className="font-semibold">Max Occupancy:</span>{" "}
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 mb-4">
                    Premium Amenities
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {booking.room.facilities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white rounded-lg p-3 shadow-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-gray-700 font-medium">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-100 rounded-full p-3 mr-4">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900">
                    Guest Information
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">
                      Primary Guest
                    </p>
                    <p className="text-xl font-bold text-emerald-900">
                      {booking.user.firstName} {booking.user.lastName}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">
                      Email Address
                    </p>
                    <p className="text-emerald-800 font-medium">
                      {booking.user.email}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">
                      Booking Status
                    </p>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-700 font-semibold">
                        Confirmed & Protected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 border border-yellow-200">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-900">
                  Pricing Summary
                </h3>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Original Price:</span>
                  <span
                    className={
                      booking.isdiscounted
                        ? "line-through text-gray-500 text-lg"
                        : "font-bold text-gray-900 text-lg"
                    }
                  >
                    ${booking.originalPrice}
                  </span>
                </div>

                {booking.isdiscounted && (
                  <>
                    <div className="flex justify-between items-center text-green-600">
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 mr-2" />
                        <span className="text-lg font-semibold">
                          Discount Applied
                        </span>
                      </div>
                      <span className="text-lg font-bold">
                        -$
                        {(
                          booking.originalPrice - booking.discountedPrice
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          Final Price:
                        </span>
                        <span className="text-3xl font-bold text-green-600">
                          ${booking.discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {!booking.isdiscounted && (
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        Total:
                      </span>
                      <span className="text-3xl font-bold text-blue-600">
                        ${booking.originalPrice}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">
                Hotel Amenities & Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Wifi, label: "Free WiFi", color: "text-blue-500" },
                  { icon: Car, label: "Parking", color: "text-green-500" },
                  {
                    icon: Coffee,
                    label: "Restaurant",
                    color: "text-orange-500",
                  },
                  {
                    icon: Dumbbell,
                    label: "Fitness Center",
                    color: "text-purple-500",
                  },
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <amenity.icon
                      className={`h-8 w-8 mx-auto mb-3 ${amenity.color}`}
                    />
                    <span className="text-gray-700 font-semibold">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-3" />
                Important Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Please bring a valid photo ID for check-in",
                  "Check-in time is 3:00 PM, early check-in subject to availability",
                  "Check-out time is 11:00 AM, late check-out may incur additional charges",
                  "Cancellation policy: Free cancellation up to 24 hours before check-in",
                  "For any changes or inquiries, contact the hotel directly",
                ].map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm"
                  >
                    <Check className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-700">{info}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-t border-gray-200">
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank you for choosing {booking.hotel.hotelName}!
                </h4>
                <p className="text-gray-600">
                  We look forward to providing you with an exceptional
                  experience
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  Booking ID:{" "}
                  <span className="font-mono font-semibold">
                    {booking.hotel._id}
                  </span>{" "}
                  | User ID:{" "}
                  <span className="font-mono font-semibold">
                    {booking.user._id}
                  </span>
                </p>
                <p>
                  For support, contact us at{" "}
                  <span className="text-blue-600 font-semibold">
                    support@grandplaza.com
                  </span>{" "}
                  or{" "}
                  <span className="text-blue-600 font-semibold">
                    +1 (305) 555-0199
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadTicketUi;
