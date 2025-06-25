import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="h-screen ">
      <Navbar />
      {/* Other components can be added here */}
      <Home />
    </div>
  );
};

export default App;
