import React from "react";
import { motion } from "framer-motion";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { Sparkles, Mountain, ChefHat } from "lucide-react";
import ExperienceCustomerReviewCard from "./ExperienceCustomerReviewCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAppContext } from "../context/AppContext.jsx";

const ExperienceCustomerReviews = () => {
 
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const { getToken, experience, setExperience } = UseAppContext();

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
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceCustomerReviews;
