import React from "react";
import { motion } from "framer-motion";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { Sparkles, Mountain, ChefHat } from "lucide-react";
import ExperienceCustomerReviewCard from "./ExperienceCustomerReviewCard";

const ExperienceCustomerReviews = () => {
  const customerReviews = [
    {
      id: 1,
      fullName: "Sarah Johnson",
      experienceName: "Luxury Spa Retreat",
      dateOfExperience: "2024-01-15",
      timeSlot: "Morning",
      numberOfGuests: 2,
      specialRequests: "Couples massage with aromatherapy oils",
      customerFeedback:
        "This was absolutely the most relaxing and rejuvenating experience I've ever had. The spa facilities were world-class, and the staff went above and beyond to ensure we felt pampered. The couples massage was divine, and the aromatherapy oils created such a peaceful atmosphere. My partner and I left feeling completely refreshed and connected.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      location: "New York, NY",
      experienceIcon: Sparkles,
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-500",
    },
    {
      id: 2,
      fullName: "Michael Chen",
      experienceName: "Sunset Trek",
      dateOfExperience: "2024-01-20",
      timeSlot: "Evening",
      numberOfGuests: 4,
      specialRequests: "Photography assistance for family photos",
      customerFeedback:
        "What an incredible adventure! The sunset trek exceeded all our expectations. Our guide was knowledgeable and helped us capture amazing family photos at the perfect spots. The views were breathtaking, and watching the sunset from the mountain peak was a moment we'll treasure forever. The trail was well-maintained and suitable for our family with teenagers.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      location: "San Francisco, CA",
      experienceIcon: Mountain,
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-500",
    },
    {
      id: 3,
      fullName: "Emma Rodriguez",
      experienceName: "Culinary Journey",
      dateOfExperience: "2024-01-25",
      timeSlot: "Afternoon",
      numberOfGuests: 1,
      specialRequests: "Vegetarian cooking class focus",
      customerFeedback:
        "As a vegetarian, I was thrilled to find a culinary experience that catered specifically to plant-based cooking. The chef was incredibly talented and taught me techniques I never knew existed. We prepared a five-course vegetarian meal using fresh, local ingredients. Each dish was more delicious than the last, and I learned so much about flavor combinations.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      location: "Miami, FL",
      experienceIcon: ChefHat,
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-500",
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
          {customerReviews.map((review) => (
            <ExperienceCustomerReviewCard key={review.id} review={review} />
          ))}
        </motion.div>
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceCustomerReviews;
