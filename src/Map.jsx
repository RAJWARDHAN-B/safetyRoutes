import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import RouteForm from './components/RouteForm';
//import { Navigate } from "react-router-dom";



// Dynamically import Leaflet component to avoid SSR issues
const Map = () => {
  //const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [map, setMap] = useState(null);
  const [L, setL] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  
  // Popup states
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [showRecentPopup, setShowRecentPopup] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [showPolicePopup, setShowPolicePopup] = useState(false);

  
  // Demo data
  const [savedAddresses, setSavedAddresses] = useState([
    '', '', '', '', ''  // 5 empty slots
  ]);
  
  const [recentAddresses] = useState([
    "123 Main St, Austin, TX",
    "456 Park Ave, Houston, TX",
    "789 Oak Rd, Dallas, TX"
  ]);
  
  const [phoneNumbers, setPhoneNumbers] = useState([
    "911",
    "512-555-0123",
    "713-555-0456",
    "214-555-0789",
    "832-555-0321"
  ]);
  useEffect(() => {
    // Initialize Leaflet only on client side
    const initMap = async () => {
      const L = await import('leaflet');
      setL(L);

      const mapInstance = L.map("map", {
        zoomControl: false,
        maxBounds: [
          [33.5, -119.0], // Southwest corner
          [34.5, -117.5], // Northeast corner
        ],
        maxBoundsViscosity: 1.0, // Keeps user inside the bounds
      }).setView([34.0522, -118.2437], 12); // Center on LA
  

      // Define tile layers for both themes
      const lightTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      const darkTiles = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      });

      // Add the appropriate layer based on current theme
      if (darkMode) {
        darkTiles.addTo(mapInstance);
      } else {
        lightTiles.addTo(mapInstance);
      }

      // Store both layers in the map instance for later use
      mapInstance.lightTiles = lightTiles;
      mapInstance.darkTiles = darkTiles;

      L.control.zoom({
        position: "topright",
      }).addTo(mapInstance);

      const zoomControl = document.querySelector(".leaflet-control-zoom");
      zoomControl.style.position = "absolute";
      zoomControl.style.top = "60px";
      zoomControl.style.right = "1px";
      zoomControl.style.zIndex = "10000";

      setMap(mapInstance);
    };

    initMap();

    // Cleanup
    return () => {
      if (map) map.remove();
    };
  }, []); // Initial map setup

  

  // Add a separate useEffect to handle theme changes
  useEffect(() => {
    if (map) {
      if (darkMode) {
        map.removeLayer(map.lightTiles);
        map.darkTiles.addTo(map);
      } else {
        map.removeLayer(map.darkTiles);
        map.lightTiles.addTo(map);
      }
    }
  }, [darkMode, map]); 

  const handleRoutePlan = async (e) => {
    e.preventDefault();
    
    if (!map || !L) return;

    // Remove existing route if any
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLocation};${endLocation}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = L.geoJSON(data.routes[0].geometry, {
          style: {
            color: '#0066CC',
            weight: 6,
            opacity: 0.7
          }
        }).addTo(map);

        setRouteLayer(route);
        map.fitBounds(route.getBounds(), { padding: [50, 50] });
        setShowRouteDialog(false);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error calculating route. Please check your coordinates and try again.');
    }
  };

  const handleSaveAddress = (index, address) => {
    const newAddresses = [...savedAddresses];
    newAddresses[index] = address;
    setSavedAddresses(newAddresses);
  };

  const handleUpdatePhone = (index, number) => {
    const newNumbers = [...phoneNumbers];
    newNumbers[index] = number;
    setPhoneNumbers(newNumbers);
  };

  // Popup Components
const SavedPopup = ({ darkMode }) => (
<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Saved Locations</h2>
    <button onClick={() => setShowSavedPopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  </div>
  <div className="space-y-3">
    {savedAddresses.map((address, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => handleSaveAddress(index, e.target.value)}
          placeholder={`Saved Location ${index + 1}`}
          className={`w-full p-2 border rounded ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
        />
      </div>
    ))}
  </div>
</div>

);
const RecentPopup = ({ darkMode }) => (
<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Recent Locations</h2>
    <button onClick={() => setShowRecentPopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  </div>
  <div className="space-y-2">
    {recentAddresses.map((address, index) => (
      <div key={index} className={`p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
        {address}
      </div>
    ))}
  </div>
</div>
);

const PhonePopup = ({ darkMode }) => (
<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Emergency Contacts</h2>
    <button onClick={() => setShowPhonePopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  </div>
  <div className="space-y-3">
    {phoneNumbers.map((number, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          value={number}
          onChange={(e) => handleUpdatePhone(index, e.target.value)}
          className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        />
      </div>
    ))}
  </div>
</div>
);

const PoliceStationsPopup = ({ darkMode }) => (
<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Nearby Police Stations</h2>
    <button onClick={() => setShowPolicePopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  </div>
  <div className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
    <p>Fetching nearby police stations...</p>
    <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>This feature would integrate with a real police station API</p>
  </div>
</div>
);

// Update the Route Planning Dialog with dark mode
{showRouteDialog && (
<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96`}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Plan Your Route</h2>
    <button onClick={() => setShowRouteDialog(false)} 
      className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  </div>
  
  <form onSubmit={handleRoutePlan} className="space-y-4">
    <div>
      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Starting Location (latitude, longitude)
      </label>
      <input
        type="text"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
        placeholder="e.g., -97.7431,30.2672"
        className={`w-full p-2 border rounded ${
          darkMode ? "bg-black-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"
        }`}
      />
    </div>

    <div>
      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Destination (latitude, longitude)
      </label>
      <input
        type="text"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
        placeholder="e.g., -95.3698,29.7604"
        className={`w-full p-2 border rounded ${
          darkMode ? "bg-black-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"
        }`}
      />
    </div>

    <div className="flex justify-end space-x-2 pt-4">
      <button
        type="button"
        onClick={() => setShowRouteDialog(false)}
        className={`px-4 py-2 border rounded ${
          darkMode 
            ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-black-600" 
            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
        }`}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get Directions
      </button>
    </div>
  </form>
</div>
)}

// Update the popup references in the return statement to pass the darkMode prop
{showSavedPopup && <SavedPopup darkMode={darkMode} />}
{showRecentPopup && <RecentPopup darkMode={darkMode} />}
{showPhonePopup && <PhonePopup darkMode={darkMode} />}
{showPolicePopup && <PoliceStationsPopup darkMode={darkMode} />}

  return (
    <div className="relative w-full h-screen">
      {/* Search Bar */}
<div
className={`absolute top-0 left-0 w-full p-2 flex items-center shadow-md z-50 transition-all duration-300 ${
  sidebarOpen ? "w-52" : "w-16"
} ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
>
{/* Sidebar Toggle Button */}
<button
  className={`p-2 text-xl self-end ${
    darkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
  }`}
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? "✖" : "☰"}
</button>

{/* Search Input */}
<input
  type="text"
  placeholder="Enter your destination"
  className={`ml-7 p-2 w-[600px] border rounded-lg cursor-pointer z-30 transition-all ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 opacity-80"
      : "bg-white text-black border-gray-300 opacity-75"
  }`}
  onClick={() => setShowRouteDialog(true)}
  readOnly
/>
</div>

      {/* Route Planning Dialog */}
      <div>
      {/* A button to open the form */}
      <button
        onClick={() => setShowRouteDialog(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Plan Your Route
      </button>

      {/* Conditionally render RouteForm when showRouteDialog is true */}
      {showRouteDialog && (
        <RouteForm setShowRouteDialog={setShowRouteDialog} />
      )}
    </div>

      {/* Dark Mode Toggle
      <div className="absolute top-2 right-5 z-40">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center px-1 rounded-full transition-all ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}
          ></div>
        </button>
      </div> */}

      <div className="absolute top-2 right-5 z-50">
   <button
     onClick={() => setDarkMode(!darkMode)}
     className={`w-14 h-7 flex items-center px-1 rounded-full transition-all ${
       darkMode ? "bg-gray-700" : "bg-gray-300"
     }`}
   >
     <div
       className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
         darkMode ? "translate-x-7" : "translate-x-0"
       }`}
     ></div>
   </button>
 </div>

   {/* Sidebar */}
<div className={`absolute top-0 left-0 h-full p-2 flex items-center shadow-md z-40 flex-col py-4 transition-all duration-300 
${sidebarOpen ? "w-52" : "w-18"} 
${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>

{/* Sidebar Toggle Button */}
<button className="p-2 text-xl self-start" onClick={() => setSidebarOpen(!sidebarOpen)}> 
  {sidebarOpen ? "✖" : "☰"}
</button>

{/* Navigation Menu */}
<nav className="flex flex-col w-full p-2">
    <Link
        to="/"
        className={`p-3 flex items-center w-full transition-colors duration-200 z-20 
        ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
      >
        🏠 {sidebarOpen && <span className="ml-2">Home</span>}
      </Link>
  <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`} 
    onClick={() => setShowSavedPopup(true)}>
    ⭐ {sidebarOpen && <span className="ml-2">Saved</span>}
  </button>
  <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`} 
    onClick={() => setShowRecentPopup(true)}>
    🕘 {sidebarOpen && <span className="ml-2">Recent</span>}
  </button>
  <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`} 
    onClick={() => setShowPhonePopup(true)}>
    📞 {sidebarOpen && <span className="ml-2">Phone</span>}
  </button>
  <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`} 
    onClick={() => setShowPolicePopup(true)}>
    🚔 {sidebarOpen && <span className="ml-2">Police Stations</span>}
  </button>
</nav>
</div>

      {/* Popups */}
      {showSavedPopup && <SavedPopup />}
      {showRecentPopup && <RecentPopup />}
      {showPhonePopup && <PhonePopup />}
      {showPolicePopup && <PoliceStationsPopup />}

      {/* Map Container */}
      <div id="map" className="w-full h-full z-10" />

      {/* Bottom Right Buttons */}
    {/* Bottom Right Buttons */}
<div className="absolute bottom-7 right-5 flex flex-col gap-4 z-20">
{/* HELP Button */}
  <button
    className={`relative w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent 
    ${!darkMode ? "border-b-red-600 text-white" : "border-b-[#FFFF00] text-black"} animate-pulse z-20`}
  >
    <span className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
      <b>!</b>
    </span>
  </button>


<div className="flex flex-col px-8 py-2 gap-2 z-20">
  {/* Map Button */}
  <button
    className={`p-2 shadow-md rounded-lg border-2 ${
      darkMode ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-800"
    }`}
  >
    🗺
  </button>
  
  {/* Satellite Button */}
  <button
    className={`p-2 shadow-md rounded-lg border-2 ${
      darkMode ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-800"
    }`}
  >
    🛰
  </button>
</div>
</div>

    </div>
  );
};

export default Map;