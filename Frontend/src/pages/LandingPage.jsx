import React from 'react'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div className='flex min-h-screen bg-gradient-to-r from-[#386641] to-[#89B153]'>
        <h1 className='absolute top-[35%] left-[14%] text-5xl text-white font-bold '>
          Find your nearest mate <br />and start chat together
        </h1>

        <Link to={"/login"}>
        <button className='absolute top-[60%] left-[14%]  bg-black text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out text-xl mt-4' >
          Get started
        </button>
        </Link>

        <div >
        {/* <img
        className='absolute left-[60%] top-[30%] h-[25%]'
        src="\landin page zoro.PNG" alt="zoro" /> */}
        <img
        className='absolute left-[60%] top-[30%] h-[55%] opacity-90' 
        src="\luffy.PNG" alt="" />
        <img
        className='absolute left-[70%] top-[30%] h-[25%]' 
        src="" alt="" />

        </div>

      
      </div>
    </div>
  )
}

export default LandingPage
