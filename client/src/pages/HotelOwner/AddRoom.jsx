import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const facilitiesList = [
  "Free WiFi",
  "Free Breakfast",
  "Room Service",
  "Mountain View",
  "Pool Access",
];

const AddRoomForm = () => {
  const { getToken } = UseAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedPreviews = [...previewImages];
      updatedPreviews[index] = URL.createObjectURL(file);
      setPreviewImages(updatedPreviews);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const token = await getToken(); // ⬅ make sure to await this if it's async
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const formData = new FormData();
      formData.append("roomType", data.roomType);
      formData.append("price", data.price);
      formData.append("facilities", JSON.stringify(data.facilities || []));

      data.images.forEach((fileList) => {
        const file = fileList[0];
        if (file) {
          formData.append("images", file);
        }
      });
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const { data: responseData } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseData.success) {
        toast.success(responseData.message);
        reset();
        setPreviewImages([null, null, null, null]);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-20 px-6 min-h-screen md:px-12 py-10 max-md:mt-30">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 font-Poppins">
        Add Your Room
      </h1>
      <p className="text-gray-500 mb-8 max-w-xl mt-5">
        Monitor your room listings, track bookings and analyze revenue—all in
        one place. Stay updated with real-time insights to ensure smooth
        operations.
      </p>
      <h2 className="text-2xl font-semibold mb-6">Add New Room</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        {/* Image Upload with Previews */}
        <div>
          <label className="block mb-2 font-medium">Upload Room Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                {previewImages[index] && (
                  <img
                    src={previewImages[index]}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md"
                  />
                )}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  {...register(`images.${index}`, {
                    required: "All 4 images are required",
                  })}
                  onChange={(e) => handleImageChange(e, index)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">Please upload 4 images.</p>
          )}
        </div>

        {/* Room Type and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Room Type */}
          <div>
            <label className="block mb-2 font-medium">Room Type</label>
            <select
              {...register("roomType", { required: "Room type is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">Select a room type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Deluxe Room">Luxury Room</option>
              <option value="Suite">Family Suite</option>
            </select>
            {errors.roomType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.roomType.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium">Price (per night)</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be at least 1" },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block mb-2 font-medium">Facilities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {facilitiesList.map((facility) => (
              <label key={facility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={facility}
                  {...register("facilities")}
                  className="accent-blue-500"
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
          >
            {isLoading ? "Adding..." : "Add Room"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;
