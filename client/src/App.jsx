import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Hotel from "./pages/Hotel";
import RoomDetails from "./pages/RoomDetails";

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
      </Routes>
      {!isOwnerRoute && <Footer />}
    </div>
  );
};

export default App;
