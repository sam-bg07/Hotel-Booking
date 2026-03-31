import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { Instagram, Twitter, Facebook, Globe, Dribbble } from "lucide-react";
import { assets } from "../assets/assets"; // Adjust the import path as necessary

const Footer = memo(() => {
  const linkGroups = [
    {
      title: "Company",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Clients", path: "/clients" },
        { name: "Team", path: "/team" },
        { name: "Career", path: "/career" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Journal", path: "/journal" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Partners", path: "/partners" },
      ],
    },
  ];

  const socialIcons = [
    <Instagram />,
    <Twitter />,
    <Facebook />,
    <Globe />,
    <Dribbble />,
  ];

  return (
    <footer className="bg-black text-white py-12 p-6 md:p-16 lg:p-30">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo block */}
        <div>
          <NavLink to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className={`h-9 mb-4`} />
          </NavLink>
          <p className="text-gray-400 leading-relaxed">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
        </div>

        {/* Group columns 2 to 5 */}
        <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {linkGroups.map((group, idx) => (
            <div
              key={idx}
              className="text-center sm:text-left items-center sm:items-start"
            >
              <h3 className="text-lg font-medium mb-3">{group.title}</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                {group.links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className="hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Social + Button */}
          <div className="flex flex-col  gap-4 text-center sm:text-left items-center sm:items-start">
            <div className="flex space-x-4 text-gray-400 text-xl">
              {socialIcons.map((Icon, i) => (
                <span key={i} className="hover:text-white cursor-pointer">
                  {Icon}
                </span>
              ))}
            </div>
            <Link to="/contact">
              <button className="bg-pink-600 hover:bg-pink-700 transition px-6 py-2 rounded-full mt-4 text-white font-semibold">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-gray-700" />

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500">
        © 2019-2020 All Rights Reserved.
      </div>
    </footer>
  );
});

export default Footer;
