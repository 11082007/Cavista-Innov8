// src/components/EmergencyFilters.jsx
import React from "react";

const EmergencyFilters = ({ filters, setFilters, lgas = [] }) => {
  // Default empty array to prevent undefined error
  const filterOptions = [
    { id: "all", label: "All Resources", icon: "🏥", color: "blue" },
    { id: "blood", label: "Blood Bank", icon: "🩸", color: "red" },
    { id: "icu", label: "ICU Beds", icon: "🏥", color: "emerald" },
    { id: "antivenom", label: "Anti-venom", icon: "🐍", color: "purple" },
  ];

  // Ensure lgas is always an array
  const safeLgas = Array.isArray(lgas) ? lgas : [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="space-y-4">
        {/* Resource Filter Chips */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Resource
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilters({ ...filters, resource: option.id })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters?.resource === option.id
                    ? option.color === "blue"
                      ? "bg-blue-600 text-white shadow-md"
                      : option.color === "red"
                        ? "bg-red-500 text-white shadow-md"
                        : option.color === "emerald"
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-purple-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* LGA Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local Government Area
          </label>
          <select
            value={filters?.lga || "all"}
            onChange={(e) => setFilters({ ...filters, lga: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            <option value="all">All LGAs</option>
            {safeLgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
          {safeLgas.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">No LGAs available</p>
          )}
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by hospital name or address..."
              value={filters?.search || ""}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFilters;
