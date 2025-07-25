import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ExperienceAnimatedSection from "./ExperienceAnimatedSection";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mountain,
  ChefHat,
  Palette,
  Heart,
  Calendar,
  Phone,
  Mail,
  User,
  MessageSquare,
  Check,
  Star,
} from "lucide-react";
import ExperienceCustomSelect from "./ExperienceCustomSelect";
import Toast from "./Toast";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UseAppContext } from "../context/AppContext";

const ExperienceBookingForm = ({ selectedExperience }) => {
  const { getToken } = UseAppContext();
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      experience: selectedExperience || "",
      date: "",
      rating: "",
      feedback: "",
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await axios.get("/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          toast.error("Failed to fetch bookings");
        }
      } catch (error) {
        toast.error("Error fetching bookings");
      }
    };

    fetchBookings();
  }, []);
  const onSubmit = async (formData) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      if (bookings.length === 0) {
        console.log("You must book a hotel room before booking an experience.");
        return;
      }

      // Get most recent booking ID
      const latestBooking = bookings[0];
      const payload = {
        ...formData,
        bookingId: latestBooking._id,
      };

      const { data } = await axios.post("/api/experiences", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error occurred during experience booking:", error.message);
    }
  };

  useEffect(() => {
    if (selectedExperience) {
      setValue("experience", selectedExperience);
    }
  }, [selectedExperience, setValue]);

  const experiences = [
    {
      id: "sunset-trek",
      title: "Sunset Trek",
      icon: Mountain,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "luxury-spa",
      title: "Luxury Spa Retreat",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "culinary-journey",
      title: "Culinary Journey",
      icon: ChefHat,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "cultural-workshop",
      title: "Cultural Workshop",
      icon: Palette,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "family-adventure",
      title: "Family Adventure",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Sparkles className="w-4 h-4" /> Select Experience
              </label>
              <Controller
                name="experience"
                control={control}
                rules={{ required: "Please select an experience" }}
                render={({ field }) => (
                  <ExperienceCustomSelect
                    {...field}
                    placeholder="Choose your experience"
                    error={errors.experience?.message}
                    className="cursor-pointer"
                  >
                    {experiences.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title}
                      </option>
                    ))}
                  </ExperienceCustomSelect>
                )}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <Calendar className="w-4 h-4" /> Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                    errors.date
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <Star className="w-4 h-4" /> Rating
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating is required" }}
                  render={({ field }) => (
                    <ExperienceCustomSelect
                      {...field}
                      placeholder="Select rating"
                      error={errors.rating?.message}
                      className="cursor-pointer"
                    >
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </ExperienceCustomSelect>
                  )}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <MessageSquare className="w-4 h-4" /> Special Requests
              </label>
              <textarea
                {...register("specialRequests")}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Any special requirements or requests..."
                rows={2}
              />
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <MessageSquare className="w-4 h-4" /> Feedback
              </label>
              <textarea
                {...register("feedback", { required: "Feedback is required" })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Your feedback is valuable to us..."
                rows={4}
              />
              {errors.feedback && (
                <p className="text-red-500 text-sm">
                  {errors.feedback.message}
                </p>
              )}
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("agreeToTerms", {
                  validate: (v) =>
                    v || "You must agree to terms and conditions",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label className="text-sm text-gray-700">
                I agree to the terms & conditions
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center cursor-pointer"
            >
              <Check className="w-5 h-5 mr-2" /> Book Experience
            </button>
          </form>
        </div>

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
