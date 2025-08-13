import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Tag,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { UseAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddCouponPage from "./AddCoupon"; // Import the AddCouponPage component
import Loading from "../../components/Loading";

const CouponList = () => {
  const { currency, getToken, user } = UseAppContext();
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("couponCode");
  const [currentView, setCurrentView] = useState("list"); // "list" or "form"
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/coupon/getallcoupons", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCoupons(data.coupons);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id) => {
    try {
      const { data } = await axios.delete(`/api/coupon/deletecoupon/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        getAllCoupons();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setCurrentView("form");
  };

  const handleAddNew = () => {
    setEditingCoupon(null);
    setCurrentView("form");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setEditingCoupon(null);
  };

  const handleFormSuccess = () => {
    getAllCoupons(); // Refresh the coupon list
    handleBackToList(); // Go back to list view
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDiscount = (value, type) => {
    return type === "percentage" ? `${value}%` : `$${value}`;
  };

  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  const isExpired = (validUntil) => {
    return new Date(validUntil) < new Date();
  };

  const handleToggleStatus = async (coupon) => {
    try {
      const updatedData = {
        ...coupon,
        isActive: !coupon.isActive,
      };

      const { data } = await axios.put(
        `/api/coupon/updatecoupon/${coupon._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(
          `Coupon ${coupon.isActive ? "deactivated" : "activated"} successfully`
        );
        getAllCoupons(); // Refresh the list
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update coupon status");
    }
  };

  // Filter and search coupons
  const filteredCoupons = coupons
    .filter((coupon) => {
      const matchesSearch = coupon.couponCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "active" && coupon.isActive) ||
        (filterStatus === "inactive" && !coupon.isActive);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "couponCode")
        return a.couponCode.localeCompare(b.couponCode);
      if (sortBy === "validUntil")
        return new Date(a.validUntil) - new Date(b.validUntil);
      if (sortBy === "usageLimit") return b.usageLimit - a.usageLimit;
      return 0;
    });

  // If in form view, show the AddCouponPage component
  if (currentView === "form") {
    return (
      <AddCouponPage
        editingCoupon={editingCoupon}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  if (loading) return <Loading />;

  // Show list view
  return (
    <div className="min-h-screen w-[90%] mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Coupon Management
                </h1>
              </div>
              <p className="text-gray-600">
                Manage and monitor your discount coupons
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add New Coupon
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search coupon codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="couponCode">Sort by Code</option>
                <option value="validUntil">Sort by Expiry</option>
                <option value="usageLimit">Sort by Usage Limit</option>
              </select>
            </div>
          </div>
        </div> */}

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Period
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCoupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <Tag className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {coupon.couponCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {coupon.discountValue}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${coupon.minimumOrderAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(coupon.validFrom)}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {formatDate(coupon.validUntil)}
                      </div>
                      {isExpired(coupon.validUntil) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                          Expired
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {coupon.redeemedCount || 0} / {coupon.usageLimit}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${getUsagePercentage(
                              coupon.redeemedCount || 0,
                              coupon.usageLimit
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getUsagePercentage(
                          coupon.redeemedCount || 0,
                          coupon.usageLimit
                        )}
                        % used
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(coupon)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`w-3 h-3 rounded-full ${
                            coupon.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span
                          className={`text-sm font-medium ${
                            coupon.isActive ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteCoupon(coupon._id)}
                          className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {coupon.couponCode}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleStatus(coupon)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      coupon.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span
                    className={`text-sm font-medium ${
                      coupon.isActive ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Inactive"}
                  </span>
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Discount
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {coupon.discountValue}%
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Min Order
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">
                    ${coupon.minimumOrderAmount}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Valid From
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {formatDate(coupon.validFrom)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Valid Until
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {formatDate(coupon.validUntil)}
                  </p>
                  {isExpired(coupon.validUntil) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                      Expired
                    </span>
                  )}
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Usage
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900">
                    {coupon.redeemedCount || 0} / {coupon.usageLimit}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getUsagePercentage(
                      coupon.redeemedCount || 0,
                      coupon.usageLimit
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${getUsagePercentage(
                        coupon.redeemedCount || 0,
                        coupon.usageLimit
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => deleteCoupon(coupon._id)}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCoupons.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Tag className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No coupons found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first coupon to get started"}
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Coupons
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {coupons.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Coupons
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {coupons.filter((c) => c.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Inactive Coupons
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {coupons.filter((c) => !c.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Expired</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {coupons.filter((c) => isExpired(c.validUntil)).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
