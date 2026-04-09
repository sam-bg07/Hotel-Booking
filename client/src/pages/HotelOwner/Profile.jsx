import React from "react";
import { UseAppContext } from "../../context/AppContext";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  MapPin,
  Building2,
  Briefcase,
  Camera,
} from "lucide-react";

/**
 * OwnerProfile - A detailed profile page for hotel owners
 */
const OwnerProfile = () => {
  const { userData, isOwner } = UseAppContext();

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const profileData = [
    {
      label: "Full Name",
      value:
        `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
        userData.username ||
        "N/A",
      icon: User,
    },
    {
      label: "Email Address",
      value: userData.email,
      icon: Mail,
    },
    {
      label: "Role",
      value: userData.roles === "hotelOwner" ? "Hotel Owner" : userData.roles,
      icon: ShieldCheck,
      badge: true,
    },
    {
      label: "User ID",
      value: userData._id,
      icon: Briefcase,
    },
    {
      label: "Joined",
      value: new Date(userData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header / Cover Section */}
      <div className="relative mb-24">
        <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-lg"></div>

        {/* Profile Avatar Container */}
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <User size={64} />
                </div>
              )}
            </div>
          </div>

          <div className="pb-4">
            <h1 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-500 font-medium flex items-center gap-1">
              <Building2 size={16} />
              Verified Hotel Partner
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profileData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <item.icon size={14} />
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-gray-800 font-medium ${item.badge ? "bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full text-sm font-bold" : ""}`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Owner Dashboard Access
            </h3>
            <p className="text-blue-700 opacity-80 mb-6">
              As a verified Hotel Owner, you have complete access to manage your
              properties, rooms, and exclusive coupons.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-blue-100 text-sm font-bold text-blue-600">
                Active Listings: Pro
              </div>
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-blue-100 text-sm font-bold text-blue-600">
                Premium Support: Active
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats/Meta */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Account Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">Security Level</span>
                <span className="text-green-600 font-bold text-sm">High</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">Identity</span>
                <span className="text-blue-600 font-bold text-sm">
                  Verified
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Two-Factor</span>
                <span className="text-gray-400 font-bold text-sm">Enabled</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            Edit Profile Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
