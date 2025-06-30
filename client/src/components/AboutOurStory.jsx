// import { Calendar, Users, Award, TrendingUp } from "lucide-react";

// export const AboutOurStory = () => {
//   const milestones = [
//     {
//       year: "2018",
//       title: "Founded",
//       description:
//         "QuickStay was born from a vision to simplify luxury travel booking",
//       icon: Calendar,
//     },
//     {
//       year: "2020",
//       title: "50K+ Users",
//       description: "Reached our first major milestone of satisfied travelers",
//       icon: Users,
//     },
//     {
//       year: "2022",
//       title: "Industry Recognition",
//       description: "Awarded 'Best Travel Platform' by Travel Tech Awards",
//       icon: Award,
//     },
//     {
//       year: "2024",
//       title: "Global Expansion",
//       description: "Now serving 100+ destinations across 6 continents",
//       icon: TrendingUp,
//     },
//   ];

//   return (
//     <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Our Story
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             What started as a simple idea to make luxury travel accessible has
//             grown into a global platform trusted by thousands of travelers
//             worldwide. Here's how we've evolved over the years.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {milestones.map((milestone, index) => {
//             const IconComponent = milestone.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="flex justify-center mb-4">
//                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
//                     <IconComponent
//                       className="w-8 h-8 text-blue-600"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>
//                 <div className="text-2xl font-bold text-blue-600 mb-2">
//                   {milestone.year}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-3">
//                   {milestone.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {milestone.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

import { Calendar, Users, Award, TrendingUp } from "lucide-react";
import { assets } from "../assets/assets";

export const AboutOurStory = () => {
  const milestones = [
    {
      year: "2018",
      title: "Founded",
      description:
        "QuickStay was born from a vision to simplify luxury travel booking",
      icon: Calendar,
    },
    {
      year: "2020",
      title: "50K+ Users",
      description: "Reached our first major milestone of satisfied travelers",
      icon: Users,
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Awarded 'Best Travel Platform' by Travel Tech Awards",
      icon: Award,
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Now serving 100+ destinations across 6 continents",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                What started as a simple idea to make luxury travel accessible
                has grown into a global platform trusted by thousands of
                travelers worldwide. Here's how we've evolved over the years.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {milestone.year}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={assets.ourstory}
                alt="QuickStay team working together in modern office"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Building the Future of Travel
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Our dedicated team works tirelessly to create exceptional
                    travel experiences for our global community.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
