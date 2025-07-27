// import { Hotel, ShieldCheck, MapPin } from "lucide-react";

// export const AboutSection = () => {
//   const features = [
//     {
//       icon: Hotel,
//       title: "Premium Stays",
//       description:
//         "Handpicked luxury accommodations that exceed your expectations with world-class amenities and exceptional service.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Trusted Security",
//       description:
//         "Your safety and privacy are our top priorities. Secure booking process with verified properties and 24/7 support.",
//     },
//     {
//       icon: MapPin,
//       title: "Prime Locations",
//       description:
//         "Strategic locations in the heart of destinations, offering easy access to attractions, dining, and local experiences.",
//     },
//   ];

//   return (
//     <section
//       className="bg-white py-16 px-4 sm:px-6 lg:px-8"
//       aria-labelledby="about-heading"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h2
//             id="about-heading"
//             className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
//           >
//             Why Choose QuickStay?
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             At QuickStay, we're committed to transforming your travel experience
//             with carefully curated accommodations, seamless booking, and
//             unparalleled service. Whether you're planning a weekend getaway or
//             an extended retreat, we ensure every stay is memorable and
//             hassle-free.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
//               >
//                 <div className="flex justify-center mb-4">
//                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//                     <IconComponent
//                       className="w-8 h-8 text-blue-600"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-12">
//           <p className="text-gray-600 mb-6">
//             Ready to experience the QuickStay difference?
//           </p>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//             Start Your Journey
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Hotel, ShieldCheck, MapPin } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AboutSection = () => {
  const navigate = useNavigate();

  const features = useMemo(() => [
    {
      icon: Hotel,
      title: "Premium Stays",
      description:
        "Handpicked luxury accommodations that exceed your expectations with world-class amenities and exceptional service.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Security",
      description:
        "Your safety and privacy are our top priorities. Secure booking process with verified properties and 24/7 support.",
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description:
        "Strategic locations in the heart of destinations, offering easy access to attractions, dining, and local experiences.",
    },
  ]);

  return (
    <section
      className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose QuickStay?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At QuickStay, we're committed to transforming your travel experience
            with carefully curated accommodations, seamless booking, and
            unparalleled service. Whether you're planning a weekend getaway or
            an extended retreat, we ensure every stay is memorable and
            hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <IconComponent
                      className="w-8 h-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to experience the QuickStay difference?
          </p>
          <button
            onClick={() => {
              navigate("/hotels"), scrollTo(0, 0);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};
