// components/Loader.jsx
import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseAppContext } from "../context/AppContext.jsx";

const Loader = () => {
  const { nextUrl } = useParams();
  const { navigate } = UseAppContext();
  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [nextUrl]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
