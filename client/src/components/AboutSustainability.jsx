// import { Leaf, Recycle, Users2, Building } from "lucide-react";

// export const AboutSustainability = () => {
//   const initiatives = [
//     {
//       icon: Leaf,
//       title: "Carbon Neutral Stays",
//       description:
//         "Partnering with eco-certified properties and offsetting carbon emissions for every booking.",
//     },
//     {
//       icon: Recycle,
//       title: "Sustainable Practices",
//       description:
//         "Promoting hotels with green certifications, renewable energy, and waste reduction programs.",
//     },
//     {
//       icon: Users2,
//       title: "Local Communities",
//       description:
//         "Supporting local businesses and communities through our responsible tourism initiatives.",
//     },
//     {
//       icon: Building,
//       title: "Green Buildings",
//       description:
//         "Prioritizing properties with LEED certification and sustainable construction practices.",
//     },
//   ];

//   return (
//     <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Our Commitment to Sustainability
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             We believe in responsible travel that preserves the beauty of our
//             destinations for future generations. Our sustainability initiatives
//             ensure that every journey contributes positively to the environment
//             and local communities.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           {initiatives.map((initiative, index) => {
//             const IconComponent = initiative.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                       <IconComponent
//                         className="w-6 h-6 text-green-600"
//                         aria-hidden="true"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900 mb-3">
//                       {initiative.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed">
//                       {initiative.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-8 text-center">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">
//             Our Environmental Impact
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
//               <p className="text-gray-600">
//                 Reduction in carbon footprint since 2022
//               </p>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
//               <p className="text-gray-600">
//                 Of partner properties are eco-certified
//               </p>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-green-600 mb-2">$2M+</div>
//               <p className="text-gray-600">
//                 Invested in local community projects
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Leaf, Recycle, Users2, Building } from "lucide-react";

export const AboutSustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "Carbon Neutral Stays",
      description:
        "Partnering with eco-certified properties and offsetting carbon emissions for every booking.",
    },
    {
      icon: Recycle,
      title: "Sustainable Practices",
      description:
        "Promoting hotels with green certifications, renewable energy, and waste reduction programs.",
    },
    {
      icon: Users2,
      title: "Local Communities",
      description:
        "Supporting local businesses and communities through our responsible tourism initiatives.",
    },
    {
      icon: Building,
      title: "Green Buildings",
      description:
        "Prioritizing properties with LEED certification and sustainable construction practices.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Commitment to Sustainability
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in responsible travel that preserves the beauty of our
            destinations for future generations. Our sustainability initiatives
            ensure that every journey contributes positively to the environment
            and local communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {initiatives.map((initiative, index) => {
            const IconComponent = initiative.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <IconComponent
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Our Environmental Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                25%
              </div>
              <p className="text-gray-600">
                Reduction in carbon footprint since 2022
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                80%
              </div>
              <p className="text-gray-600">
                Of partner properties are eco-certified
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                $2M+
              </div>
              <p className="text-gray-600">
                Invested in local community projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
