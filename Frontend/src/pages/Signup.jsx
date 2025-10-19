import React, { useState, useEffect } from "react";
import api from "../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#386641] via-[#527a4a] to-[#89B153] overflow-hidden">
 
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            top: "15%",
            left: "5%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            bottom: "15%",
            right: "10%",
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
          }}
        />
      </div>

     
      <img
        src="/Inosuke.png"
        alt="Character"
        className={`size-40  absolute top-[13%] right-[17%] md:right-[42%] md:top-[4%] lg:top-[4%] lg:right-[41%] w-fit transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      />

   
      <div
        className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl mt-10 p-8 w-[90%]  max-w-md transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-6">
          Zoroa Signup
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none bg-white/20 text-white placeholder-white/70 focus:bg-white/30 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none bg-white/20 text-white placeholder-white/70 focus:bg-white/30 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none bg-white/20 text-white placeholder-white/70 focus:bg-white/30 transition-all"
          />

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-black text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white/80 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-200 hover:text-yellow-300 font-medium underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
