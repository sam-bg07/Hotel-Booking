// import { Trophy, Star, Users, ThumbsUp } from "lucide-react";

// export const AboutAwardsRecognition = () => {
//   const achievements = [
//     {
//       icon: Trophy,
//       title: "Best Travel Platform 2024",
//       organization: "Travel Tech Awards",
//       description: "Recognized for innovation in hospitality technology",
//     },
//     {
//       icon: Star,
//       title: "5-Star Customer Rating",
//       organization: "TrustPilot",
//       description: "Maintaining excellence with 4.9/5 average rating",
//     },
//     {
//       icon: Users,
//       title: "Top Employer 2023",
//       organization: "Great Place to Work",
//       description: "Certified as a top workplace for employee satisfaction",
//     },
//     {
//       icon: ThumbsUp,
//       title: "Customer Choice Award",
//       organization: "Travel Weekly",
//       description: "Voted by travelers as their preferred booking platform",
//     },
//   ];

//   const stats = [
//     { number: "500K+", label: "Happy Travelers" },
//     { number: "10K+", label: "Partner Properties" },
//     { number: "100+", label: "Destinations" },
//     { number: "4.9/5", label: "Average Rating" },
//   ];

//   return (
//     <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Awards & Recognition
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Our commitment to excellence has been recognized by industry leaders
//             and, most importantly, by the travelers who trust us with their
//             journeys.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
//                 {stat.number}
//               </div>
//               <div className="text-gray-600 font-medium">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Awards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {achievements.map((achievement, index) => {
//             const IconComponent = achievement.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
//                       <IconComponent
//                         className="w-6 h-6 text-blue-600"
//                         aria-hidden="true"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900 mb-1">
//                       {achievement.title}
//                     </h3>
//                     <p className="text-blue-600 font-semibold text-sm mb-2">
//                       {achievement.organization}
//                     </p>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {achievement.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

import {
  Trophy,
  Star,
  Users,
  Smile,
  ThumbsUp,
  MapPin,
  Building,
} from "lucide-react";
import React, { useState, useRef, useMemo, useEffect } from "react";

export const AboutAwardsRecognition = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Best Travel Platform 2024",
      organization: "Travel Tech Awards",
      description: "Recognized for innovation in hospitality technology",
    },
    {
      icon: Star,
      title: "5-Star Customer Rating",
      organization: "TrustPilot",
      description: "Maintaining excellence with 4.9/5 average rating",
    },
    {
      icon: Users,
      title: "Top Employer 2023",
      organization: "Great Place to Work",
      description: "Certified as a top workplace for employee satisfaction",
    },
    {
      icon: ThumbsUp,
      title: "Customer Choice Award",
      organization: "Travel Weekly",
      description: "Voted by travelers as their preferred booking platform",
    },
  ];

  const statsData = [
    {
      id: 1,
      icon: Smile,
      label: "Happy Travelers",
      value: 0,
      maxValue: "50000",
    },
    {
      id: 2,
      icon: Building,
      label: "Partner Properties",
      value: 0,
      maxValue: "10000",
    },
    {
      id: 3,
      icon: MapPin,
      label: "Destinations",
      value: 0,
      maxValue: "100",
    },
    {
      id: 4,
      icon: Star,
      label: "Average Rating",
      value: 0,
      maxValue: "4.9",
    },
  ];

  const memoizedStats = useMemo(() => statsData, []);

  const [stats, setStats] = useState(memoizedStats);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // console.log("entry created", entry);
        } else {
          setIsVisible(false);
          // resetStats(); // Reset stats when out of viewport
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible]);

  const startAnimation = () => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        let allReached = true;
        const newStats = prevStats.map((stat) => {
          if (stat.value < stat.maxValue) {
            allReached = false;
            return {
              ...stat,
              value: Math.min(
                stat.value + Math.ceil(stat.maxValue / 100),
                stat.maxValue
              ),
            };
          }
          return stat;
        });

        if (allReached) clearInterval(interval);
        return newStats;
      });
    }, 50);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Awards & Recognition
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized by industry leaders
            and, most importantly, by the travelers who trust us with their
            journeys.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}+
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <IconComponent
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mb-2">
                      {achievement.organization}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
