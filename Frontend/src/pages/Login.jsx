import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password })
      console.log(res.data)
      login(res.data)
      navigate("/chat")
    } catch (error) {
      seterror(error.response?.data?.error ||
        error.response?.data?.message ||
        "something went wrong"
      )
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#386641] via-[#527a4a] to-[#89B153] overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            bottom: '20%',
            right: '15%',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`
          }}
        />
      </div>

      {/* Decorative Character Image */}
      <img 
        className={`size-64 absolute top-[10%] right-[10%] md:right-[20%] transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
        src="\gojo.png" 
        alt="" 
      />

      {/* Login Form Container */}
      <div 
        className={`relative z-10 bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl w-[90%] max-w-[440px] border border-white/20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#386641] to-[#89B153] rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h2>
        <h1 className="text-lg text-gray-600 text-center mb-6">
          Login to <span className='font-bold bg-gradient-to-r from-[#386641] to-[#89B153] bg-clip-text text-transparent'>Zoroa</span>
        </h1>

        {/* Error Message */}
        {error && (
          <div className='flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-4 animate-shake'>
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className='text-sm text-red-600 font-medium'>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A994E] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A994E] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className='font-semibold text-[#6A994E] hover:text-[#386641] underline transition-colors'>
              Sign up
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6A994E] to-[#386641] text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Decorative Element */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6A994E] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#6A994E] animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 rounded-full bg-[#6A994E] animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Login