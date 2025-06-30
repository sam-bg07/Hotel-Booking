import React from "react";
import Hero from "./Hero";
import HotelCardFeatured from "./HotelCardFeatured";
import ExclusiveOffer from "./ExclusiveOffer";
import GuestCard from "./GuestCard";
import StayUpdatedSection from "./StayUpdatedSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <HotelCardFeatured />
      {/* Add more components as needed */}
      <ExclusiveOffer />
      <GuestCard />
      <StayUpdatedSection />
    </div>
  );
};

export default Home;
