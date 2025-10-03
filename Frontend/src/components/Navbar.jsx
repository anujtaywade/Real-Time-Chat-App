import React from "react";
import { NavLink, useLocation,Navigate, useNavigate } from "react-router-dom";
import { FaSlack, FaUserCircle,FaCopy } from "react-icons/fa";
import { useState ,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import  toast  from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";


const Navbar = ({Theme , setTheme}) => {
  const location = useLocation();
  const absoluteLoation = ["/", "/signup", "/login"];
  const isAbsolute = absoluteLoation.includes(location.pathname);
  const {User , logout} = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(User)


  const [Open, setOpen] = useState(false);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [ThemeOpen, setThemeOpen] = useState(false);
  const [LogoutOpen, setLogoutOpen] = useState(false);
 

const handleLogout=()=>{
  logout()
  setLogoutOpen(false)
  setOpen(false)
  navigate("/login")
}

const handleCopiedText =()=>{
  navigator.clipboard.writeText(User.uniqueID)
  .then(()=>{
      toast.success("Text Copied")
  })
  .catch((error)=>{
    toast.error("cannot copy text")
  })
  
}



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
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-80 relative">
   
      <button
        onClick={() => {
          setProfileOpen(false);
          setOpen(false);
        }}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
      >
        ✕
      </button>

   
      <div className="flex flex-col items-center mb-4">
        <div className="bg-gray-200 rounded-full p-4 mb-2">
          <FaUserCircle className="text-6xl text-gray-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{User.name}</h2>
        <p className="text-gray-500 text-sm">{User.email}</p>
      </div>

      <hr className="my-4 border-gray-200" />

  
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Account :<br />Created</span>
          <span>
            {User?.createdAt
              ? new Date(User.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>

        <div className="flex justify-between text-gray-700 font-medium">
          <span>Zoroa ID:</span> 
          
          <span className="text-gray-500">{User.uniqueID}</span> 
           <button onClick={handleCopiedText } >
            <FaRegCopy />
          </button>
        </div>
         
      
      </div>

    
   
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

              <button
               onClick={()=>{setTheme(true) || setThemeOpen(false) || setOpen(false)}}
              className="flex items-center w-full px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 transition shadow-sm ">
                Dark Mode 
              </button>
              

              <button
              onClick={()=>{setTheme(false) || setThemeOpen(false) || setOpen(false)}}
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                Light Mode
              </button>
            </div>
          </div>
        )}       

        {LogoutOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
              <button
                onClick={() => setLogoutOpen(false) || setOpen(false) }
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <div >
                <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <button onClick={handleLogout} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" >
                Logout
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
