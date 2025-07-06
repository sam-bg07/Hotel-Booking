import { useState, useRef } from "react";
import ExperienceHeroSection from "../components/ExperienceHeroSection";
import ExperienceImageGallary from "../components/ExperienceImageGallary";
import ExperienceCards from "../components/ExperienceCards";
import ExperienceCustomerReviews from "../components/ExperienceCustomerReviews";
import ExperienceBookingForm from "../components/ExperienceBookingForm";

const Experience = () => {
  const bookingFormRef = useRef(null);
  const [selectedExperience, setSelectedExperience] = useState("");

  const scrollToBooking = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = (experienceId) => {
    setSelectedExperience(experienceId);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ExperienceHeroSection onCTAClick={scrollToBooking} />

      {/* Image Gallery */}
      <ExperienceImageGallary />

      {/* Experience Cards - Positioned below Image Gallery */}
      <ExperienceCards onBookNow={handleBookNow} />

      {/* Customer Reviews - Above Booking Form */}
      <ExperienceCustomerReviews />

      {/* Booking Form */}
      <div ref={bookingFormRef}>
        <ExperienceBookingForm selectedExperience={selectedExperience} />
      </div>
    </div>
  );
};

export default Experience;
