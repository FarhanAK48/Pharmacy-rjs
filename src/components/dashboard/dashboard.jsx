import React from 'react'
import { useNavigate } from 'react-router-dom';

 const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="relative h-full flex  justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${require("../../ph1.jpg")})` }}>
    <div className="absolute inset-0 bg-black opacity-60"></div>  {/* Overlay for better contrast */}
    
    <h1 className="text-white text-4xl mt-60 sm:text-5xl md:text-6xl font-bold text-center z-10">
      Welcome to Your Pharmacy Dashboard
    </h1>
  
 
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10">
      <button onClick={() => navigate('/product')} className="bg-[#38B2AC] text-white py-2 px-6 rounded-lg shadow-lg text-lg font-semibold hover:bg-[#319C8C] transition duration-300">
        Explore Now
      </button>
    </div>
    <p className="absolute top-2/4 left-1/2 mt-16 transform -translate-x-1/2 text-white text-lg sm:text-xl font-semibold text-center z-10">
      Discover your medicines, health products, and more, all in one place.
    </p>
  

  </div>
  )
}
export default Dashboard;