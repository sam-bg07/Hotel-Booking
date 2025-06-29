import React from "react";
import Hero from "./Hero";
import HotelCardFeatured from "./HotelCardFeatured";
import ExclusiveOffer from "./ExclusiveOffer";
import GuestCard from "./GuestCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <HotelCardFeatured />
      {/* Add more components as needed */}
      <ExclusiveOffer />
      <GuestCard />
    </div>
  );
};

export default Home;
