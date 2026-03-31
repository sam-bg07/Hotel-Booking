import logger from "../utils/logger.js";
import React, { useEffect, useState } from "react";
import { exclusiveOffers } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { MoveRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const ExclusiveOffer = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const navigate = useNavigate();

  const fetch3coupons = async () => {
    try {
      const { data } = await axios.get("/api/coupon/get3coupons");

      if (data.success) {
        setCoupons(data.coupons);
        logger.info(data.coupons);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetch3coupons();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 mt-10 flex flex-col items-center  text-center py-16">
      <p>
        <span className="text-5xl font-stretch-500%">Exclusive Offers</span>
      </p>
      <div className="text-gray-600 mt-5 max-sm:mx-4">
        Take advantage of our handpicked deals and seasonal packages created
        just for you.
        <br />
        Whether it’s a weekend escape or an extended retreat, now is the perfect
        time to make your travel dreams a reality.
        <br />
        Book today and let us take care of the rest.
      </div>

      <div className="px-6 md:px-16 lg:px-24 flex flex-wrap justify-center gap-4  mt-20 w-full group ">
        {coupons.map((offer, index) => (
          <NavLink
            key={offer._id}
            to={`/hotels?couponId=${offer._id}`}
            onMouseEnter={() => setHoveredCard(offer._id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={` ${
              hoveredCard && hoveredCard !== offer._id
                ? "opacity-50"
                : "opacity-100"
            } max-w-100 flex relative rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0px_1px_3px_rgba(0,0,0,0.4)]`}
          >
            <img src="landing.jpeg" alt="firstImage" />
            <div className="absolute inset-0  flex  justify-between items-start flex-col p-4 text-white">
              {/* Discount Badge */}
              <span className="bg-gray-900/80 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full self-start">
                <span className="font-bold">{offer.discountValue}%</span> OFF
              </span>

              {/* Bottom Text (you can customize further) */}
              <div className="text-start">
                <h3 className="text-2xl  font-stretch-100%">{offer.title}</h3>
                <p className="text-md text-gray-100 mt-1">
                  {offer.description}
                </p>
                <p className="text-xs text-sky-300 mt-1.5">
                  Expires on {formatDate(offer.validUntil)}
                </p>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <span className=" inline-block font-semibold ">
                  Use Coupons
                </span>
                <MoveRightIcon
                  className={`${
                    hoveredCard && hoveredCard !== offer._id
                      ? "opacity-50"
                      : "group-hover:translate-x-3"
                  }  translate-x-0 duration-300`}
                />
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffer;
