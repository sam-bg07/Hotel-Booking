import { Routes, Route, useLocation } from "react-router-dom";
import { UseAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  HomeSkeleton,
  HotelSkeleton,
  RoomDetailsSkeleton,
  ExperienceSkeleton,
  DashboardSkeleton,
  ListSkeleton,
  DefaultSkeleton,
} from "./components/Skeletons";

// Lazy-loaded Components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Hotel = lazy(() => import("./pages/Hotel"));
const RoomDetails = lazy(() => import("./pages/RoomDetails"));
const MyBooking = lazy(() => import("./pages/MyBooking"));
const Experience = lazy(() => import("./pages/Experience"));
const Layout = lazy(() => import("./pages/HotelOwner/Layout"));
const Dashboard = lazy(() => import("./pages/HotelOwner/Dashboard"));
const AddRoom = lazy(() => import("./pages/HotelOwner/AddRoom"));
const ListRoom = lazy(() => import("./pages/HotelOwner/ListRoom"));
const AddCouponPage = lazy(() => import("./pages/HotelOwner/AddCoupon"));
const CouponList = lazy(() => import("./pages/HotelOwner/ListCoupon"));
const HotelRegister = lazy(() => import("./components/HotelRegister"));
const Loader = lazy(() => import("./components/Loader"));
const ChatBox = lazy(() => import("./components/ChatBox"));

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
        <Route
          path="/"
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<DefaultSkeleton />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/hotels"
          element={
            <Suspense fallback={<HotelSkeleton />}>
              <Hotel />
            </Suspense>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <Suspense fallback={<RoomDetailsSkeleton />}>
              <RoomDetails />
            </Suspense>
          }
        />
        <Route
          path="/experience"
          element={
            <Suspense fallback={<ExperienceSkeleton />}>
              <Experience />
            </Suspense>
          }
        />
        <Route
          path="/my-booking"
          element={
            <Suspense fallback={<DefaultSkeleton />}>
              <MyBooking />
            </Suspense>
          }
        />
        <Route
          path="/loader/:nextUrl"
          element={
            <Suspense fallback={<DefaultSkeleton />}>
              <Loader />
            </Suspense>
          }
        />

        <Route
          path="/owner/"
          element={
            <Suspense fallback={<DefaultSkeleton />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="add-room"
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <AddRoom />
              </Suspense>
            }
          />
          <Route
            path="list-room"
            element={
              <Suspense fallback={<ListSkeleton />}>
                <ListRoom />
              </Suspense>
            }
          />
          <Route
            path="addcoupon"
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <AddCouponPage />
              </Suspense>
            }
          />
          <Route
            path="listcoupon"
            element={
              <Suspense fallback={<ListSkeleton />}>
                <CouponList />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Suspense fallback={null}>
        <ChatBox />
      </Suspense>

      {!isOwnerRoute && <Footer />}
    </div>
  );
};

export default App;
