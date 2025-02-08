import React, { useEffect, useState } from "react";
import axios from "axios";

const PoliceStationsPopup = ({ darkMode, setShowPolicePopup }) => {
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GOOGLE_API_KEY = "AIzaSyC_UyL76JWgPVAba9PRaEPvwxhLFDQUKDM"; // Replace with your actual Google API key



  // Fetch police stations based on the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
              {
                params: {
                  location: `${latitude},${longitude}`,
                  radius: 5000, // Set to 5km radius
                  type: "police", // Search for police stations
                  key: GOOGLE_API_KEY,
                },
              }
            );

            if (response.data.results.length > 0) {
              // Sort the police stations by their distance to the current location
              const sortedStations = response.data.results.map((station) => {
                const distance = getDistance(
                  latitude,
                  longitude,
                  station.geometry.location.lat,
                  station.geometry.location.lng
                );
                return { ...station, distance };
              }).sort((a, b) => a.distance - b.distance);

              setPoliceStations([sortedStations[0]]); // Only keep the nearest one
            } else {
              setError("No nearby police stations found.");
            }
          } catch (err) {
            setError("Error fetching nearby police stations.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Failed to retrieve location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // Function to calculate the distance between two geographical coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
      p-6 rounded-lg shadow-lg z-50 w-96 border`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Nearest Police Station</h2>
        <button
          onClick={() => setShowPolicePopup(false)} // Close the popup
          className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
        >
          ✖
        </button>
      </div>

      <div className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {loading ? (
          <p>Loading nearby police stations...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            {policeStations.length > 0 && (
              <div className="mb-2">
                <h3 className="text-sm font-semibold">{policeStations[0].name}</h3>
                <p className="text-sm">{policeStations[0].vicinity}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceStationsPopup;
