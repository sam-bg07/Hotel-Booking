import React, { useState } from "react";
import { exclusiveOffers } from "../assets/assets";
import { NavLink } from "react-router-dom";

const ExclusiveOffer = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="bg-gray-50 mt-36 flex flex-col items-center  text-center py-16">
      <p>
        <span className="text-5xl font-stretch-500%">Exclusive Offers</span>
      </p>
      <div className="text-gray-600 mt-5 max-md:text-start max-sm:mx-4">
        Take advantage of our handpicked deals and seasonal packages created
        just for you.
        <br />
        Whether it’s a weekend escape or an extended retreat, now is the perfect
        time to make your travel dreams a reality.
        <br />
        Book today and let us take care of the rest.
      </div>

      {/* Offer Cards Section   exclusiveOffers ${
              hoveredCard && hoveredCard !== offer._id
                ? "bg-black"
                : "bg-red-700"
            }*/}
      <div className="px-6 md:px-16 lg:px-24 flex flex-wrap justify-center gap-4  mt-20 w-full">
        {exclusiveOffers.map((offer, index) => (
          <NavLink
            to={`to="/exclusive-offer/"${offer._id}`}
            onMouseEnter={() => setHoveredCard(offer._id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={` ${
              hoveredCard && hoveredCard !== offer._id
                ? "opacity-50"
                : "opacity-100"
            } max-w-100 flex relative  rounded-md rounded-t-xl hover:translate-y-1 transition-all duration-300 shadow-[0px_1px_3px_rgba(0,0,0,0.4)]`}
          >
            <img
              src={offer?.image}
              alt="firstImage"
              className="rounded-t-xl   "
            />
            <p
              className=" absolute  top-0 left-0 m-2 px-2 py-1 text-yellow-300 bg-black/70
 text-sm rounded"
            >
              <span className=" font-semibold text-md">{offer.priceOff}</span>%
              Off
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffer;
