import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingrooms, setIsLoadingRooms] = useState(true);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [experience, setExperience] = useState([]);
  const [rooms, setRooms] = useState([]);

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const fetchRooms = async () => {
    try {
      setIsLoadingRooms(true);
      // Fetch initial subset of rooms instead of all rooms for global context
      const { data } = await axios.get(`${API_BASE}/api/rooms?limit=4&page=1`);
      if (data.success) {
        setRooms(data.rooms);
        setIsLoadingRooms(false);
      } else {
        toast.error("Failed to fetch rooms");
        setIsLoadingRooms(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoadingRooms(false); // Ensure loading state is reset
    }
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setIsLoadingUser(false);
        return;
      }
      const { data } = await axios.get(`${API_BASE}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setIsOwner(data.roles === "hotelOwner");
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error in fetchUser:", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setIsOwner(false);
      setIsLoadingUser(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = useMemo(
    () => ({
      currency,
      navigate,
      user,
      getToken,
      isOwner,
      setIsOwner,
      userData,
      setUserData,
      showHotelReg,
      setShowHotelReg,
      isLoadingUser,
      rooms,
      setRooms,
      isLoadingrooms,
      setIsLoadingRooms,
      experience,
      setExperience,
    }),
    [
      currency,
      navigate,
      user,
      getToken,
      isOwner,
      userData,
      showHotelReg,
      isLoadingUser,
      rooms,
      isLoadingrooms,
      experience,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
