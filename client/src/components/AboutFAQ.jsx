// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export const AboutFAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "When was QuickStay founded?",
//       answer:
//         "QuickStay was founded in 2018 with the mission to make luxury travel accessible and hassle-free for everyone.",
//     },
//     {
//       question: "How many properties do you work with?",
//       answer:
//         "We partner with over 10,000 carefully vetted properties across 100+ destinations worldwide, ranging from boutique hotels to luxury resorts.",
//     },
//     {
//       question: "What makes QuickStay different from other booking platforms?",
//       answer:
//         "Our focus on luxury accommodations, personalized service, 24/7 customer support, and commitment to sustainability sets us apart. We hand-pick every property and maintain direct relationships with our partners.",
//     },
//     {
//       question: "Do you have a customer service team?",
//       answer:
//         "Yes! Our dedicated customer success team is available 24/7 to assist with bookings, modifications, and any questions you may have during your stay.",
//     },
//     {
//       question: "How do you ensure the quality of your properties?",
//       answer:
//         "Every property undergoes a rigorous vetting process including on-site inspections, guest reviews analysis, and ongoing quality monitoring to maintain our high standards.",
//     },
//     {
//       question: "Are you committed to sustainable travel?",
//       answer:
//         "We're committed to carbon-neutral stays, partner with eco-certified properties, and invest in local communities to promote responsible tourism.",
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed">
//             Get to know more about QuickStay, our mission, and how we're
//             revolutionizing luxury travel.
//           </p>
//         </div>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md overflow-hidden"
//             >
//               <button
//                 className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
//                 onClick={() => toggleFAQ(index)}
//                 aria-expanded={openIndex === index}
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 pr-4">
//                   {faq.question}
//                 </h3>
//                 {openIndex === index ? (
//                   <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                 )}
//               </button>
//               {openIndex === index && (
//                 <div className="px-6 pb-4">
//                   <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const AboutFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = useMemo(() => [
    {
      question: "When was QuickStay founded?",
      answer:
        "QuickStay was founded in 2018 with the mission to make luxury travel accessible and hassle-free for everyone.",
    },
    {
      question: "How many properties do you work with?",
      answer:
        "We partner with over 10,000 carefully vetted properties across 100+ destinations worldwide, ranging from boutique hotels to luxury resorts.",
    },
    {
      question: "What makes QuickStay different from other booking platforms?",
      answer:
        "Our focus on luxury accommodations, personalized service, 24/7 customer support, and commitment to sustainability sets us apart. We hand-pick every property and maintain direct relationships with our partners.",
    },
    {
      question: "Do you have a customer service team?",
      answer:
        "Yes! Our dedicated customer success team is available 24/7 to assist with bookings, modifications, and any questions you may have during your stay.",
    },
    {
      question: "How do you ensure the quality of your properties?",
      answer:
        "Every property undergoes a rigorous vetting process including on-site inspections, guest reviews analysis, and ongoing quality monitoring to maintain our high standards.",
    },
    {
      question: "Are you committed to sustainable travel?",
      answer:
        "We're committed to carbon-neutral stays, partner with eco-certified properties, and invest in local communities to promote responsible tourism.",
    },
  ]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get to know more about QuickStay, our mission, and how we're
            revolutionizing luxury travel.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/90 focus:outline-none focus:bg-gray-50 transition-all duration-200 linear"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
