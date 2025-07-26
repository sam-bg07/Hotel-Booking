import { motion } from "framer-motion";
import { Calendar, MessageSquare, Star, Quote } from "lucide-react";

const ExperienceCustomerReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // const ExperienceIcon = review.experienceIcon;

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl min-h-80 md:min-h-80 p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
    >
      {/* Gradient Background Accent */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-600" />

      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative">
        {/* Mobile: Top Section - User Info */}
        <div className="flex md:flex-col items-center md:items-center text-center w-full md:w-[20%] md:flex-shrink-0">
          {/* Mobile: Horizontal layout for avatar and basic info */}
          <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-0 w-full">
            {/* Avatar */}
            <div className="p-1 rounded-full flex-shrink-0">
              <img
                src={
                  review?.bookingId?.user?.image ||
                  "/placeholder.svg?height=80&width=80&text=User"
                }
                alt={review.fullName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover bg-white"
              />
            </div>

            {/* Mobile: User details next to avatar */}
            <div className="flex-1 md:flex-none text-left md:text-center md:mb-4 md:mt-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                {review.fullName}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                {review.bookingId?.hotel.address || "Unknown address"},{" "}
                {review.bookingId?.hotel.city || "Unknown city"}
              </p>
              <div className="flex items-center md:justify-center gap-1 mb-2 md:mb-3">
                {renderStars(review.rating)}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-fuchsia-50 text-xs md:text-sm font-medium mt-3 md:mt-0 md:mb-4">
                {review.experience}
              </div>
            </div>
          </div>

          {/* Experience Badge - Full width on mobile */}
        </div>

        {/* Review Content */}
        <div className="flex-1 space-y-3 md:space-y-4 w-full md:w-[70%] mt-4 md:mt-0">
          {/* Date */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-700">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              {formatDate(review.date)}
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="space-y-3">
            <blockquote className="text-gray-700 leading-relaxed text-sm md:text-lg italic relative">
              "{review.feedback}"
            </blockquote>

            {/* Special Requests */}
            {review.specialRequests && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Special Request:
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {review.specialRequests}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCustomerReviewCard;
