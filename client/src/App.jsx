import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Hotel from "./pages/Hotel";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
