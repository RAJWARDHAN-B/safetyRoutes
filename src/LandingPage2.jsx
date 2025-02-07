import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import darkMapBg from './assets/darkmapbg.jpg'; // Import the image
import profileIcon from './profileIcon.png';
import { motion } from 'framer-motion'; // Import motion for the animation

const MissionPathAnimation = () => {
  return (
    <div className="absolute inset-0 h-[500px] pointer-events-none z-10">
      <svg
      className="absolute top-11/60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px]"

        viewBox="0 0 300 150"
      >
        {/* Animated Path */}
        <motion.path
          d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
          fill="none"
          stroke="#FFDD00"
          strokeWidth="3"
          strokeDasharray="10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Start Pin */}
        <circle cx="20" cy="140" r="5" fill="#FFDD00" />

        {/* End Pin */}
        <circle cx="280" cy="60" r="5" fill="#FFDD00" />
      </svg>
    </div>
  );
};

const LandingPage2 = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 relative ${
        isLightMode ? "bg-white" : "bg-[#0A0F1F]"
      }`}
    >
      {/* Background Image for Dark Mode */}
      {!isLightMode && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${darkMapBg}), linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 10%)`,
            }}
          ></div>

          <MissionPathAnimation /> {/* Add the animation here */}
        </>
      )}
          {/* Background Image for Dark Mode */}
          {!isLightMode && (
        <>
          <div
            className="absolute in  set-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${darkMapBg}), linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 10%)`,
            }}
          ></div>

          <MissionPathAnimation /> {/* Add the animation here */}
        </>
      )}


      {/* Navbar */}
      <div className="absolute top-2 left-100 right-0 flex items-center p-4 z-30 text-xl">
        {/* Navigation Links on the Left */}
        <div className="flex space-x-10">
          <button
            className="text-white font-medium"
            onClick={() => navigate("/how-it-works")}
          >
            How it Works
          </button>
          <button
            className="text-white font-medium"
            onClick={() => navigate("/file")}
          >
            File a Report
          </button>
          <button
            className="text-white font-medium"
            onClick={() => navigate("/aboutus")}
          >
            About Us
          </button>
        </div>

        {/* Empty space to push the toggle button to the center */}
        <div className="flex-grow"></div>

        {/* Toggle Button in the Center */}
        <div className="flex items-center">
          <button
            className={`relative w-13 h-6 flex items-center right-20 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isLightMode ? "bg-[#D8B4FE]" : "bg-[#7C3AED]"
            }`}
            onClick={() => setIsLightMode(!isLightMode)}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                isLightMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Header (WaySecure at the top-left) */}
      <div
        className={`absolute top-5 left-7 text-3xl font-extrabold transition-all z-30
    ${
      isLightMode
        ? "text-black drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"  // Light Mode: Normal black text
        : "text-[#EAEAEA] drop-shadow-[0_0_2px_rgba(255,255,255,0.09)]" // Dark Mode: Glow Effect
    }`}
      >
        WaySecure
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col items-center justify-center text-center px-6 ${
          isLightMode ? "bg-white" : "bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A]"
        }`}
      >
        {/* Center Content */}
        <h1
          className={`text-5xl font-bold transition-all z-20 text-3xl
  ${isLightMode ? "text-gray-800" : "text-gray-300"}`}
        >
          WaySecure
        </h1>

        <p
          className={`mt-3 text-xl transition-all z-20
  ${isLightMode ? "text-gray-700" : "text-gray-400"}`}
        >
          Our mission is to guide your way to security. <br />
          We’re here to help you travel with confidence.
        </p>

        {/* Get Directions Button */}
        <button
          className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20
    ${
      isLightMode
        ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]" // Light Green in Light Mode
        : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
    }`}
          onClick={() =>navigate("/map")}
        >
          Get Directions
        </button>
      </div>
      <div className="absolute top-5 right-5 flex space-x-4 z-30">
        <button 
         onClick={() => navigate("/profile")}
        className="bg-purple-800 p-1 rounded-full hover:bg-purple-900 transition w-10 h-10 flex items-center justify-center">
          <img
            src="waysecure\src\avatarr.png"
            className="w-full h-full object-cover rounded-full"
          />
          <img src={profileIcon} alt='profile'/>
        </button>
      </div>
    </div>
    
  );
};

export default LandingPage2;