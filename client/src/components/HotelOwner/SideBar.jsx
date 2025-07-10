import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  ListOrdered,
  User,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/owner", icon: LayoutDashboard },
  { name: "Add Room", path: "/owner/add-room", icon: PlusSquare },
  { name: "List Room", path: "/owner/list-room", icon: ListOrdered },
  { name: "Profile", path: "/owner/profile", icon: User },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* 📱 Mobile Button - Only below md */}
      <div className="fixed top-4 left-4 z-50 md:hidden pt-20">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white rounded-full shadow-md border cursor-pointer"
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* 📱 Mobile Full Page Panel */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-400 ease-linear md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4 border-b">
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-600 cursor-pointer" />
          </button>
        </div>

        {/* Centered Navigation */}
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              onClick={() => setIsOpen(false)} // Close after click
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* 🖥️ Desktop Sidebar - md and above */}
      <div className="md:block max-md:hidden w-64 h-screen pt-25 border-r border-gray-300 shadow-md flex flex-col transition-all duration-300 ">
        <nav className="flex flex-row md:flex-col gap-4 md:gap-2 overflow-x-auto md:overflow-visible">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium border-r-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
