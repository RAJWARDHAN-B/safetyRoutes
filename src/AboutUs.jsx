import React, { useState } from 'react';
import { Link } from "react-router-dom";
import pinimage from './pin.jpeg';
import mapimage from './mapp.jpg';
import helpimage from './danger.jpg';

const AboutUs = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white' : 'bg-[#0F172A]'}`}>
      {/* Navbar */}
      <div className="absolute top-2 left-106 right-0 flex items-center p-4 z-30 text-xl">
        <div className="flex space-x-10">
          <a href="/how-it-works" className={`font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>How it Works</a>
          <a href="/file" className={`font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>File a Report</a>
          <a href="/about-us" className={`font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>About Us</a>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          <button
            className={`relative w-13 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? 'bg-[#D8B4FE]' : 'bg-[#7C3AED]'}`}
            onClick={() => setIsLightMode(!isLightMode)}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isLightMode ? 'translate-x-0' : 'translate-x-7'}`}></div>
          </button>
        </div>
      </div>

      {/* Logo */}
      <a href="/" className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
        WaySecure
      </a>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>About Us</h1>
          <p className={`text-lg ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
            We help you navigate safely through your city with real-time data and recommendations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          {/* Route Safety Card */}
          <div className={`rounded-lg p-8 ${isLightMode ? 'bg-white shadow-lg' : 'bg-[#1E293B]'}`}>
            <div className="flex items-center mb-4">
              <span className="text-3xl">📚</span>
              <h2 className={`text-xl font-semibold ml-3 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Route Safety Mapping</h2>
            </div>
            <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>
              Our system tracks the safest routes in real-time, using community feedback and official data.
            </p>
          </div>

          {/* Safe Locations Card */}
          <div className={`rounded-lg p-8 ${isLightMode ? 'bg-white shadow-lg' : 'bg-[#1E293B]'}`}>
            <div className="flex items-center mb-4">
              <span className="text-3xl">📍</span>
              <h2 className={`text-xl font-semibold ml-3 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Safe Locations</h2>
            </div>
            <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>
              We provide information about safe zones, including police stations, hospitals, and more.
            </p>
          </div>

          {/* Emergency Alerts Card */}
          <div className={`rounded-lg p-8 ${isLightMode ? 'bg-white shadow-lg' : 'bg-[#1E293B]'}`}>
            <div className="flex items-center mb-4">
              <span className="text-3xl">🚨</span>
              <h2 className={`text-xl font-semibold ml-3 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Emergency Alerts</h2>
            </div>
            <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>
              Stay informed with emergency alerts, helping you avoid hazardous areas in real-time.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className={`text-2xl font-semibold mb-6 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Our Mission</h2>
          <p className={`text-lg mb-12 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
            We aim to make urban navigation safer by using real-time data, integrating local community feedback, and constantly updating our map systems.
          </p>

          {/* Icons Section */}
          <div className="flex justify-center space-x-8">
            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-[#1E293B]'}`}>
              <img src={mapimage} alt="Map Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
              <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>Maps & Routing</p>
            </div>

            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-[#1E293B]'}`}>
              <img src={pinimage} alt="Location Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
              <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>Safe Locations</p>
            </div>

            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-[#1E293B]'}`}>
              <img src={helpimage} alt="Alert Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
              <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>Maps & Routing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;