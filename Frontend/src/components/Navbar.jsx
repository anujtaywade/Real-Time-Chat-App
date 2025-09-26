import React from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const absoluteLoation = ["/","/signup","/login"]
  const isAbsolute = absoluteLoation.includes(location.pathname)

  return (
    <div className=''>
    <div className={`${!isAbsolute? "border-b-2 fixed top-0  w-full bg-white z-50" : null}`}>
         <h1 className={`font-[poppins] font-bold text-5xl bg-transparent ${isAbsolute ? "absolute left-15 top-5 ": "m-2 "} `}>
          Zoroa
         </h1>
    </div>
    </div>
  )
}

export default Navbar
