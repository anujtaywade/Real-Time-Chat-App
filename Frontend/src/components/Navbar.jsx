import React from "react";
import { useLocation } from "react-router-dom";
import { FaSlack, FaUserCircle } from "react-icons/fa";
import { useState ,useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const absoluteLoation = ["/", "/signup", "/login"];
  const isAbsolute = absoluteLoation.includes(location.pathname);
  const {User} = useContext(AuthContext)

  console.log(User)


  const [Open, setOpen] = useState(false);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [ThemeOpen, setThemeOpen] = useState(false);
  const [LogoutOpen, setLogoutOpen] = useState(false);


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
       
      
       {!isAbsolute && User && (
         <div>
          
          <button
            onClick={() => setOpen((prev) => !prev)}
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

              <button
                onClick={() => {
                  setProfileOpen(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <h1 className="text-gray-700 font-medium">👤 Profile</h1>
              </button>

              <button
                onClick={() => {
                  setThemeOpen(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <h1 className="text-gray-700 font-medium">🎨 Theme</h1>
              </button>

              <button
                onClick={() => {
                  setLogoutOpen(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-red-100 transition"
              >
                <h1 className="text-red-600 font-medium">🚪 Logout</h1>
              </button>
            </div>
          )}
        </div>
       )}

        {ProfileOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
              <h1 className="text-2xl">Profile</h1>
              <h1>User: {User.name}</h1>
              <h1>Email:{User.email}</h1>
              <h1>account created: {User.cretedAt}</h1>
              <h1>ZoroaID:xyz1234</h1>
              <button
                onClick={() => {
                  setProfileOpen(false) || setOpen(false);
                }}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                X
              </button>
            </div>
          </div>
        )}
        

        {ThemeOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
              <button
                onClick={() => setThemeOpen(false) || setOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Select Theme
              </h2>

              <button className="flex items-center w-full px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                Dark Mode
              </button>

              <button className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                Light Mode
              </button>
            </div>
          </div>
        )}

        {LogoutOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
              <button
                onClick={() => setLogoutOpen(false) || setOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
