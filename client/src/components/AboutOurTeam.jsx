// import { Linkedin, Mail } from "lucide-react";

// export const AboutOurTeam = () => {
//   const teamMembers = [
//     {
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "/placeholder.svg?height=300&width=300",
//       bio: "Former hospitality executive with 15+ years of experience in luxury travel and customer service.",
//       linkedin: "#",
//       email: "sarah@quickstay.com",
//     },
//     {
//       name: "Michael Chen",
//       role: "CTO",
//       image: "/placeholder.svg?height=300&width=300",
//       bio: "Tech innovator specializing in scalable platforms and user experience optimization.",
//       linkedin: "#",
//       email: "michael@quickstay.com",
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Head of Operations",
//       image: "/placeholder.svg?height=300&width=300",
//       bio: "Operations expert ensuring seamless experiences for both travelers and property partners.",
//       linkedin: "#",
//       email: "emily@quickstay.com",
//     },
//     {
//       name: "David Park",
//       role: "Head of Customer Success",
//       image: "/placeholder.svg?height=300&width=300",
//       bio: "Customer advocate dedicated to delivering exceptional support and building lasting relationships.",
//       linkedin: "#",
//       email: "david@quickstay.com",
//     },
//   ];

//   return (
//     <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Meet Our Team
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Behind QuickStay is a passionate team of travel enthusiasts, tech
//             innovators, and hospitality experts working together to create
//             unforgettable experiences for our users.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {teamMembers.map((member, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <img
//                 src={member.image || "/placeholder.svg"}
//                 alt={`${member.name} - ${member.role}`}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   {member.name}
//                 </h3>
//                 <p className="text-blue-600 font-semibold mb-3">
//                   {member.role}
//                 </p>
//                 <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                   {member.bio}
//                 </p>
//                 <div className="flex space-x-3">
//                   <a
//                     href={member.linkedin}
//                     className="text-gray-400 hover:text-blue-600 transition-colors"
//                     aria-label={`${member.name}'s LinkedIn profile`}
//                   >
//                     <Linkedin className="w-5 h-5" />
//                   </a>
//                   <a
//                     href={`mailto:${member.email}`}
//                     className="text-gray-400 hover:text-blue-600 transition-colors"
//                     aria-label={`Email ${member.name}`}
//                   >
//                     <Mail className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import { Linkedin, Mail } from "lucide-react";
import { useMemo } from "react";

export const AboutOurTeam = () => {
  const teamMembers = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former hospitality executive with 15+ years of experience in luxury travel and customer service.",
      linkedin: "#",
      email: "sarah@quickstay.com",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Tech innovator specializing in scalable platforms and user experience optimization.",
      linkedin: "#",
      email: "michael@quickstay.com",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Operations expert ensuring seamless experiences for both travelers and property partners.",
      linkedin: "#",
      email: "emily@quickstay.com",
    },
    {
      name: "David Park",
      role: "Head of Customer Success",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Customer advocate dedicated to delivering exceptional support and building lasting relationships.",
      linkedin: "#",
      email: "david@quickstay.com",
    },
  ]);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Behind QuickStay is a passionate team of travel enthusiasts, tech
            innovators, and hospitality experts working together to create
            unforgettable experiences for our users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={member.image || "/placeholder.svg"}
                alt={`${member.name} - ${member.role}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
