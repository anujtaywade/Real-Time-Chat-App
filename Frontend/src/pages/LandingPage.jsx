import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#386641] via-[#527a4a] to-[#89B153] overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            bottom: '10%',
            right: '10%',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-white/5 rounded-full blur-2xl transition-transform duration-1000"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 flex justify-between items-center px-8 md:px-16 py-6">
        <div className="flex items-center gap-3">
         
          <span className="text-2xl font-bold text-white">Zoroa</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
    
          <a href="#about" className="text-white/90 hover:text-white transition-colors">About</a>
          <Link to="/login">
            <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-12 lg:py-20 gap-12">
        
        {/* Left Content */}
        <div 
          className={`flex-1 space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
   
         

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Find your nearest
            <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent animate-pulse">
              mate
            </span>
            <span className="block mt-2">and start chat together</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/80 max-w-xl leading-relaxed">
            Connect instantly with people nearby. Build friendships, share moments, and never feel alone again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Link to="/login">
              <button className="group relative px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  Get started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-black font-semibold">
                  Get started →
                </span>
              </button>
            </Link>
            
           
          </div>
         
        </div>

        {/* Right Content - Image Section */}
        <div 
          className={`flex-1 relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative w-full max-w-lg mx-auto">
            
            {/* Main Image Container */}
            <div className="relative">
              
              {/* Image Card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img
                  className="w-full h-96 object-cover rounded-2xl opacity-90 hover:opacity-100 transition-opacity"
                  src="\luffy.PNG"
                  alt="Chat Preview"
                />
                
                {/* Floating Chat Bubbles */}
                <div className="absolute -left-4 top-20 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#386641] to-[#89B153]"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Anuj T</p>
                      <p className="text-xs text-gray-600">Hey! Coffee? ☕</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 bottom-20 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Random baddie</p>
                      <p className="text-xs text-gray-600">shut the F*ck up</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
           
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-8 md:px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Zoroa?</h2>
          <p className="text-xl text-white/80">Everything you need to connect with people nearby</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Location Based",
              description: "Find and connect with people in your area instantly"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Real-time Chat",
              description: "Instant messaging with zero delays and notifications"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: "Secure & Private",
              description: "Your conversations are encrypted and protected"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;