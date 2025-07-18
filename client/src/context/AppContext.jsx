import React, { createContext, useContext, useEffect, useState } from "react";
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

  const [isOwner, setIsOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setIsLoggedIn(true);
        if (data.role === "hotelOwner") {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } else {
        setTimeout(() => {
          fetchUser();
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setIsLoggedIn(false);
      setIsOwner(false);
    }
  }, [user]);
  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    isLoggedIn,
    setIsLoggedIn,
    showHotelReg,
    setShowHotelReg,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
