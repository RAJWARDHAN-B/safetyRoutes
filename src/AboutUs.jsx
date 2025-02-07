import React, { useState } from 'react';
import pinImage from "./assets/pin.jpeg";
import mapImage from "./assets/map.jpg";
import emerImage from "./assets/emergency.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-900' : 'bg-white'} transition-all`}>
      {/* Navbar */}
      <div className={`absolute top-2 left-120 right-0 flex items-center p-4 z-30 text-xl ${isLightMode ? 'text-black' : 'text-white'}`}>
        <div className="flex space-x-10"> <a href="/how-it-works" className="font-medium">How it Works</a>
          <a href="/file" className="font-medium">File a Report</a>
          <a href="/about-us" className="font-medium">About Us</a>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center">
          <button
            className={`relative w-13 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? 'bg-[#7C3AED]' : 'bg-[#D8B4FE]'}`}
            onClick={() => setIsLightMode(!isLightMode)}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isLightMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      {/* Header */}
      

      <Link
        to="/"
        className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold transition-all z-30 ${
          isLightMode
            ? 'text-[#EAEAEA] drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]'
            : 'text-black drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]'
        }`}
      >
        WaySecure
      </Link>


      {/* Main Content */}

      <div className={`pt-32 pb-12 px-6 max-w-7xl mx-auto ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            We help you navigate safely through your city with real-time data and recommendations.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <span className="text-blue-500 text-2xl">🗺️</span>
              <h2 className="text-xl font-semibold ml-3">Route Safety Mapping</h2>
            </div>
            <p>Our system tracks the safest routes in real-time, using community feedback and official data.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <span className="text-green-500 text-2xl">📍</span>
              <h2 className="text-xl font-semibold ml-3">Safe Locations</h2>
            </div>
            <p>We provide information about safe zones, including police stations, hospitals, and more.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <span className="text-red-500 text-2xl">🚨</span>
              <h2 className="text-xl font-semibold ml-3">Emergency Alerts</h2>
            </div>
            <p>Stay informed with emergency alerts, helping you avoid hazardous areas in real-time.</p>
          </div>
        </div>

        {/* New Content Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg mb-10">
            We aim to make urban navigation safer by using real-time data, integrating local community feedback, and constantly updating our map systems.
          </p>

          <div className="flex justify-center space-x-8">
            {/* Image 1 */}
            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
              <img src={mapImage} alt="Map Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
              <p>Maps & Routing</p>
            </div>

            {/* Image 2 */}
            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
              <img src={pinImage} alt="Location Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
              <p>Safe Locations</p>
            </div>

            {/* Image 3 */}
            <div className={`p-4 shadow-md rounded-lg ${isLightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
              <img src={emerImage} alt="Alert Icon" className="w-24 h-24 object-cover rounded-lg mb-4" />
  
              <p>Emergency Alerts</p>
            </div>
          </div>
        </div>

        {/* New Content Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg mb-10">
            We aim to make urban navigation safer by using real-time data, integrating local community feedback, and constantly updating our map systems. Whether you're commuting, running errands, or out exploring, our goal is to keep you safe and informed.
          </p>

          <div className="flex justify-center space-x-8">
            {/* Image 1 */}
            <div className={`bg-white p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800'} transition-all`}>
              <img
                src="https://via.placeholder.com/200x200.png?text=Map+Icon"
                alt="Map Icon"
                className="w-24 h-24 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">Maps & Routing</p>
            </div>

            {/* Image 2 */}
            <div className={`bg-white p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800'} transition-all`}>
              <img
                src="https://via.placeholder.com/200x200.png?text=Location+Icon"
                alt="Location Icon"
                className="w-24 h-24 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">Safe Locations</p>
            </div>

            {/* Image 3 */}
            <div className={`bg-white p-4 shadow-md rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800'} transition-all`}>
              <img
                src="https://via.placeholder.com/200x200.png?text=Alert+Icon"
                alt="Alert Icon"
                className="w-24 h-24 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">Emergency Alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
