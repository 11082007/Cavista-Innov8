// src/components/NearbyHospital.jsx
import React, { useState } from "react";

const NearbyHospital = ({ condition, riskLevel }) => {
  const [hospitals] = useState([
    {
      id: 1,
      name: "Lagos University Teaching Hospital (LUTH)",
      distance: "3.2 km",
      address: "Idi-Araba, Mushin",
      phone: "0800-LUTH",
      waitTime: "15 mins",
      specialty: condition === "diabetes" ? "Diabetes Clinic" : "Emergency",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Gbagada General Hospital",
      distance: "4.1 km",
      address: "Gbagada Phase 2",
      phone: "0800-GGH",
      waitTime: "10 mins",
      specialty: "General",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Ikeja Medical Centre",
      distance: "5.3 km",
      address: "Ikeja",
      phone: "0800-IMC",
      waitTime: "20 mins",
      specialty: "Cardiology",
      rating: 4.3,
    },
  ]);

  const getDirections = (hospital) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${hospital.name}`,
      "_blank",
    );
  };

  const makeCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🏥 Nearby Hospitals</h2>
        {riskLevel === "HIGH" && (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs animate-pulse">
            Urgent Care Recommended
          </span>
        )}
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              hospital.specialty.includes("Diabetes")
                ? "border-blue-300 bg-blue-50"
                : "border-gray-100 hover:border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.address}</p>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {hospital.distance}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span>🕐 Wait: {hospital.waitTime}</span>
              <span>⭐ {hospital.rating}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                {hospital.specialty}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => getDirections(hospital)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                🗺️ Directions
              </button>
              <button
                onClick={() => makeCall(hospital.phone)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                📞 Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency button */}
      <button className="w-full mt-4 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
        🚑 Emergency - Call Ambulance
      </button>
    </div>
  );
};

export default NearbyHospital;
