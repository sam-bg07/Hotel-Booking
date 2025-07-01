import React from "react";
import { assets } from "../assets/assets";

const StayUpdatedSection = () => {
  return (
    <div className="mt-28 mb-14 bg-blue-50 rounded-2xl shadow-xl mx-4 sm:mx-10 md:mx-20">
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 max-md:gap-y-14 px-4 sm:px-8">
        <img
          src={assets.newsLetter}
          alt="newsLetterImage"
          className="sm:h-80 h-64 mx-auto"
        />

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left mx-4 gap-y-4">
          <span className="md:text-4xl text-2xl font-semibold text-gray-900">
            Subscribe to our newsletter to receive more updates
          </span>

          <p className="text-gray-600 mt-2 sm:mx-0 max-sm:mx-2 text-sm sm:text-base leading-relaxed">
            Sign up for our weekly newsletter to stay informed about exciting
            offers, our latest products, and industry updates. Receive amazing
            deals directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="email"
              id="userEmail"
              name="email"
              required
              placeholder="Enter Your Email"
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayUpdatedSection;
