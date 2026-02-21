import { useState } from "react";

const FindMedication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Hydroxyurea",
      genericName: "Hydroxycarbamide",
      category: "sickle-cell",
      condition: "Sickle Cell Disease",
      dosage: "500mg capsules",
      manufacturer: "Various",
      hospitals: [
        { name: "LUTH", quantity: 45, price: "₦2,500", distance: "2.3km" },
        {
          name: "Gbagada General",
          quantity: 23,
          price: "₦2,800",
          distance: "3.1km",
        },
        {
          name: "Ikeja Medical",
          quantity: 12,
          price: "₦2,600",
          distance: "4.5km",
        },
      ],
      alternatives: ["Hydroxyurea 1000mg", "Siklos"],
      insurance: ["NHIS", "Hygeia"],
    },
    {
      id: 2,
      name: "Insulin (Rapid-acting)",
      genericName: "Insulin Aspart",
      category: "diabetes",
      condition: "Diabetes Type 1 & 2",
      dosage: "100IU/mL vial",
      manufacturer: "Novo Nordisk",
      hospitals: [
        { name: "LUTH", quantity: 60, price: "₦4,500", distance: "2.3km" },
        {
          name: "St. Nicholas",
          quantity: 45,
          price: "₦4,800",
          distance: "5.2km",
        },
        {
          name: "Reddington",
          quantity: 30,
          price: "₦5,200",
          distance: "6.1km",
        },
      ],
      alternatives: ["Insulin Lispro", "Insulin Glulisine"],
      insurance: ["NHIS", "AXA Mansard", "Leadway"],
    },
    {
      id: 3,
      name: "Lisinopril",
      genericName: "Lisinopril",
      category: "hypertension",
      condition: "Hypertension",
      dosage: "10mg tablets",
      manufacturer: "Various",
      hospitals: [
        { name: "LUTH", quantity: 120, price: "₦1,500", distance: "2.3km" },
        {
          name: "Gbagada General",
          quantity: 89,
          price: "₦1,300",
          distance: "3.1km",
        },
        {
          name: "Isolo General",
          quantity: 56,
          price: "₦1,400",
          distance: "7.2km",
        },
      ],
      alternatives: ["Enalapril", "Ramipril"],
      insurance: ["NHIS", "Hygeia"],
    },
    {
      id: 4,
      name: "Snake Anti-venom",
      genericName: "Polyvalent Anti-venom",
      category: "emergency",
      condition: "Snake Bite",
      dosage: "10mL vial",
      manufacturer: "Institute Pasteur",
      hospitals: [
        { name: "LUTH", quantity: 8, price: "₦15,000", distance: "2.3km" },
        {
          name: "Gbagada General",
          quantity: 5,
          price: "₦15,000",
          distance: "3.1km",
        },
      ],
      alternatives: ["Monovalent Anti-venom"],
      insurance: ["NHIS"],
    },
    {
      id: 5,
      name: "Tamoxifen",
      genericName: "Tamoxifen Citrate",
      category: "cancer",
      condition: "Breast Cancer",
      dosage: "20mg tablets",
      manufacturer: "Various",
      hospitals: [
        { name: "LUTH", quantity: 34, price: "₦3,200", distance: "2.3km" },
        {
          name: "NSIA LUTH Cancer Center",
          quantity: 67,
          price: "₦3,500",
          distance: "2.5km",
        },
      ],
      alternatives: ["Anastrozole", "Letrozole"],
      insurance: ["NHIS", "Hygeia"],
    },
  ]);

  const categories = [
    { id: "all", name: "All Medications", icon: "💊" },
    { id: "sickle-cell", name: "Sickle Cell", icon: "🔴" },
    { id: "diabetes", name: "Diabetes", icon: "🩸" },
    { id: "hypertension", name: "Hypertension", icon: "❤️" },
    { id: "cancer", name: "Cancer", icon: "🎗️" },
    { id: "emergency", name: "Emergency", icon: "🚑" },
    { id: "rare", name: "Rare Medications", icon: "🔬" },
  ];

  const filteredMedications = medications.filter((med) => {
    if (selectedCategory !== "all" && med.category !== selectedCategory)
      return false;
    if (
      searchTerm &&
      !med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !med.condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">💊 Find Medications</h1>
        <p className="text-green-100">
          Locate rare and specialized medications near you
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by medication name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            🔍 Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Found {filteredMedications.length} medications
      </div>

      {/* Medications Grid */}
      <div className="space-y-6">
        {filteredMedications.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-green-200 transition-colors"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 border-b border-green-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {med.name}
                  </h2>
                  <p className="text-green-600 mt-1">{med.genericName}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {med.condition}
                    </span>
                    <span className="text-sm text-gray-500">{med.dosage}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Manufacturer</p>
                  <p className="font-medium">{med.manufacturer}</p>
                </div>
              </div>
            </div>

            {/* Hospitals */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Available at:
              </h3>
              <div className="space-y-3">
                {med.hospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">🏥</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {hospital.name}
                        </p>
                        <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                          <span>📍 {hospital.distance}</span>
                          <span>📦 {hospital.quantity} units</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {hospital.price}
                      </p>
                      <button className="mt-1 text-sm text-green-600 hover:text-green-700">
                        Check Availability →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alternatives */}
              {med.alternatives && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Alternatives:</p>
                  <div className="flex flex-wrap gap-2">
                    {med.alternatives.map((alt) => (
                      <span
                        key={alt}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Insurance */}
              {med.insurance && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Accepted Insurance:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {med.insurance.map((ins) => (
                      <span
                        key={ins}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                📞 Contact Hospital
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                🔔 Set Alert
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Medication */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200 text-center">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">
          Can't find your medication?
        </h3>
        <p className="text-purple-600 mb-4">
          Request rare medications and we'll notify you when available
        </p>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Request Medication
        </button>
      </div>
    </div>
  );
};

export default FindMedication;
