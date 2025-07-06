import { motion } from "framer-motion";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { Sparkles, Mountain, ChefHat, Palette, Heart } from "lucide-react";
import ExperienceCard from "./ExperienceCard";

const ExperienceCards = ({ onBookNow }) => {
  const experiences = [
    {
      id: "sunset-trek",
      title: "Sunset Trek",
      description:
        "Embark on a breathtaking mountain adventure as the sun sets, creating unforgettable panoramic views and memories.",
      icon: Mountain,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "luxury-spa",
      title: "Luxury Spa Retreat",
      description:
        "Indulge in premium wellness treatments designed to rejuvenate your mind, body, and soul with world-class therapies.",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "culinary-journey",
      title: "Culinary Journey",
      description:
        "Discover exquisite flavors through chef-curated dining experiences and hands-on cooking classes with local ingredients.",
      icon: ChefHat,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "cultural-workshop",
      title: "Cultural Workshop",
      description:
        "Immerse yourself in local traditions through interactive art workshops, music sessions, and cultural storytelling.",
      icon: Palette,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "family-adventure",
      title: "Family Adventure",
      description:
        "Create lasting family memories with specially designed activities that bring generations together for fun and bonding.",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
  ];
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <ExperienceAnimatedSection className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated experiences designed to create
            unforgettable memories
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onBookNow={onBookNow}
            />
          ))}
        </motion.div>
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceCards;
