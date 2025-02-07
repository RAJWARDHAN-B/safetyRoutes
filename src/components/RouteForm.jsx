import React, { useState } from 'react';
import axios from 'axios';

const RouteForm = ({ setShowRouteDialog }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  // Function to fetch coordinates for a place name
  const fetchCoordinates = async (place) => {
    const apiKey = 'AIzaSyC_UyL76JWgPVAba9PRaEPvwxhLFDQUKDM'; // Replace with your Google API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { lat, lng };
      } else {
        alert('Location not found');
        return null;
      }
    } catch (error) {
      alert('Error fetching location');
      return null;
    }
  };

  // Function to handle form submission
  const handleRoutePlan = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Fetch coordinates for start and end locations
    const startCoords = await fetchCoordinates(startLocation);
    const endCoords = await fetchCoordinates(endLocation);

    if (startCoords && endCoords) {
      setStartCoords(startCoords);
      setEndCoords(endCoords);

      // Display an alert with coordinates
      alert(`Starting Location: ${startCoords.lat}, ${startCoords.lng}\nDestination: ${endCoords.lat}, ${endCoords.lng}`);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Plan Your Route</h2>
        <button onClick={() => setShowRouteDialog(false)} className="text-gray-500 hover:text-gray-700">✖</button>
      </div>
      
      <form onSubmit={handleRoutePlan} className="space-y-4">
        {/* Starting Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Starting Location (e.g., New York)
          </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="e.g., New York"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ending Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination (e.g., Los Angeles)
          </label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="e.g., Los Angeles"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => setShowRouteDialog(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
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
  );
};

export default RouteForm;
