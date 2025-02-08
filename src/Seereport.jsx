import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Seereport = () => {
  const [reports, setReports] = useState([
    { id: 1, title: "Stolen Purse", description: "A purse was stolen near Main Street.", date: "2025-02-09" },
    { id: 2, title: "Suspicious Activity", description: "A suspicious person was lurking around the park.", date: "2025-02-08" },
  ]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
      {/* WaySecure Logo */}
      <div className="w-full max-w-4xl flex justify-start p-4">
        <Link to="/" className="text-3xl absolute left-6 top-3 font-extrabold">
          WaySecure
        </Link>
      </div>

      {/* Reports Section */}
      <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Previous Reports</h2>

        {reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((report) => (
              <li key={report.id} className="p-4 border rounded-lg shadow-sm bg-gray-100">
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <p className="text-gray-600">{report.description}</p>
                <p className="text-sm text-gray-500">{report.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Seereport;
