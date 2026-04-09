import logger from "../../utils/logger.js";
import { Plus, Tag, Check, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UseAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const AddCouponPage = ({ editingCoupon, onBack, onSuccess }) => {
  const { getToken } = UseAppContext();
  const isEditMode = !!editingCoupon;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      couponCode: "",
      title: "",
      description: "",
      discountValue: "",
      minimumOrderAmount: "",
      validFrom: "",
      validUntil: "",
      usageLimit: "",
      isActive: true,
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editingCoupon) {
      // Format dates for datetime-local input
      const formatDateForInput = (dateString) => {
        return new Date(dateString).toISOString().slice(0, 16);
      };

      setValue("couponCode", editingCoupon.couponCode);
      setValue("title", editingCoupon.title);
      setValue("description", editingCoupon.description || "");
      setValue("discountValue", editingCoupon.discountValue.toString());
      setValue(
        "minimumOrderAmount",
        editingCoupon.minimumOrderAmount.toString()
      );
      setValue("validFrom", formatDateForInput(editingCoupon.validFrom));
      setValue("validUntil", formatDateForInput(editingCoupon.validUntil));
      setValue("usageLimit", editingCoupon.usageLimit.toString());
      setValue("isActive", editingCoupon.isActive);
    }
  }, [editingCoupon, setValue]);

  const onSubmit = async (data) => {
    logger.info(data);
    try {
      const token = await getToken();

      let response;
      if (isEditMode) {
        // Update existing coupon
        response = await axios.put(
          `/api/coupon/updatecoupon/${editingCoupon._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new coupon
        response = await axios.post("/api/coupon", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        if (onSuccess) {
          onSuccess(); // Callback to refresh coupon list and go back
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    reset();
    if (onBack) {
      onBack();
    }
  };

  const couponCode = watch("couponCode");
  const title = watch("title");
  const description = watch("description");
  const discountValue = watch("discountValue");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20 max-md:mt-30">
      <div className="max-w-4xl mx-auto md:mx-17">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 cursor-pointer">
              {isEditMode ? "Update Coupon" : "Add New Coupon"}
            </h1>
          </div>
          <p className="text-gray-600">
            {isEditMode
              ? "Update the coupon details below"
              : "Create a new discount coupon for your customers"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter the basic details for your coupon
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      placeholder="Describe what this coupon offers..."
                      {...register("title", { required: true })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    {errors.title && (
                      <span className="text-xs text-red-500">
                        title is required
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="couponCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Coupon Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="couponCode"
                        type="text"
                        placeholder="e.g., SAVE20"
                        {...register("couponCode", { required: true })}
                        onInput={(e) =>
                          (e.target.value = e.target.value.toUpperCase())
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                      />
                      {errors.couponCode && (
                        <span className="text-xs text-red-500">
                          Coupon code is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Discount Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value="percentage"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-200 cursor-not-allowed"
                      >
                        <option value="percentage">Percentage (%)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      placeholder="Describe what this coupon offers..."
                      {...register("description", { required: true })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    {errors.description && (
                      <span className="text-xs text-red-500">
                        Description is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Discount Settings */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Discount Settings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure the discount amount and limits
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="discountValue"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Discount Value <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="discountValue"
                        type="number"
                        placeholder="20"
                        {...register("discountValue", {
                          required: true,
                          min: 0,
                        })}
                        min="0"
                        step="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.discountValue && (
                        <span className="text-xs text-red-500">
                          Discount value is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="minimumOrderAmount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Minimum Order Amount{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="minimumOrderAmount"
                        type="number"
                        placeholder="50.00"
                        {...register("minimumOrderAmount", {
                          required: true,
                          min: 0,
                        })}
                        min="0"
                        step="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.minimumOrderAmount && (
                        <span className="text-xs text-red-500">
                          Minimum order amount is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Validity Period */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Validity Period
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Set when this coupon is valid
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="validFrom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Valid From <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="validFrom"
                        type="datetime-local"
                        {...register("validFrom", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.validFrom && (
                        <span className="text-xs text-red-500">
                          Valid from date is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="validUntil"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Valid Until <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="validUntil"
                        type="datetime-local"
                        {...register("validUntil", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.validUntil && (
                        <span className="text-xs text-red-500">
                          Valid until date is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Usage Settings */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Usage Settings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Control how this coupon can be used
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="usageLimit"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Usage Limit <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="usageLimit"
                      type="number"
                      placeholder="100"
                      {...register("usageLimit", { required: true, min: 1 })}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.usageLimit && (
                      <span className="text-xs text-red-500">
                        Usage limit is required
                      </span>
                    )}
                    <p className="text-sm text-gray-500">
                      Maximum number of times this coupon can be used
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="isActive"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Active Status
                      </label>
                      <p className="text-sm text-gray-500">
                        Enable or disable this coupon
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        id="isActive"
                        type="checkbox"
                        {...register("isActive")}
                        className="sr-only"
                      />
                      <label
                        htmlFor="isActive"
                        className={`flex items-center cursor-pointer w-11 h-6 rounded-full transition-colors duration-200 ${
                          watch("isActive") ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            watch("isActive")
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Coupon Preview
                  </h3>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Tag className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-lg">
                      {couponCode || "COUPON_CODE"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {description || "Coupon description will appear here"}
                    </p>
                    {discountValue && (
                      <p className="text-green-600 font-semibold mt-2">{`${discountValue}% OFF`}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
            >
              {isEditMode ? "Cancel" : "Clear"}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
            >
              {isEditMode ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isEditMode ? "Update Coupon" : "Add Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponPage;
