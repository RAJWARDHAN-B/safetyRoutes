import React, { useState } from 'react';

const LoginPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300 p-4`}>
      {/* Theme Toggle - Smaller size and adjusted positioning */}
  
      <div className="absolute top-4 right-4">

        <button
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full p-0.5 ${isDarkMode ? 'bg-gray-600' : 'bg-blue-400'} transition-colors duration-300`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
              isDarkMode ? '' : 'translate-x-6'
            }`}
          />
        </button>
      </div>

      {/* Login Form */}
      <div className={`w-full max-w-md mt-30 ${isDarkMode ? 'bg-black' : 'bg-white'} p-6 rounded-lg shadow-lg mx-auto transition-colors duration-300`}>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>Welcome back!</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-6`}>Enter your credentials to access your account</p>

        {/* Email Field */}
        <div className="flex flex-col mb-3">
          <label className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={`p-2 rounded-md ${
              isDarkMode 
                ? 'bg-black text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
            } border outline-none`}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col mb-3">
          <label className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1 flex justify-between`}>
            Password <a href="#" className="text-blue-400 text-sm">Forgot password?</a>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className={`p-2 rounded-md ${
              isDarkMode 
                ? 'bg-black text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
            } border outline-none`}
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Remember for 30 days
          </label>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Login
        </button>

        {/* Sign Up Redirect */}
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm text-center mt-4`}>
          Don't have an account? <a href="/signup" className="text-blue-400">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;