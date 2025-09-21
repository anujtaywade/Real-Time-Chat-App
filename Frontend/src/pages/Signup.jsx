import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [formData, setformData] = useState({
        name:"",
        email:"",
        password:""
    });

    const [Error, setError] = useState("");


    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const handleSignup= ()=>{

    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#3C7A89] to-[#2E4756]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-black text-center mb-2">
          Create Account
        </h2>
        <h1 className="text-lg text-gray-600 text-center mb-6">
          Welcome to Zoo
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
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
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3C7A89] text-white py-2 rounded-lg hover:bg-[#2E4756] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup
