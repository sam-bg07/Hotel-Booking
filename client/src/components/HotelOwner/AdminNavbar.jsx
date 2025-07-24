import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets.js"; // Adjust the import path as necessary
import { UserButton } from "@clerk/clerk-react"; // For account/profile button

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-16 lg:px-24 z-100 bg-white shadow-md border-b">
      {/* Logo Section */}
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="Admin Logo"
          className="h-9 invert opacity-80"
        />
      </NavLink>

      {/* Account/User Section */}
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
