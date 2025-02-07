import React, { useState } from 'react';

const HowItWorks = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeText, setActiveText] = useState('');

  const features = [
    {
      id: 'help',
      component: (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveText(activeText === 'help' ? '' : 'help')}
            className={`px-7 py-5 shadow-md rounded-lg border-2 w-64 animate-pulse z-20 ${
              darkMode ? "bg-red-600 border-red-800 text-white" : "bg-red-500 border-red-700 text-white"
            }`}
          >
            ⚠ <span className="font-bold">HELP</span>
          </button>
          <div className={`transition-all duration-300 overflow-hidden ${
            activeText === 'help' ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'
          }`}>
            Instantly sends an sms to your emergency contact informing them that you are in trouble.
          </div>
        </div>
      )
    },
    {
      id: 'police',
      component: (
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveText(activeText === 'police' ? '' : 'police')}
              className={`p-3 flex items-center w-64 transition-colors duration-200 rounded-lg
                ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            >
              🚔 <span className="ml-2">Police Stations</span>
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${
              activeText === 'police' ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'
            }`}>
              this button is present on the side bar of the map page , on clicking this icon , it will display all the 
              nearby police stations .
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveText(activeText === 'phone' ? '' : 'phone')}
              className={`p-3 flex items-center w-64 transition-colors duration-200 rounded-lg
                ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            >
              📞 <span className="ml-2">Phone</span>
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${
              activeText === 'phone' ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'
            }`}>
             This icon present on the sidebar of the map page allows quick access to emergency contact numbers, so via our website , you can call anyone one you want to if you are feeling unsafe.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'directions',
      component: (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveText(activeText === 'directions' ? '' : 'directions')}
            className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20 w-64
              ${!darkMode
                ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
                : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
              }`}
          >
            Get Directions
          </button>
          <div className={`transition-all duration-300 overflow-hidden mt-6 ${
            activeText === 'directions' ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'
          }`}>
            Find the safest route to your destination using this button. this will direct you to the map page and help you find your your safe route .
          </div>
        </div>
      )
    },
    {
      id: 'report',
      component: (
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveText(activeText === 'report' ? '' : 'report')}
            className="relative font-semibold hover:underline hover:font-bold transition-all w-64"
          >
            File a Report
          </button>
          <div className={`transition-all duration-300 overflow-hidden ${
            activeText === 'report' ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'
          }`}>
            This button on the Home page allows u to file reports when you see or hear about a crime in aparticular vicinity.However for this feature, you need to create your account first or login if you already have one ! we have added this feature so our user can not only navigate through safe routes , but also lodge complaints if they have to , our model will upgrade eventually
            
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={darkMode ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end mb-6">
          <div className="w-12 h-6 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                darkMode ? 'translate-x-6' : ''
              }`}
              onClick={() => setDarkMode(!darkMode)}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`p-6 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {feature.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;