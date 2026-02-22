import React, { useState, useEffect } from 'react';

// Initial Seed Data for the Hackathon
const SEED_HOSPITALS = [
  {
    id: 1,
    name: "Lagos University Teaching Hospital (LUTH)",
    lga: "Mushin",
    distance: "2.4 km",
    phone: "+234 800 LUTH EMER",
    ambulance: "Available (2 Dispatching)",
    type: "Tertiary",
    insurance: ["NHIS Accepted", "Red Cross Supported"],
    resources: [
      { name: "ICU Beds", available: true, count: 5 },
      { name: "O- Blood", available: true, count: 12 },
      { name: "Anti-Venom", available: false, count: 0 },
      { name: "Oxygen Tanks", available: true, count: 45 },
    ]
  },
  {
    id: 2,
    name: "General Hospital Gbagada",
    lga: "Kosofe",
    distance: "5.1 km",
    phone: "+234 800 GBAG EMER",
    ambulance: "Unavailable",
    type: "Secondary",
    insurance: ["LSHS Accredited"],
    resources: [
      { name: "ICU Beds", available: false, count: 0 },
      { name: "O- Blood", available: true, count: 4 },
      { name: "Anti-Venom", available: true, count: 3 },
      { name: "Oxygen Tanks", available: true, count: 10 },
    ]
  },
  {
    id: 3,
    name: "Reddington Multi-Specialist",
    lga: "Victoria Island",
    distance: "8.7 km",
    phone: "+234 800 REDD EMER",
    ambulance: "Available (4 Dispatching)",
    type: "Private",
    insurance: ["Private HMO", "Pay-Later Emergency Fund"],
    resources: [
      { name: "ICU Beds", available: true, count: 2 },
      { name: "O- Blood", available: true, count: 8 },
      { name: "Anti-Venom", available: true, count: 5 },
      { name: "Oxygen Tanks", available: true, count: 20 },
    ]
  }
];

const Marketplace = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Load from Local Storage (Dynamic Admin Source) or Seed if empty
    const saved = localStorage.getItem('vytal-hospitals');
    if (saved) {
      setHospitals(JSON.parse(saved));
    } else {
      localStorage.setItem('vytal-hospitals', JSON.stringify(SEED_HOSPITALS));
      setHospitals(SEED_HOSPITALS);
    }

    // Listener for cross-tab updates (e.g. Admin changes a resource)
    const handleStorageChange = (e) => {
      if (e.key === 'vytal-hospitals' && e.newValue) {
        setHospitals(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hospital.lga.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "blood") return matchesSearch && hospital.resources.find(r => r.name === "O- Blood" && r.available);
    if (filter === "icu") return matchesSearch && hospital.resources.find(r => r.name === "ICU Beds" && r.available);
    if (filter === "venom") return matchesSearch && hospital.resources.find(r => r.name === "Anti-Venom" && r.available);
    if (filter === "ambulance") return matchesSearch && hospital.ambulance.includes("Available");
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-red-900 pt-16 pb-24 px-4 text-center">
         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Hospital Resource Hub</h1>
         <p className="text-red-100 text-lg max-w-2xl mx-auto">
           Real-time visibility into emergency resources. Don't waste critical time driving to a hospital without the supplies you need.
         </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12">
         {/* Search & Filters */}
         <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               </div>
               <input 
                 type="text" 
                 placeholder="Search by hospital name or LGA..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
               />
            </div>
            <select 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="md:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium text-gray-700"
            >
               <option value="all">All Live Resources</option>
               <option value="blood">O- Blood Available</option>
               <option value="icu">ICU Beds Available</option>
               <option value="venom">Anti-Venom In Stock</option>
               <option value="ambulance">Available Ambulances</option>
            </select>
         </div>

         {/* Marketplace Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map(hospital => (
               <div key={hospital.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <h3 className="font-extrabold text-gray-900 text-lg leading-tight mb-1">{hospital.name}</h3>
                        <p className="text-gray-500 font-medium text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          {hospital.lga} ({hospital.distance})
                        </p>
                     </div>
                     <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600`}>
                        {hospital.type}
                     </span>
                  </div>

                  {/* Insurance/Aid Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                     {hospital.insurance.map((ins, idx) => (
                       <span key={idx} className="bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                          {ins}
                       </span>
                     ))}
                  </div>

                  {/* Resource Chips */}
                  <div className="space-y-3 flex-1 mb-6">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Inventory</p>
                     <div className="grid grid-cols-2 gap-2">
                        {hospital.resources.map((res, idx) => (
                           <div key={idx} className={`flex items-center justify-between p-2 rounded-lg border ${res.available ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                             <span className={`text-xs font-bold ${res.available ? 'text-green-800' : 'text-red-800'}`}>{res.name}</span>
                             <span className={`text-xs font-black ${res.available ? 'text-green-600' : 'text-red-600'}`}>{res.available ? res.count : '0'}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 mt-auto space-y-3">
                     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <span className="text-xs font-bold text-gray-500">Ambulance Status</span>
                        <span className={`text-xs font-bold ${hospital.ambulance.includes('Available') ? 'text-red-600' : 'text-red-500'}`}>
                          {hospital.ambulance}
                        </span>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold text-sm transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Call
                        </button>
                        <button className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors ${hospital.ambulance.includes('Available') ? 'bg-red-500 hover:bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 10v6"/><path d="M7 13h6"/></svg>
                          Dispatch
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Marketplace;
