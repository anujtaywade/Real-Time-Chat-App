import React from 'react'
import { useState } from 'react'
import  api  from "../api/axios.jsx";
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setformData] = useState({
        name:"",
        email:"",
        password:""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const handleSignup=async (e) => {
      e.preventDefault();
      try {
        await api.post("/auth/signup",formData)
        navigate("/login")
      } catch (err) {
        setError(err.response?.data?.error) ||
        setError(err.response?.data?.message)
      }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#386641] to-[#89B153]">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-black text-center mb-2">
          Create Account
        </h2>
        <h1 className="text-lg text-gray-600 text-center mb-6">
          Welcome to <span className='font-bold'>Zoroa</span>
        </h1>

         <div className='text-s flex items-center justify-center text-red-500'>
        {error}
      </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <p>
            Already have an Account?  <Link to="/login" className='text-[#A7C957] underline'>login</Link>

          </p>

          <button
            type="submit"
            className="w-full bg-[#6A994E] text-white py-2 rounded-lg hover:bg-[#386641] transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup
