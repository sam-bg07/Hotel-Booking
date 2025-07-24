import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
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
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [rooms, setRooms] = useState([]);

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const fetchRooms = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("You are not logged in");
        return;
      }
      const { data } = await axios.get(`${API_BASE}/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error("Failed to fetch rooms");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("You are not logged in");
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
      } else {
        setTimeout(() => {
          fetchUser();
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoadingUser(false); // ALWAYS set loading to false
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setIsOwner(false);
      setIsLoadingUser(false); // Set loading to false if no user
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    isLoadingUser,
    rooms,
    setRooms,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
