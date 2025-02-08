import React, { useState } from 'react';

const FileReport = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [crime, setCrime] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4  transition-colors duration-300">
      <a href="/LandingPage2" className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${!darkMode ? 'text-gray-800' : 'text-white'}`}>
  WaySecure
</a>


        {/* Theme Toggle Switch */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-290 w-14 h-7 relative rounded-full transition-colors duration-300 focus:outline-none"
        >
          <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            darkMode ? 'bg-purple-600' : 'bg-gray-300'
          }`}></div>
          <div className={`absolute w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
            darkMode ? 'translate-x-1' : 'translate-x-8'
          } top-1`}></div>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto mt-16 px-4">
        <h2 className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          FILE YOUR REPORT
        </h2>

        <div className="space-y-6">
          {/* Location Input */}
          <div>
            <label className={`block text-sm mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Enter Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full p-2.5 rounded-lg border transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter location"
              />
              <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
              }`}>
                📍
              </button>
            </div>
          </div>

          {/* Time Input */}
          <div>
            <label className={`block text-sm mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full p-2.5 rounded-lg border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter time"
            />
          </div>

          {/* Crime Dropdown */}
          <div>
            <label className={`block text-sm mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Crime
            </label>
            <select
              value={crime}
              onChange={(e) => setCrime(e.target.value)}
              className={`w-full p-2.5 rounded-lg border appearance-none transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="" disabled>Select crime type</option>
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="vandalism">Vandalism</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label className={`block text-sm mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-1.5 rounded-lg border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Please describe what happened"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            className={`mb-8 w-full py-2.5 rounded-lg font-medium transition-colors duration-300 ${
              darkMode 
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileReport;