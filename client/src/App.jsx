import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Hotel from "./pages/Hotel";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import HotelRegister from "./components/HotelRegister";
import Layout from "./pages/HotelOwner/Layout";
import { useLocation } from "react-router-dom";
import Experience from "./pages/Experience";
import Dashboard from "./pages/HotelOwner/Dashboard";

const App = () => {
  const location = useLocation();
  const isOwnerRoute = location.pathname.includes("/owner");
  return (
    <div>
      {!isOwnerRoute && <Navbar />}
      {false && <HotelRegister />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        {/* <Route path="/experience" element={<Experience />} /> */}
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/owner/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<h1>Add Room</h1>} />
          <Route path="list-room" element={<h1>List Room</h1>} />
          {/* Add more owner routes as needed */}
        </Route>
        {/* Add more routes as needed */}
      </Routes>
      {!isOwnerRoute && <Footer />}
    </div>
  );
};

export default App;
