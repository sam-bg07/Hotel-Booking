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
      className="bg-white rounded-2xl min-h-80 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
    >
      {/* Gradient Background Accent */}
      <div className={`absolute top-0 left-0 w-2 h-full `} />

      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-12 h-12 text-gray-400" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Left Side - User Info */}
        <div className="flex-shrink-0 flex flex-col items-center text-center lg:text-left w-[20%]">
          {/* Avatar with gradient border */}
          <div className={`p-1 rounded-full  mb-4`}>
            <img
              src={review?.bookingId?.user?.image || "badme hai badme"}
              alt={review.fullName}
              className="w-20 h-20 rounded-full object-cover bg-white"
            />
          </div>

          {/* User Details */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {review.fullName}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {review.bookingId?.hotel.address || "Unknown address"} ,{" "}
              {review.bookingId?.hotel.city || "Unknown city"}
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-1 mb-3">
              {renderStars(review.rating)}
            </div>
          </div>

          {/* Experience Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r  text-white text-sm font-medium mb-4`}
          >
            {/* <ExperienceIcon className="w-4 h-4" /> */}
            {review.experience}
          </div>
        </div>

        {/* Right Side - Review Content */}
        <div className="flex-1 space-y-4 w-[70%]">
          {/* Experience Details in Pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              <Calendar className="w-4 h-4" />
              {formatDate(review.date)}
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="space-y-3">
            <blockquote className="text-gray-700 leading-relaxed text-lg italic relative">
              "{review.feedback}"
            </blockquote>

            {/* Special Requests */}
            {review.specialRequests && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Special Request:
                    </p>
                    <p className="text-sm text-gray-600">
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
