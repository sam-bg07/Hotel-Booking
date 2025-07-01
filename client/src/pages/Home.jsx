import Hero from "../components/Hero";
import HotelCardFeatured from "../components/HotelCardFeatured";
import ExclusiveOffer from "../components/ExclusiveOffer";
import GuestCard from "../components/GuestCard";
import StayUpdatedSection from "../components/StayUpdatedSection";

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
