import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { AtSign , LockKeyhole  } from "lucide-react";
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

      

    
    <img 
  className={`size-56 absolute top-[6%] right-[19%] md:right-[12%] md:top-[5%] lg:top-[-4%] lg:right-[42%] z-20 transition-all duration-1000 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
  }`}
  src="/gojo.png" 
  alt="" 
/>

     
      <div 
        className={`relative z-10 bg-white/95 backdrop-blur-lg mt-10 p-8 md:p-8 rounded-3xl shadow-2xl w-[90%] max-w-[440px] border border-white/20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
      

        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h2>
        <h1 className="text-lg text-gray-600 text-center mb-6">
          Login to <span className='font-bold bg-gradient-to-r from-[#386641] to-[#89B153] bg-clip-text text-transparent'>Zoroa</span>
        </h1>

      
        {error && (
          <div className='flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-4 animate-shake'>
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className='text-sm text-red-600 font-medium'>{error}</span>
          </div>
        )}

      
        <form onSubmit={handleLogin} className="space-y-5">
         
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <AtSign className='w-5 opacity-30'/>
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

      
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockKeyhole className='w-5 opacity-30' />
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

         
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className='font-semibold text-[#6A994E] hover:text-[#386641] underline transition-colors'>
              Sign up
            </Link>
          </p>

       
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6A994E] to-[#386641] text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>
        </form>

      
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