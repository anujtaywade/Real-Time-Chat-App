import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const absoluteLoation = ["/", "/signup", "/login"];
  const isAbsolute = absoluteLoation.includes(location.pathname);


const [Open, setOpen] = useState(false);


  return (
    <div className="">
      <div
        className={`${
          !isAbsolute ? "border-b-2 fixed top-0  w-full bg-white z-50" : null
        }`}
      >
        <h1
          className={`font-[poppins] font-bold text-5xl bg-transparent ${
            isAbsolute ? "absolute left-15 top-5 " : "m-2 "
          } `}
        >
          Zoroa
        </h1>
<div>
  <button
    onClick={() => setOpen(true)}
    className="absolute right-12 top-5 text-3xl"
  >
    <FaUserCircle />
  </button>

  {Open && (
    <div className="absolute right-5 top-14 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
    
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-black"
      >
        ✕
      </button>

    
      <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition">
        <h1 className="text-gray-700 font-medium">👤 Profile</h1>
      </button>

      <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition">
        <h1 className="text-gray-700 font-medium">🎨 Theme</h1>
      </button>

      <button className="w-full text-left px-4 py-2 rounded-md hover:bg-red-100 transition">
        <h1 className="text-red-600 font-medium">🚪 Logout</h1>
      </button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Navbar;
