// import { Heart, Globe, Shield, Zap } from "lucide-react";

// export const AboutMissionValues = () => {
//   const values = [
//     {
//       icon: Heart,
//       title: "Customer First",
//       description:
//         "Every decision we make is guided by what's best for our travelers and their experiences.",
//     },
//     {
//       icon: Globe,
//       title: "Global Accessibility",
//       description:
//         "Making luxury travel accessible to everyone, regardless of location or background.",
//     },
//     {
//       icon: Shield,
//       title: "Trust & Transparency",
//       description:
//         "Building lasting relationships through honest communication and reliable service.",
//     },
//     {
//       icon: Zap,
//       title: "Innovation",
//       description:
//         "Continuously improving our platform with cutting-edge technology and user feedback.",
//     },
//   ];

//   return (
//     <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Mission Statement */}
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//               Our Mission
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed mb-6">
//               To revolutionize the way people discover and book luxury
//               accommodations by providing a seamless, trustworthy, and
//               personalized travel experience that creates lasting memories.
//             </p>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               We believe that exceptional travel experiences should be
//               accessible to everyone, and we're committed to making that vision
//               a reality through innovation, partnership, and unwavering
//               dedication to customer satisfaction.
//             </p>
//           </div>

//           {/* Values */}
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-8">
//               Our Values
//             </h3>
//             <div className="space-y-6">
//               {values.map((value, index) => {
//                 const IconComponent = value.icon;
//                 return (
//                   <div key={index} className="flex items-start space-x-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
//                         <IconComponent
//                           className="w-6 h-6 text-blue-600"
//                           aria-hidden="true"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-bold text-gray-900 mb-2">
//                         {value.title}
//                       </h4>
//                       <p className="text-gray-600 leading-relaxed">
//                         {value.description}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Heart, Globe, Shield, Zap } from "lucide-react";
import { useMemo } from "react";

export const AboutMissionValues = () => {
  const values = useMemo(() => [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make is guided by what's best for our travelers and their experiences.",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Making luxury travel accessible to everyone, regardless of location or background.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "Building lasting relationships through honest communication and reliable service.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology and user feedback.",
    },
  ]);

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission Statement */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To revolutionize the way people discover and book luxury
              accommodations by providing a seamless, trustworthy, and
              personalized travel experience that creates lasting memories.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that exceptional travel experiences should be
              accessible to everyone, and we're committed to making that vision
              a reality through innovation, partnership, and unwavering
              dedication to customer satisfaction.
            </p>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Our Values
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <IconComponent
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
