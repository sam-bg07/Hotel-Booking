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
import AddRoom from "./pages/HotelOwner/AddRoom";
import ListRoom from "./pages/HotelOwner/ListRoom";
import { UseAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import AddCouponPage from "./pages/HotelOwner/AddCoupon";
import CouponList from "./pages/HotelOwner/ListCoupon";
const App = () => {
  const location = useLocation();
  const isOwnerRoute = location.pathname.includes("/owner");
  const { showHotelReg } = UseAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerRoute && <Navbar />}
      {showHotelReg && <HotelRegister />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/loader/:nextUrl" element={<Loader />} />

        <Route path="/owner/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
          <Route path="addcoupon" element={<AddCouponPage />} />
          <Route path="listcoupon" element={<CouponList />} />
          {/* Add more owner routes as needed */}
        </Route>
        {/* Add more routes as needed */}
      </Routes>
      {!isOwnerRoute && <Footer />}
    </div>
  );
};

export default App;
