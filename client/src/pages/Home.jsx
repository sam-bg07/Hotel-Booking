import React, { memo } from "react";
import Hero from "../components/Hero";
import HotelCardFeatured from "../components/HotelCardFeatured";
import ExclusiveOffer from "../components/ExclusiveOffer";
import GuestCard from "../components/GuestCard";
import StayUpdatedSection from "../components/StayUpdatedSection";

const MemoizedHero = memo(Hero);
const MemoizedHotelCardFeatured = memo(HotelCardFeatured);
const MemoizedExclusiveOffer = memo(ExclusiveOffer);
const MemoizedGuestCard = memo(GuestCard);
const MemoizedStayUpdatedSection = memo(StayUpdatedSection);

const Home = memo(() => {
  return (
    <div>
      <MemoizedHero />
      <MemoizedHotelCardFeatured />
      <MemoizedExclusiveOffer />
      <MemoizedGuestCard />
      <MemoizedStayUpdatedSection />
    </div>
  );
});

export default Home;
