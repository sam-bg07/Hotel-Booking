import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ExperienceCard = ({ experience, onBookNow }) => {
  const Icon = experience.icon;

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div
          className={`w-16 h-16 rounded-full ${experience.color} flex items-center justify-center`}
        >
          <Icon className="w-8 h-8 transition-all duration-500 group-hover:rotate-180" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          {experience.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {experience.description}
        </p>
      </div>

      {/* Book Now Button */}
      <button
        onClick={() => onBookNow(experience.id)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center cursor-pointer"
      >
        <Check className="w-5 h-5 mr-2" />
        Book Now
      </button>
    </motion.div>
  );
};

export default ExperienceCard;
