import { useState } from "react";
import PoliceStationsPopup from "./PoliceStationsPopup"; // Import the Popup component

const Map = () => {
  const [showPolicePopup, setShowPolicePopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      {/* Police Stations Button */}
      <button
        className={`p-3 flex items-center w-full transition-colors duration-200 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
        onClick={() => setShowPolicePopup(true)} // Show popup when clicked
      >
        🚔 Police Stations
      </button>

      {/* Show Police Stations Popup if state is true */}
      {showPolicePopup && (
        <PoliceStationsPopup darkMode={darkMode} setShowPolicePopup={setShowPolicePopup} />
      )}
    </div>
  );
};

export default Map;
