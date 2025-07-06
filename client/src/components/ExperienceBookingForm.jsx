import { useState, useEffect } from "react";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mountain,
  ChefHat,
  Palette,
  Heart,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  MessageSquare,
  Check,
  Star,
} from "lucide-react";
import ExperienceCustomSelect from "./ExperienceCustomSelect";
import Toast from "./Toast";

const ExperienceBookingForm = ({ selectedExperience }) => {
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: selectedExperience || "",
    date: "",
    rating: "",
    feedback: "",
    specialRequests: "",
    agreeToTerms: false,
  });
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
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [errors, setErrors] = useState({});

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.experience)
      newErrors.experience = "Please select an experience";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      showToast("We'll contact you soon to confirm your experience.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        date: "",
        rating: "",
        feedback: "",
        specialRequests: "",
        agreeToTerms: false,
      });
    }
  };

  useEffect(() => {
    if (selectedExperience) {
      setFormData((prev) => ({ ...prev, experience: selectedExperience }));
    }
  }, [selectedExperience]);

  return (
    <ExperienceAnimatedSection id="booking-form" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Experience
          </h2>
          <p className="text-gray-600 text-lg">
            Fill out the form below to reserve your unforgettable experience
          </p>
        </motion.div>

        {/* Booking Form Card - Same styling as experience cards and review cards */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Select Experience */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                Select Experience
              </label>
              <ExperienceCustomSelect
                value={formData.experience}
                onChange={(value) => handleInputChange("experience", value)}
                placeholder="Choose your experience"
                error={errors.experience}
                className="cursor-pointer"
              >
                {experiences.map((experience) => (
                  <option key={experience.id} value={experience.id}>
                    {experience.title}
                  </option>
                ))}
              </ExperienceCustomSelect>
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
            </div>

            {/* Date and Time Slot Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                    errors.date
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label
                  htmlFor="rating"
                  className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                >
                  <Star className="w-4 h-4" />
                  Rating
                </label>
                <ExperienceCustomSelect
                  value={formData.rating}
                  onChange={(value) => handleInputChange("rating", value)}
                  placeholder="Select rating"
                  error={errors.rating}
                  className="cursor-pointer"
                >
                  <option value="1"> ⭐</option>
                  <option value="2"> ⭐⭐</option>
                  <option value="3"> ⭐⭐⭐</option>
                  <option value="4"> ⭐⭐⭐⭐</option>
                  <option value="5"> ⭐⭐⭐⭐⭐</option>
                </ExperienceCustomSelect>
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label
                htmlFor="specialRequests"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) =>
                  handleInputChange("specialRequests", e.target.value)
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Any special requirements or requests..."
                rows={2}
              />
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <label
                htmlFor="feedback"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </label>
              <textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Your feedback is valuable to us..."
                rows={4}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to the terms & conditions
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button - Same styling as card buttons */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center cursor-pointer"
            >
              <Check className="w-5 h-5 mr-2" />
              Book Experience
            </button>
          </form>
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </ExperienceAnimatedSection>
  );
};

export default ExperienceBookingForm;
