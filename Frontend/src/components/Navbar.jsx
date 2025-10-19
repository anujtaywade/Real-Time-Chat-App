import React from "react";
import { NavLink, useLocation, Navigate, useNavigate } from "react-router-dom";
import { FaSlack, FaUserCircle, FaCopy } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";
import AddFriend from "./AddFriend";

const Navbar = ({ Theme, setTheme, onMenuClick }) => {
  const location = useLocation();
  const absoluteLoation = ["/", "/signup", "/login"];
  const isAbsolute = absoluteLoation.includes(location.pathname);
  const navigate = useNavigate();

  const { User, logout } = useContext(AuthContext);

  const [Open, setOpen] = useState(false);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [ThemeOpen, setThemeOpen] = useState(false);
  const [LogoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutOpen(false);
    setOpen(false);
    navigate("/login");
  };

  const handleCopiedText = () => {
    navigator.clipboard
      .writeText(User.uniqueID)
      .then(() => {
        toast.success("Text Copied");
      })
      .catch((error) => {
        toast.error("cannot copy text");
      });
  };

  return (
    <div className="">
      <div
        className={`${
          !isAbsolute
            ? "border-b shadow-sm fixed top-0 w-full h-[70px] flex items-center justify-between px-4 bg-gradient-to-r from-purple-600 to-indigo-600 z-50 text-white"
            : null
        }`}
      >
        {!isAbsolute && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-white hover:bg-purple-700 transition-colors mr-2"
            aria-label="Toggle chat list"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        )}

        <h1
          className={`font-[poppins] font-bold text-4xl ${
            isAbsolute
              ? "absolute left-15 top-5 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          Zoroa
        </h1>

        <div className="flex items-center ml-auto">
          {!isAbsolute && User && <AddFriend UserId={User.id} />}

          {!isAbsolute && User && (
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-3xl text-white hover:text-gray-200 transition-all duration-200 ml-4"
              >
                <FaUserCircle />
              </button>

              {Open && (
                <div className="absolute right-0 top-10 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-3 z-50 animate-fadeIn">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    ✕
                  </button>

                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{User.name}</p>
                    <p className="text-xs text-gray-500">{User.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setProfileOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <span className="text-lg">👤</span>
                    <span className="text-gray-700 font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setThemeOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <span className="text-lg">🎨</span>
                    <span className="text-gray-700 font-medium">Theme</span>
                  </button>

                  <button
                    onClick={() => {
                      setLogoutOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition-all duration-200 flex items-center gap-2 border-t border-gray-100"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {ProfileOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-96 relative transform transition-all">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  setOpen(false);
                }}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-2xl font-bold transition-colors"
              >
                ✕
              </button>
              <div className="flex flex-col items-center mb-6">
                <div className="bg-gradient-to-br from-[#386641] to-[#89B153] rounded-full p-5 mb-4 shadow-lg">
                  <FaUserCircle className="text-7xl text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#386641] to-[#44641a] bg-clip-text text-transparent">
                  {User.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{User.email}</p>
              </div>
              <div className="space-y-4 bg-gray-50 rounded-2xl p-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">Account Created</span>
                  <span className="text-gray-800 text-sm font-semibold">
                    {User?.createdAt
                      ? new Date(User.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-gray-600 text-xs font-medium block">Zoroa ID</span>
                    <span className="text-gray-800 font-mono text-sm">{User.uniqueID}</span>
                  </div>
                  <button
                    onClick={handleCopiedText}
                    className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-green-700"
                  >
                    <FaRegCopy className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {ThemeOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-80 relative">
              <button
                onClick={() => setThemeOpen(false) || setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl transition-colors"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Select Theme
              </h2>
              <button
                onClick={() => {
                  setTheme(true) || setThemeOpen(false) || setOpen(false);
                }}
                className="flex items-center justify-between w-full px-5 py-4 mb-3 rounded-xl hover:bg-gray-800 hover:text-white transition-all shadow-md bg-gray-100 group"
              >
                <span className="font-medium">🌙 Dark Mode</span>
                <div className="w-5 h-5 rounded-full bg-gray-800 group-hover:bg-white transition-colors"></div>
              </button>
              <button
                onClick={() => {
                  setTheme(false) || setThemeOpen(false) || setOpen(false);
                }}
                className="flex items-center justify-between w-full px-5 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-md bg-gray-100 group"
              >
                <span className="font-medium">☀️ Light Mode</span>
              </button>
            </div>
          </div>
        )}

        {LogoutOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-80 relative">
              <button
                onClick={() => setLogoutOpen(false) || setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
              <div className="text-center">
                <p className="text-gray-500 mb-6 text-xl font-bold">
                  Are you sure you want to logout?
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setLogoutOpen(false) || setOpen(false)}
                  className="w-full py-3 mt-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
