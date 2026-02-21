import { useState, useEffect } from "react";
import { getNearestHospitals, requestAmbulance } from "../../JS/utils";

const EmergencyResponse = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [emergencyType, setEmergencyType] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          loadNearbyHospitals(position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default location
          setUserLocation({ lat: 6.5244, lng: 3.3792 }); // Lagos
        },
      );
    }
  }, []);

  const loadNearbyHospitals = (coords) => {
    // Mock data - in production, call your API
    const mockHospitals = [
      {
        id: 1,
        name: "Lagos University Teaching Hospital",
        distance: "2.3 km",
        eta: "8 mins",
        hasAmbulance: true,
        ambulanceETA: "5 mins",
        emergency: "+234 802 345 6789",
        coordinates: { lat: 6.5144, lng: 3.3692 },
      },
      {
        id: 2,
        name: "Gbagada General Hospital",
        distance: "3.1 km",
        eta: "12 mins",
        hasAmbulance: true,
        ambulanceETA: "7 mins",
        emergency: "+234 803 456 7890",
        coordinates: { lat: 6.5344, lng: 3.3892 },
      },
      {
        id: 3,
        name: "Ikeja Medical Centre",
        distance: "4.5 km",
        eta: "15 mins",
        hasAmbulance: false,
        ambulanceETA: "10 mins (from partner)",
        emergency: "+234 804 567 8901",
        coordinates: { lat: 6.5544, lng: 3.3492 },
      },
    ];
    setNearestHospitals(mockHospitals);
  };

  const handleEmergencyRequest = () => {
    if (!emergencyType) {
      alert("Please select emergency type");
      return;
    }

    setEmergencyActive(true);
    setCountdown(30); // 30 seconds countdown

    // Simulate ambulance dispatch
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Find nearest hospital with ambulance
    const hospitalWithAmbulance = nearestHospitals.find((h) => h.hasAmbulance);

    // Show alert
    const alert = document.createElement("div");
    alert.className =
      "fixed top-4 right-4 bg-red-600 text-white p-6 rounded-xl shadow-2xl z-50 max-w-md animate-slide-in";
    alert.innerHTML = `
      <div class="flex items-start space-x-3">
        <span class="text-4xl">🚑</span>
        <div class="flex-1">
          <h3 class="font-bold text-lg">Ambulance Dispatched!</h3>
          <p class="text-sm mt-1">Emergency type: ${emergencyType}</p>
          <p class="text-sm">Hospital: ${hospitalWithAmbulance?.name}</p>
          <p class="text-sm">ETA: ${hospitalWithAmbulance?.ambulanceETA}</p>
          <div class="mt-3 bg-red-700 rounded-lg p-3">
            <p class="text-xs">Track ambulance:</p>
            <div class="w-full bg-red-800 rounded-full h-2 mt-2">
              <div class="bg-white h-2 rounded-full" style="width: 25%"></div>
            </div>
          </div>
          <button class="mt-3 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium w-full">
            Call Emergency Services
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(alert);

    // Play emergency sound
    const audio = new Audio("/sounds/emergency.mp3");
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const emergencyTypes = [
    {
      id: "cardiac",
      label: "Cardiac Arrest",
      icon: "❤️",
      priority: "critical",
    },
    { id: "stroke", label: "Stroke", icon: "🧠", priority: "critical" },
    { id: "accident", label: "Accident/Trauma", icon: "🚗", priority: "high" },
    {
      id: "breathing",
      label: "Breathing Difficulty",
      icon: "🫁",
      priority: "high",
    },
    {
      id: "bleeding",
      label: "Severe Bleeding",
      icon: "🩸",
      priority: "critical",
    },
    {
      id: "pregnancy",
      label: "Pregnancy Emergency",
      icon: "🤰",
      priority: "high",
    },
    {
      id: "diabetic",
      label: "Diabetic Emergency",
      icon: "🩸",
      priority: "high",
    },
    {
      id: "allergic",
      label: "Severe Allergic Reaction",
      icon: "🤧",
      priority: "high",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white mb-8 animate-pulse">
        <h1 className="text-4xl font-bold mb-2">🚨 Emergency Response</h1>
        <p className="text-red-100 text-lg">
          Click the button below for immediate assistance
        </p>
      </div>

      {/* Emergency Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Emergency Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setEmergencyType(type.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                emergencyType === type.id
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
              <span className="text-3xl block mb-2">{type.icon}</span>
              <span className="text-sm font-medium">{type.label}</span>
              <span
                className={`text-xs block mt-1 ${
                  type.priority === "critical"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {type.priority === "critical"
                  ? "🚨 Critical"
                  : "⚠️ High Priority"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleEmergencyRequest}
          disabled={emergencyActive}
          className={`relative px-16 py-8 bg-red-600 text-white rounded-2xl text-3xl font-bold shadow-2xl transition-all ${
            emergencyActive
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-700 hover:scale-105 animate-pulse"
          }`}
        >
          {emergencyActive ? (
            <div className="flex items-center space-x-4">
              <span>🚑 Ambulance En Route</span>
              <span className="text-4xl">{countdown}s</span>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span>🚨</span>
              <span>REQUEST AMBULANCE NOW</span>
              <span>🚨</span>
            </div>
          )}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          By clicking, you agree to share your location with emergency services
        </p>
      </div>

      {/* Nearest Hospitals */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🏥 Nearest Hospitals</h2>
        <div className="space-y-4">
          {nearestHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="border-2 border-gray-100 rounded-xl p-4 hover:border-red-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>📍 {hospital.distance}</span>
                    <span>⏱️ ETA: {hospital.eta}</span>
                  </div>
                </div>
                <div className="text-right">
                  {hospital.hasAmbulance ? (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      🚑 Ambulance Available
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Ambulance ETA: {hospital.ambulanceETA}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex space-x-3">
                <a
                  href={`tel:${hospital.emergency}`}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg text-center hover:bg-red-700 transition-colors"
                >
                  🚑 Call Emergency
                </a>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  📍 Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Instructions */}
      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-3">
          📋 While Waiting for Ambulance:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-yellow-700">
          <li>Stay calm and keep the patient comfortable</li>
          <li>Unlock doors for emergency responders</li>
          <li>Gather patient's medications and medical history</li>
          <li>Move pets and obstacles out of the way</li>
          <li>Assign someone to wait outside and guide responders</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyResponse;
