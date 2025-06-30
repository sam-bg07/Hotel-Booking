import React from "react";
import { assets, testimonials } from "../assets/assets";

const GuestCard = () => {
  const rating = 4;
  return (
    <div className=" my-20 flex flex-col items-center justify-center">
      <span className="text-4xl font-stretch-500% text-center max-sm:mx-6">
        Guest Words from Around the World
      </span>
      <p className="text-gray-600 mt-5 mx-3 text-center max-sm:mx-4 max-w-180 ">
        Experience the reason seasoned travelers return to QuickStay: curated
        luxury, seamless stays, and distinguished service worldwide.
      </p>

      {/* { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides." }, */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 lg:px-24 mt-20 w-full">
        {testimonials.map((data, index) => (
          <div
            key={data.id}
            className="bg-white p-6 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.3),_0_1px_3px_rgba(255,255,255,0.1)]"
          >
            {/* User Image and Name */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={data.image}
                alt={data.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  {data.name}
                </h3>
                <p className="text-gray-500 text-sm">{data.address}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={
                    star <= data.rating
                      ? assets.starIconFilled
                      : assets.starIconOutlined
                  }
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {data.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestCard;
