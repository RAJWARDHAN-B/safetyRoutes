import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import darkMapBg from './assets/darkmapbg.jpg';
import lightMapBg from './lightmapbg.png';
import profileIcon from './profileicon.png';
import { motion } from 'framer-motion';

const CloseIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 4L4 12M4 4L12 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const SafetyTipsPopup = ({ isLightMode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const safetyTips = [
    "Stay aware of your surroundings while traveling",
    "Share your location with trusted contacts",
    "Keep emergency numbers saved offline",
    "Stick to well-lit and populated routes",
    "Trust your instincts - if something feels off, take a different path",
    "Plan your route ahead of time",
    "Keep your valuables secure and out of sight",
    "Stay in contact with friends or family during travel"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 left-4 max-w-xs p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      isLightMode 
        ? 'bg-gray-400 text-gray-800 shadow-gray-200' 
        : 'bg-gray-900 text-white shadow-black/20'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`text-sm font-semibold mb-1 ${
            isLightMode ? 'text-gray-900' : 'text-gray-100'
          }`}>
            Safety Tip:
          </h4>
          <div className="relative h-15">
            <p className={`text-sm absolute w-full transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
            } ${isLightMode ? 'text-blue-900' : 'text-gray-300'}`}>
              {safetyTips[currentTipIndex]}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={`ml-2 p-1 rounded-full transition-colors ${
            isLightMode 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'hover:bg-gray-800 text-gray-300'
          }`}
        >
          <CloseIcon />
        </button>
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-1 w-50 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            isLightMode ? 'bg-blue-500' : 'bg-yellow-500'
          }`}
          style={{
            width: `${((currentTipIndex % safetyTips.length) / (safetyTips.length - 1)) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

const MissionPathAnimation = ({ isLightMode }) => {
  return (
    <div className="absolute inset-0 h-[500px] pointer-events-none z-10">
      <svg
        className="absolute top-11/60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px]"
        viewBox="0 0 300 150"
      >
        <motion.path
          d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
          fill="none"
          stroke={isLightMode ? '#0000FF' : '#FFDD00'}
          strokeWidth="2.5"
          strokeDasharray="10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <circle cx="20" cy="140" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
        <circle cx="280" cy="60" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
      </svg>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 relative ${isLightMode ? "bg-gray-100" : "bg-[#0A0F1F]"}`}>
      {!isLightMode && (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${darkMapBg})` }}></div>
          <MissionPathAnimation isLightMode={isLightMode} />
        </>
      )}
      {isLightMode && (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${lightMapBg})` }}></div>
          <MissionPathAnimation isLightMode={isLightMode} />
        </>
      )}

      {/* Navbar */}
      <div className="absolute top-2 left-105 right-0 flex items-center p-4 z-30 text-xl">
        {/* Navigation Links on the Left */}
        <div className="flex space-x-10">
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/how")}
          >
            How it Works
          </button>
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/file")}
          >
            File a Report
          </button>
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/aboutus")}
          >
            About Us
          </button>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          <button
            className={`relative w-13 h-6 flex items-center right-60 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? "bg-[#D8B4FE]" : "bg-[#7C3AED]"}`}
            onClick={() => setIsLightMode(!isLightMode)}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isLightMode ? "translate-x-7" : "translate-x-0"}`}></div>
          </button>
        </div>
      </div>  

      <div className={`absolute top-5 left-7 text-3xl font-extrabold transition-all z-30 ${isLightMode ? "text-gray-900" : "text-[#EAEAEA]"}`}>WaySecure</div>
      
      <div className={`flex-1 flex flex-col items-center justify-center text-center px-6 ${isLightMode ? "bg-gray-100" : "bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A]"}`}>
        <h1 className={`text-5xl font-bold transition-all z-20 ${isLightMode ? "text-gray-900" : "text-gray-300"}`}>WaySecure</h1>
        <p className={`mt-3 text-xl transition-all z-20 ${isLightMode ? "text-gray-700" : "text-gray-400"}`}>Our mission is to help you travel with Confidence</p>
        
        {/* Get Directions Button */}
        <button
          className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20
            ${isLightMode
              ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
              : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
            }`}
          onClick={() => navigate("/map")}
        >
          Get Directions
        </button>
      </div>

      <div className="absolute top-6 right-5 flex space-x-4 z-30">
        <button
          className={`w-18 h-7.5 text-sm rounded-md transition font-medium px-4 py-1
            ${isLightMode
              ? "bg-[#D8B4FE] text-black hover:bg-[#C084FC]"
              : "bg-gradient-to-b from-[#A855F7] to-[#7C3AED] text-white hover:from-[#C084FC] hover:to-[#9333EA]"
            }`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className={`w-18 h-7.5 text-sm rounded-md transition font-medium px-4 py-1
            ${isLightMode
              ? "bg-[#D8B4FE] text-black hover:bg-[#C084FC]"
              : "bg-gradient-to-b from-[#A855F7] to-[#7C3AED] text-white hover:from-[#C084FC] hover:to-[#9333EA]"
            }`}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/accounts")}
          className={`p-1 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 
            ${isLightMode ? 'bg-[#D8B4FE] hover:bg-[#C084FC]' : 'bg-purple-800 hover:bg-purple-900'}`}
        >
          <img src={profileIcon} alt='profile' className="w-full h-full object-cover rounded-full" />
        </button>
      </div>

      <SafetyTipsPopup isLightMode={isLightMode} />

      <footer className={`w-full text-center py-2 mt-5 z-60 ${isLightMode ? "bg-gray-200 text-gray-800" : "bg-[#1C1C1C] text-gray-400"}`}>
        Designed and developed by team HackElite
      </footer>
    </div>
  );
};

export default LandingPage;