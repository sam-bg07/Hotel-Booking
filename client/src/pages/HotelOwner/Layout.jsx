import React, { use, useEffect } from "react";
import AdminNavbar from "../../components/HotelOwner/AdminNavbar";
import SideBar from "../../components/HotelOwner/SideBar";
import { Outlet } from "react-router-dom";
import { UseAppContext } from "../../context/AppContext.jsx";

const Layout = () => {
  const { isOwner, navigate } = UseAppContext();
  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex-1">
        <AdminNavbar />
        <div className="mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
