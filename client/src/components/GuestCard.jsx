import { MessageSquare, Star } from "lucide-react";
import { UseAppContext } from "../context/AppContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

const GuestCard = () => {
  const { experience, setExperience } = UseAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/experiences?page=1&limit=3");
        if (data.success) {
          setExperience(data.experienceBookings);
        }
      } catch (error) {
        console.error("Error fetching experiences in GuestCard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, [setExperience]);

  return (
    <div className=" my-20 flex flex-col items-center justify-center">
      <span className="text-4xl font-stretch-500% text-center max-sm:mx-6">
        Guest Words from Around the World
      </span>
      <p className="text-gray-600 mt-5 mx-3 text-center max-sm:mx-4 max-w-180 ">
        Experience the reason seasoned travelers return to QuickStay: curated
        luxury, seamless stays, and distinguished service worldwide.
      </p>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 lg:px-24 mt-20 w-full animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-800"
            ></div>
          ))}
        </div>
      ) : experience.length === 0 ? (
        <p className="text-gray-400 mt-10">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 lg:px-24 mt-20 w-full">
          {experience.map((data, index) => (
            <div
              key={data._id}
              className="bg-white group p-6 rounded-xl relative shadow-[0_4px_6px_rgba(0,0,0,0.3),_0_1px_3px_rgba(255,255,255,0.1)]
              hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_10px_10px_-5px_rgba(0,0,0,0.04)] 
                       hover:-translate-y-2 hover:scale-[1.02] 
                       transition-all duration-300 ease-in-out cursor-pointer
                       hover:bg-gradient-to-br hover:from-white hover:to-orange-50/30
                       border border-transparent hover:border-orange-100"
            >
              <div
                className="absolute -top-5 left-15 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-110 group-hover:rotate-3
                            transition-all duration-300 ease-in-out shadow-lg group-hover:shadow-orange-200"
              >
                <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              {/* User Image and Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={data.bookingId?.user?.image || "https://img.clerk.com/resources/default-user-profile-picture.png"}
                    alt={data.fullName || "User Avatar"}
                    className="w-12 h-12 rounded-full object-cover group-hover:scale-110 
                             transition-transform duration-300 ease-in-out
                             group-hover:ring-2 group-hover:ring-orange-200 group-hover:ring-offset-2"
                  />
                  <div
                    className="absolute inset-0 rounded-full bg-orange-500/20 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 ease-in-out"
                  ></div>
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
                  <h3
                    className="font-semibold text-xl text-gray-800 group-hover:text-orange-700 
                               transition-colors duration-300"
                  >
                    {data.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300">
                    {data.bookingId?.hotel?.address || "Unknown address"},{" "}
                    {data.bookingId?.hotel?.city || "Unknown city"}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 transition-all duration-300 ease-in-out
                              ${
                                star <= data.rating
                                  ? "text-orange-400 fill-orange-400 group-hover:text-orange-500 group-hover:fill-orange-500"
                                  : "text-gray-300 group-hover:text-gray-400"
                              }
                              group-hover:scale-110`}
                    style={{
                      transitionDelay: `${star * 50}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ease-in-out">
                {data.feedback}
              </p>
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/0 via-orange-400/0 to-orange-400/0 
                            group-hover:from-orange-400/5 group-hover:via-orange-400/10 group-hover:to-orange-400/5 
                            transition-all duration-500 ease-in-out pointer-events-none"
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestCard;
