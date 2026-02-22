// import { useState, useEffect } from "react";
// // import HospitalCard from "../HospitalCard";
// // import HospitalCard from "./HospitalCard";

// const NearbyHospitals = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [radius, setRadius] = useState(5); // km
//   const [selectedHospital, setSelectedHospital] = useState(null);

//   useEffect(() => {
//     // Get user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           loadNearbyHospitals(position.coords);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Default to Lagos coordinates
//           setUserLocation({ lat: 6.5244, lng: 3.3792 });
//           loadNearbyHospitals({ latitude: 6.5244, longitude: 3.3792 });
//         },
//       );
//     } else {
//       // Default location
//       setUserLocation({ lat: 6.5244, lng: 3.3792 });
//       loadNearbyHospitals({ latitude: 6.5244, longitude: 3.3792 });
//     }
//   }, []);

//   const loadNearbyHospitals = (coords) => {
//     setLoading(true);

//     // Mock hospital data with coordinates
//     const mockHospitals = [
//       {
//         id: 1,
//         name: "Lagos University Teaching Hospital (LUTH)",
//         lga: "Ikeja",
//         address: "Idi-Araba, Mushin, Lagos",
//         distance: "2.3 km",
//         eta: "8 mins",
//         phone: "+234 802 345 6789",
//         emergency: "0800 123 4567",
//         coordinates: { lat: 6.5144, lng: 3.3692 },
//         hasAmbulance: true,
//         hasBloodBank: true,
//         hasICU: true,
//         hasPharmacy: true,
//         has24Hours: true,
//         specialties: ["Cardiology", "Neurology", "Pediatrics"],
//         resources: {
//           blood: { "A+": 12, "O+": 15, "B+": 8 },
//           icu: { available: 4, total: 15 },
//           oxygen: 45,
//         },
//         rating: 4.5,
//         reviews: 234,
//       },
//       {
//         id: 2,
//         name: "Gbagada General Hospital",
//         lga: "Kosofe",
//         address: "Gbagada Phase 2, Lagos",
//         distance: "3.1 km",
//         eta: "12 mins",
//         phone: "+234 803 456 7890",
//         emergency: "0800 234 5678",
//         coordinates: { lat: 6.5344, lng: 3.3892 },
//         hasAmbulance: true,
//         hasBloodBank: true,
//         hasICU: true,
//         hasPharmacy: true,
//         has24Hours: true,
//         specialties: ["General Practice", "Pediatrics", "Emergency"],
//         resources: {
//           blood: { "A+": 3, "O+": 2, "B+": 1 },
//           icu: { available: 2, total: 8 },
//           oxygen: 23,
//         },
//         rating: 4.2,
//         reviews: 156,
//       },
//       {
//         id: 3,
//         name: "Ikeja Medical Centre",
//         lga: "Ikeja",
//         address: "21 Medical Road, Ikeja, Lagos",
//         distance: "4.5 km",
//         eta: "15 mins",
//         phone: "+234 804 567 8901",
//         emergency: "0800 345 6789",
//         coordinates: { lat: 6.5544, lng: 3.3492 },
//         hasAmbulance: false,
//         hasBloodBank: true,
//         hasICU: false,
//         hasPharmacy: true,
//         has24Hours: false,
//         specialties: ["Internal Medicine", "Cardiology", "Orthopedics"],
//         resources: {
//           blood: { "A+": 8, "O+": 10, "B+": 4 },
//           icu: { available: 0, total: 0 },
//           oxygen: 12,
//         },
//         rating: 4.3,
//         reviews: 189,
//       },
//       {
//         id: 4,
//         name: "Isolo General Hospital",
//         lga: "Isolo",
//         address: "15 Oshodi-Isolo Road, Isolo, Lagos",
//         distance: "6.2 km",
//         eta: "20 mins",
//         phone: "+234 805 678 9012",
//         emergency: "0800 456 7890",
//         coordinates: { lat: 6.5744, lng: 3.3292 },
//         hasAmbulance: true,
//         hasBloodBank: false,
//         hasICU: false,
//         hasPharmacy: true,
//         has24Hours: true,
//         specialties: ["General Practice", "Pediatrics", "Obstetrics"],
//         resources: {
//           blood: { "A+": 0, "O+": 0, "B+": 0 },
//           icu: { available: 0, total: 5 },
//           oxygen: 8,
//         },
//         rating: 3.9,
//         reviews: 98,
//       },
//       {
//         id: 5,
//         name: "Surulere General Hospital",
//         lga: "Surulere",
//         address: "32 Bode Thomas Street, Surulere, Lagos",
//         distance: "5.8 km",
//         eta: "18 mins",
//         phone: "+234 806 789 0123",
//         emergency: "0800 567 8901",
//         coordinates: { lat: 6.5444, lng: 3.3592 },
//         hasAmbulance: true,
//         hasBloodBank: true,
//         hasICU: true,
//         hasPharmacy: true,
//         has24Hours: true,
//         specialties: ["Internal Medicine", "Surgery", "Pediatrics"],
//         resources: {
//           blood: { "A+": 6, "O+": 4, "B+": 2 },
//           icu: { available: 2, total: 7 },
//           oxygen: 34,
//         },
//         rating: 4.1,
//         reviews: 145,
//       },
//     ];

//     // Sort by distance
//     const sorted = mockHospitals.sort(
//       (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
//     );

//     setHospitals(sorted);
//     setLoading(false);
//   };

//   const filterHospitals = () => {
//     let filtered = [...hospitals];

//     // Filter by radius
//     filtered = filtered.filter((h) => parseFloat(h.distance) <= radius);

//     // Filter by amenities
//     switch (filter) {
//       case "ambulance":
//         filtered = filtered.filter((h) => h.hasAmbulance);
//         break;
//       case "blood":
//         filtered = filtered.filter((h) => h.hasBloodBank);
//         break;
//       case "icu":
//         filtered = filtered.filter((h) => h.hasICU);
//         break;
//       case "pharmacy":
//         filtered = filtered.filter((h) => h.hasPharmacy);
//         break;
//       case "24hours":
//         filtered = filtered.filter((h) => h.has24Hours);
//         break;
//       default:
//         break;
//     }

//     return filtered;
//   };

//   const filteredHospitals = filterHospitals();

//   const filterOptions = [
//     { id: "all", label: "All", icon: "🏥" },
//     { id: "ambulance", label: "Ambulance", icon: "🚑" },
//     { id: "blood", label: "Blood Bank", icon: "🩸" },
//     { id: "icu", label: "ICU", icon: "🏥" },
//     { id: "pharmacy", label: "Pharmacy", icon: "💊" },
//     { id: "24hours", label: "24/7", icon: "⏰" },
//   ];

//   const getDirections = (hospital) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
//     window.open(url, "_blank");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
//         <h1 className="text-3xl font-bold mb-2">📍 Nearby Hospitals</h1>
//         <p className="text-purple-100">
//           Find healthcare facilities near your location
//         </p>
//       </div>

//       {/* Location Info */}
//       <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
//         <div className="flex items-center space-x-2 text-gray-600">
//           <span className="text-2xl">📍</span>
//           <span>
//             Your location:{" "}
//             {userLocation
//               ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
//               : "Detecting..."}
//           </span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Radius Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Radius: {radius} km
//             </label>
//             <input
//               type="range"
//               min="1"
//               max="20"
//               value={radius}
//               onChange={(e) => setRadius(parseInt(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>1km</span>
//               <span>10km</span>
//               <span>20km</span>
//             </div>
//           </div>

//           {/* Facility Filters */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Facility
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {filterOptions.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => setFilter(option.id)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                     filter === option.id
//                       ? "bg-purple-600 text-white shadow-lg"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   <span className="mr-2">{option.icon}</span>
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-4 text-sm text-gray-600">
//         Found {filteredHospitals.length} hospitals within {radius}km
//       </div>

//       {/* Hospital List */}
//       <div className="space-y-4">
//         {filteredHospitals.map((hospital) => (
//           <div
//             key={hospital.id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-purple-200 transition-all cursor-pointer"
//             onClick={() => setSelectedHospital(hospital)}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {hospital.name}
//                   </h2>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {hospital.address}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center space-x-1 text-yellow-500">
//                     <span>⭐</span>
//                     <span className="font-medium text-gray-900">
//                       {hospital.rating}
//                     </span>
//                     <span className="text-gray-400 text-sm">
//                       ({hospital.reviews})
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Distance & ETA */}
//               <div className="flex items-center space-x-4 mb-4 text-sm">
//                 <span className="flex items-center text-gray-600">
//                   <span className="mr-1">📍</span> {hospital.distance}
//                 </span>
//                 <span className="flex items-center text-gray-600">
//                   <span className="mr-1">⏱️</span> {hospital.eta}
//                 </span>
//                 <span className="flex items-center text-gray-600">
//                   <span className="mr-1">📞</span> {hospital.phone}
//                 </span>
//               </div>

//               {/* Amenities */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {hospital.hasAmbulance && (
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
//                     🚑 Ambulance
//                   </span>
//                 )}
//                 {hospital.hasBloodBank && (
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
//                     🩸 Blood Bank
//                   </span>
//                 )}
//                 {hospital.hasICU && (
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
//                     🏥 ICU
//                   </span>
//                 )}
//                 {hospital.hasPharmacy && (
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
//                     💊 Pharmacy
//                   </span>
//                 )}
//                 {hospital.has24Hours && (
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
//                     ⏰ 24/7
//                   </span>
//                 )}
//               </div>

//               {/* Specialties */}
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600 mb-2">Specialties:</p>
//                 <div className="flex flex-wrap gap-1">
//                   {hospital.specialties.map((spec) => (
//                     <span
//                       key={spec}
//                       className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
//                     >
//                       {spec}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Resource Status */}
//               <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-xs text-gray-500">Blood Units</p>
//                   <p className="font-semibold text-purple-600">
//                     {Object.values(hospital.resources.blood).reduce(
//                       (a, b) => a + b,
//                       0,
//                     )}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">ICU Beds</p>
//                   <p className="font-semibold text-purple-600">
//                     {hospital.resources.icu.available}/
//                     {hospital.resources.icu.total}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Oxygen</p>
//                   <p className="font-semibold text-cyan-600">
//                     {hospital.resources.oxygen} units
//                   </p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex space-x-3">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     getDirections(hospital);
//                   }}
//                   className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                 >
//                   🗺️ Get Directions
//                 </button>
//                 <a
//                   href={`tel:${hospital.emergency}`}
//                   onClick={(e) => e.stopPropagation()}
//                   className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
//                 >
//                   🚑 Emergency
//                 </a>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedHospital(hospital);
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Hospital Details Modal */}
//       {selectedHospital && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {selectedHospital.name}
//                 </h2>
//                 <button
//                   onClick={() => setSelectedHospital(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <p className="text-gray-600">{selectedHospital.address}</p>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <a
//                       href={`tel:${selectedHospital.phone}`}
//                       className="font-medium text-purple-600"
//                     >
//                       {selectedHospital.phone}
//                     </a>
//                   </div>
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">Emergency</p>
//                     <a
//                       href={`tel:${selectedHospital.emergency}`}
//                       className="font-medium text-purple-600"
//                     >
//                       {selectedHospital.emergency}
//                     </a>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-medium mb-2">Available Resources</h3>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Blood Bank:</span>
//                       <span className="font-medium">
//                         {Object.keys(selectedHospital.resources.blood).length}{" "}
//                         types
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>ICU Beds:</span>
//                       <span className="font-medium">
//                         {selectedHospital.resources.icu.available}/
//                         {selectedHospital.resources.icu.total}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Oxygen Masks:</span>
//                       <span className="font-medium">
//                         {selectedHospital.resources.oxygen}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => getDirections(selectedHospital)}
//                     className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     🗺️ Get Directions
//                   </button>
//                   <a
//                     href={`tel:${selectedHospital.emergency}`}
//                     className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center"
//                   >
//                     🚑 Call Emergency
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NearbyHospitals;
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
      specialty: "Diabetes Clinic",
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
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs animate-pulse">
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
                ? "border-purple-300 bg-purple-50"
                : "border-gray-100 hover:border-purple-200"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.address}</p>
              </div>
              <span className="text-sm font-medium text-purple-600">
                {hospital.distance}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span>🕐 Wait: {hospital.waitTime}</span>
              <span>⭐ {hospital.rating}</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                {hospital.specialty}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => getDirections(hospital)}
                className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
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

      <button className="w-full mt-4 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
        🚑 Emergency - Call Ambulance
      </button>
    </div>
  );
};

export default NearbyHospital;
