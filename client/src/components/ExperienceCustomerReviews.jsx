import React from "react";
import { motion } from "framer-motion";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { Sparkles, Mountain, ChefHat } from "lucide-react";
import ExperienceCustomerReviewCard from "./ExperienceCustomerReviewCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAppContext } from "../context/AppContext.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExperienceCustomerReviews = () => {
  const { experience, setExperience } = UseAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 3;

  const fetchExperienceBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/experiences?page=${currentPage}&limit=${limit}`);
      if (data.success) {
        setExperience(data.experienceBookings);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceBookings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <ExperienceAnimatedSection className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read authentic reviews from our satisfied customers who have
            experienced unforgettable adventures
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {experience.map((review) => (
            <ExperienceCustomerReviewCard key={review._id} review={review} />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white cursor-pointer"
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
                    : "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceCustomerReviews;
