import React from "react";
import { motion } from "framer-motion";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";

const ExperienceImageGallary = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Sunset trekking adventure",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=300",
      alt: "Luxury spa treatment",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=350&width=350",
      alt: "Gourmet dining experience",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=300&width=500",
      alt: "Cultural art workshop",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Family enjoying activities",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Mountain sunset view",
    },
  ];
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
            Moments of Joy
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our guests are experiencing and get inspired for your next
            adventure
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={fadeInUp}
              className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceImageGallary;
