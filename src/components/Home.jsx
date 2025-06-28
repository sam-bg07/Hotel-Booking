import React from "react";
import Hero from "./Hero";
import HotelCardFeatured from "./HotelCardFeatured";
import ExclusiveOffer from "./ExclusiveOffer";

const Home = () => {
  return (
    <div>
      <Hero />
      <HotelCardFeatured />
      {/* Add more components as needed */}
      <ExclusiveOffer />
    </div>
  );
};

export default Home;
