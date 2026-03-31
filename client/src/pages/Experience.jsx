import { useState, useRef, useCallback, memo } from "react";
import ExperienceHeroSection from "../components/ExperienceHeroSection";
import ExperienceImageGallary from "../components/ExperienceImageGallary";
import ExperienceCards from "../components/ExperienceCards";
import ExperienceCustomerReviews from "../components/ExperienceCustomerReviews";
import ExperienceBookingForm from "../components/ExperienceBookingForm";

const MemoizedHeroSection = memo(ExperienceHeroSection);
const MemoizedImageGallary = memo(ExperienceImageGallary);
const MemoizedExperienceCards = memo(ExperienceCards);
const MemoizedCustomerReviews = memo(ExperienceCustomerReviews);
const MemoizedBookingForm = memo(ExperienceBookingForm);

const Experience = memo(() => {
  const bookingFormRef = useRef(null);
  const [selectedExperience, setSelectedExperience] = useState("");

  const scrollToBooking = useCallback(() => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleBookNow = useCallback(
    (experienceId) => {
      setSelectedExperience(experienceId);
      scrollToBooking();
    },
    [scrollToBooking],
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MemoizedHeroSection onCTAClick={scrollToBooking} />

      {/* Image Gallery */}
      <MemoizedImageGallary />

      {/* Experience Cards - Positioned below Image Gallery */}
      <MemoizedExperienceCards onBookNow={handleBookNow} />

      {/* Customer Reviews - Above Booking Form */}
      <MemoizedCustomerReviews />

      {/* Booking Form */}
      <div ref={bookingFormRef}>
        <MemoizedBookingForm selectedExperience={selectedExperience} />
      </div>
    </div>
  );
});

export default Experience;
