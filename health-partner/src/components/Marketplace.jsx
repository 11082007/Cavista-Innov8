// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import HospitalCard from "./HospitalCard";
// import HospitalMap from "./HospitalMap";
// import HospitalTable from "./HospitalTable";
// import EmergencyFilters from "./EmergencyFilters";
// import { dummyHospitals } from "../JS/dummydata";

// const Marketplace = ({ userConditions = [] }) => {
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("grid"); // 'grid', 'table', 'map'
//   const [filters, setFilters] = useState({
//     resource: "all",
//     lga: "all",
//     condition: "all",
//     search: "",
//   });

//   useEffect(() => {
//     loadHospitals();
//   }, []);

//   const loadHospitals = async () => {
//     setLoading(true);
//     try {
//       // Filter hospitals based on user's conditions
//       let filtered = dummyHospitals;

//       // If user has specific conditions, prioritize hospitals that specialize in them
//       if (userConditions.length > 0) {
//         filtered = dummyHospitals
//           .map((hospital) => ({
//             ...hospital,
//             relevanceScore: calculateRelevance(hospital, userConditions),
//           }))
//           .sort((a, b) => b.relevanceScore - a.relevanceScore);
//       }

//       setHospitals(filtered);
//     } catch (error) {
//       console.error("Failed to load hospitals:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateRelevance = (hospital, conditions) => {
//     let score = 0;
//     conditions.forEach((condition) => {
//       if (
//         hospital.specialties?.some((s) =>
//           s.toLowerCase().includes(condition.toLowerCase()),
//         )
//       ) {
//         score += 10;
//       }
//       if (hospital.rareMedications?.some((m) => m.condition === condition)) {
//         score += 5;
//       }
//     });
//     return score;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header with margin fix */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Healthcare Directory
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Find hospitals and resources near you
//         </p>
//       </div>

//       {/* Filters */}
//       <EmergencyFilters filters={filters} setFilters={setFilters} />

//       {/* View Toggle */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-sm text-gray-600">
//           Found{" "}
//           <span className="font-semibold text-teal-600">
//             {hospitals.length}
//           </span>{" "}
//           hospitals
//         </div>
//         <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               viewMode === "grid"
//                 ? "bg-teal-600 text-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Grid
//           </button>
//           <button
//             onClick={() => setViewMode("table")}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               viewMode === "table"
//                 ? "bg-teal-600 text-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Table
//           </button>
//           <button
//             onClick={() => setViewMode("map")}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               viewMode === "map"
//                 ? "bg-teal-600 text-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Map
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       {viewMode === "map" ? (
//         <HospitalMap hospitals={hospitals} />
//       ) : viewMode === "table" ? (
//         <HospitalTable hospitals={hospitals} />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hospitals.map((hospital) => (
//             <HospitalCard key={hospital.id} hospital={hospital} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketplace;

// src/components/Marketplace.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalCard from "./HospitalCard";
import HospitalMap from "./HospitalMap";
import HospitalTable from "./HospitalTable";
import EmergencyFilters from "./EmergencyFilters";
import { dummyHospitals } from "../JS/dummydata";

const Marketplace = ({
  userConditions = [],
  isOnline = true,
  syncService = null,
}) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'table', 'map'
  const [filters, setFilters] = useState({
    resource: "all",
    lga: "all",
    search: "",
  });
  const [lgas, setLgas] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    withBlood: 0,
    withICU: 0,
    withAntiVenom: 0,
  });

  useEffect(() => {
    loadHospitals();
  }, []);

  // Update stats whenever hospitals change
  useEffect(() => {
    calculateStats();
    extractLGAs();
  }, [hospitals]);

  const loadHospitals = async () => {
    setLoading(true);
    try {
      // In production, this would fetch from your API or IndexedDB
      // For now, use dummy data
      let loadedHospitals = [...dummyHospitals];

      // If user has specific conditions, add relevance scores
      if (userConditions && userConditions.length > 0) {
        loadedHospitals = loadedHospitals
          .map((hospital) => ({
            ...hospital,
            relevanceScore: calculateRelevance(hospital, userConditions),
          }))
          .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      }

      setHospitals(loadedHospitals);
    } catch (error) {
      console.error("Failed to load hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRelevance = (hospital, conditions) => {
    let score = 0;
    conditions.forEach((condition) => {
      // Check if hospital specializes in this condition
      if (
        hospital.specialties?.some((s) =>
          s.toLowerCase().includes(condition.toLowerCase()),
        )
      ) {
        score += 10;
      }
      // Check if hospital has medications for this condition
      if (
        hospital.rareMedications?.some((m) =>
          m.condition?.toLowerCase().includes(condition.toLowerCase()),
        )
      ) {
        score += 5;
      }
      // Check resources relevance
      if (condition === "sickle-cell" && hospital.resources?.blood) {
        score += 3;
      }
      if (condition === "diabetes" && hospital.resources?.insulin) {
        score += 3;
      }
      if (condition === "hypertension" && hospital.resources?.bpMonitors) {
        score += 3;
      }
    });
    return score;
  };

  const calculateStats = () => {
    const stats = {
      total: hospitals.length,
      withBlood: hospitals.filter(
        (h) =>
          h.resources?.blood &&
          Object.values(h.resources.blood).some((b) => b > 0),
      ).length,
      withICU: hospitals.filter((h) => h.resources?.icu?.available > 0).length,
      withAntiVenom: hospitals.filter((h) => h.resources?.antiVenom?.available)
        .length,
    };
    setStats(stats);
  };

  const extractLGAs = () => {
    const uniqueLgas = [
      ...new Set(hospitals.map((h) => h.lga).filter(Boolean)),
    ];
    setLgas(uniqueLgas);
  };

  const filterHospitals = () => {
    return hospitals.filter((hospital) => {
      // LGA filter
      if (filters.lga !== "all" && hospital.lga !== filters.lga) {
        return false;
      }

      // Resource filter
      if (filters.resource !== "all") {
        const hasResource = checkResourceAvailability(
          hospital,
          filters.resource,
        );
        if (!hasResource) return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = hospital.name?.toLowerCase().includes(searchLower);
        const addressMatch = hospital.address
          ?.toLowerCase()
          .includes(searchLower);
        const lgaMatch = hospital.lga?.toLowerCase().includes(searchLower);
        const specialtyMatch = hospital.specialties?.some((s) =>
          s.toLowerCase().includes(searchLower),
        );

        if (!nameMatch && !addressMatch && !lgaMatch && !specialtyMatch) {
          return false;
        }
      }

      return true;
    });
  };

  const checkResourceAvailability = (hospital, resourceType) => {
    switch (resourceType) {
      case "blood":
        return (
          hospital.resources?.blood &&
          Object.values(hospital.resources.blood).some((q) => q > 0)
        );
      case "icu":
        return hospital.resources?.icu?.available > 0;
      case "antivenom":
        return hospital.resources?.antiVenom?.available === true;
      case "oxygen":
        return hospital.resources?.oxygen?.available > 0;
      case "ambulance":
        return hospital.hasAmbulance === true;
      case "pharmacy":
        return hospital.hasPharmacy === true;
      default:
        return true;
    }
  };

  const calculateEmergencyPriority = (hospital) => {
    let score = 0;

    // Blood availability (high priority)
    if (hospital.resources?.blood) {
      const totalBlood = Object.values(hospital.resources.blood).reduce(
        (a, b) => a + b,
        0,
      );
      score += totalBlood * 2;
    }

    // ICU beds (critical)
    if (hospital.resources?.icu?.available) {
      score += hospital.resources.icu.available * 3;
    }

    // Anti-venom (emergency)
    if (hospital.resources?.antiVenom?.available) {
      score += 5;
    }

    // Oxygen availability
    if (hospital.resources?.oxygen?.available) {
      score += hospital.resources.oxygen.available;
    }

    // Ambulance service
    if (hospital.hasAmbulance) {
      score += 4;
    }

    // 24/7 availability
    if (hospital.has24Hours) {
      score += 2;
    }

    return score;
  };

  const filteredHospitals = filterHospitals();

  // Sort by emergency priority
  const sortedHospitals = [...filteredHospitals].sort(
    (a, b) => calculateEmergencyPriority(b) - calculateEmergencyPriority(a),
  );

  const handleRefresh = () => {
    loadHospitals();
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading healthcare facilities...</p>
        <p className="text-sm text-gray-400 mt-2">This may take a moment</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with offline indicator */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Healthcare Directory
          </h1>
          <p className="text-gray-600 mt-1">
            Find hospitals and resources near you
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {!isOnline && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Offline Mode</span>
            </div>
          )}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Hospitals</p>
          <p className="text-2xl font-bold text-teal-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">With Blood Bank</p>
          <p className="text-2xl font-bold text-red-600">{stats.withBlood}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">ICU Available</p>
          <p className="text-2xl font-bold text-blue-600">{stats.withICU}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Anti-venom Ready</p>
          <p className="text-2xl font-bold text-purple-600">
            {stats.withAntiVenom}
          </p>
        </div>
      </div>

      {/* Filters Component */}
      <EmergencyFilters filters={filters} setFilters={setFilters} lgas={lgas} />

      {/* View Toggle and Results Count */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Found{" "}
          <span className="font-semibold text-teal-600">
            {filteredHospitals.length}
          </span>{" "}
          facilities
          {filters.lga !== "all" && ` in ${filters.lga}`}
          {filters.resource !== "all" && ` with ${filters.resource} available`}
        </div>

        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "grid"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Grid view"
          >
            📱 Grid
          </button>
          <button
            onClick={() => handleViewModeChange("table")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "table"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Table view"
          >
            📊 Table
          </button>
          <button
            onClick={() => handleViewModeChange("map")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "map"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Map view"
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on view mode */}
      {viewMode === "map" ? (
        <HospitalMap
          hospitals={sortedHospitals}
          onHospitalSelect={setSelectedHospital}
          userLocation={{ lat: 6.5244, lng: 3.3792 }} // Default to Lagos
        />
      ) : viewMode === "table" ? (
        <HospitalTable
          hospitals={sortedHospitals}
          onSelect={setSelectedHospital}
        />
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              isOnline={isOnline}
              onUpdate={loadHospitals}
              onClick={() => setSelectedHospital(hospital)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredHospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hospitals found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button
            onClick={() =>
              setFilters({ resource: "all", lga: "all", search: "" })
            }
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedHospital(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedHospital.name}
                </h2>
                <button
                  onClick={() => setSelectedHospital(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <HospitalCard
                hospital={selectedHospital}
                isOnline={isOnline}
                expanded={true}
                onClose={() => setSelectedHospital(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Emergency */}
      <Link
        to="/health-seeker/emergency"
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors animate-pulse z-40"
        title="Emergency"
      >
        🚑
      </Link>
    </div>
  );
};

export default Marketplace;
