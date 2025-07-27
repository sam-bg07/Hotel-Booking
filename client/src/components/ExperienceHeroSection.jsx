import React from "react";
import { motion } from "framer-motion";

const ExperienceHeroSection = ({ onCTAClick }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing.jpeg"
          alt="Unforgettable experiences"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Unforgettable Experiences Await
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Discover extraordinary moments that will create lasting memories. From
          wellness retreats to thrilling adventures, your perfect experience is
          just a click away.
        </p>
        <button
          onClick={onCTAClick}
          className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20 cursor-pointer"
        >
          Book Your Experience
        </button>
      </motion.div>
    </section>
  );
};

export default ExperienceHeroSection;
