import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets.js"; // Adjust the import path as necessary
import { useClerk, UserButton } from "@clerk/clerk-react"; // Import Clerk hooks for authentication
import { Menu, Search, SidebarCloseIcon } from "lucide-react";
import { UseAppContext } from "../context/AppContext.jsx";

import Loader from "./Loader.jsx";

const Navbar = memo(() => {
  // const { user, navigate, isOwner, setShowHotelReg } = UseAppContext();
  const context = UseAppContext();

  if (!context) return <p>Context not found</p>;

  const { user, navigate, isOwner, setShowHotelReg, isLoadingUser } = context;
  const { openSignIn } = useClerk();
  const location = useLocation();
  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Hotels", path: "/hotels" },
      { name: "Experience", path: "/experience" },
      { name: "About", path: "/about" },
    ],
    [],
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (
      location.pathname === "/" ||
      location.pathname === "/experience" ||
      location.pathname === "/about"
    ) {
      handleScroll(); // Check scroll immediately
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // ✅ Force solid navbar on all other pages
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  if (isLoadingUser) return <Loader />;

  return (
    <nav
      className={`fixed top-0 left-0  w-full h-20 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-24 transition-all duration-450 z-50 ${
        isScrolled
          ? "bg-white/80 h-10 shadow-md text-gray-700 backdrop-blur py-3 md:py-4 "
          : "py-4 md:py-6"
      }`}
    >
      {/* <div className="h-full overflow-y-auto"></div> */}
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 m-2 lg:gap-8">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              } ${isActive ? "font-semibold text-black" : ""}`
            }
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </NavLink>
        ))}
        {user && isOwner !== null && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={() => {
              isOwner ? navigate("/owner") : setShowHotelReg(true);
            }}
          >
            {isOwner ? "Dashboard" : "Add Your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Search
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 100);
          }}
          className={`h-9 text-white cursor-pointer ${
            isScrolled && "invert opacity-80"
          }`}
        />
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="my booking"
                labelIcon={
                  <svg
                    className="w-4 h-4 text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                    />
                  </svg>
                }
                onClick={() => navigate("/my-booking")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black cursor-pointer text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="my booking"
                labelIcon={
                  <svg
                    className="w-4 h-4 text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                    />
                  </svg>
                }
                onClick={() => navigate("/my-booking")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <Menu
          onClick={() => setIsMenuOpen(true)}
          className={`${isScrolled && "invert"} text-white h-10`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-7 right-6"
          onClick={() => setIsMenuOpen(false)}
        >
          <SidebarCloseIcon className="h-6" />
        </button>

        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `text-lg ${isActive ? "font-bold underline " : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
            onClick={() => {
              isOwner ? navigate("/owner") : setShowHotelReg(true);
            }}
          >
            {isOwner ? "Dashboard" : "My Booking"}
          </button>
        )}

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
