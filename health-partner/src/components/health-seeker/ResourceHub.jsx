import { useState } from "react";

const ResourceHub = () => {
  const [selectedResource, setSelectedResource] = useState("all");
  const [selectedLGA, setSelectedLGA] = useState("all");

  const resources = {
    blood: [
      {
        hospital: "LUTH",
        lga: "Ikeja",
        bloodType: "A+",
        quantity: 12,
        status: "available",
        lastUpdate: "5 mins ago",
      },
      {
        hospital: "LUTH",
        lga: "Ikeja",
        bloodType: "O+",
        quantity: 8,
        status: "available",
        lastUpdate: "5 mins ago",
      },
      {
        hospital: "LUTH",
        lga: "Ikeja",
        bloodType: "B+",
        quantity: 3,
        status: "critical",
        lastUpdate: "5 mins ago",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        bloodType: "O+",
        quantity: 5,
        status: "available",
        lastUpdate: "10 mins ago",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        bloodType: "A+",
        quantity: 2,
        status: "critical",
        lastUpdate: "10 mins ago",
      },
      {
        hospital: "Ikeja Medical",
        lga: "Ikeja",
        bloodType: "O+",
        quantity: 10,
        status: "available",
        lastUpdate: "15 mins ago",
      },
      {
        hospital: "Isolo General",
        lga: "Isolo",
        bloodType: "O+",
        quantity: 0,
        status: "unavailable",
        lastUpdate: "20 mins ago",
      },
    ],
    icu: [
      {
        hospital: "LUTH",
        lga: "Ikeja",
        available: 4,
        total: 15,
        ventilators: 6,
        status: "available",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        available: 2,
        total: 8,
        ventilators: 3,
        status: "available",
      },
      {
        hospital: "Ikeja Medical",
        lga: "Ikeja",
        available: 1,
        total: 6,
        ventilators: 2,
        status: "critical",
      },
      {
        hospital: "Isolo General",
        lga: "Isolo",
        available: 0,
        total: 4,
        ventilators: 1,
        status: "unavailable",
      },
    ],
    oxygen: [
      {
        hospital: "LUTH",
        lga: "Ikeja",
        masks: 45,
        cylinders: 23,
        concentrators: 8,
        status: "available",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        masks: 23,
        cylinders: 12,
        concentrators: 4,
        status: "available",
      },
      {
        hospital: "Ikeja Medical",
        lga: "Ikeja",
        masks: 12,
        cylinders: 8,
        concentrators: 3,
        status: "critical",
      },
      {
        hospital: "Isolo General",
        lga: "Isolo",
        masks: 5,
        cylinders: 3,
        concentrators: 1,
        status: "critical",
      },
    ],
    antivenom: [
      {
        hospital: "LUTH",
        lga: "Ikeja",
        type: "Snake",
        quantity: 8,
        expiry: "2024-12-31",
        status: "available",
      },
      {
        hospital: "LUTH",
        lga: "Ikeja",
        type: "Spider",
        quantity: 0,
        status: "unavailable",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        type: "Snake",
        quantity: 5,
        expiry: "2024-10-31",
        status: "available",
      },
      {
        hospital: "Ikeja Medical",
        lga: "Ikeja",
        type: "Snake",
        quantity: 3,
        expiry: "2024-09-30",
        status: "available",
      },
    ],
    medications: [
      {
        hospital: "LUTH",
        lga: "Ikeja",
        name: "Hydroxyurea",
        condition: "Sickle Cell",
        quantity: 45,
        status: "available",
      },
      {
        hospital: "LUTH",
        lga: "Ikeja",
        name: "Insulin",
        condition: "Diabetes",
        quantity: 60,
        status: "available",
      },
      {
        hospital: "Gbagada General",
        lga: "Kosofe",
        name: "Hydroxyurea",
        condition: "Sickle Cell",
        quantity: 23,
        status: "available",
      },
      {
        hospital: "Ikeja Medical",
        lga: "Ikeja",
        name: "Insulin",
        condition: "Diabetes",
        quantity: 12,
        status: "critical",
      },
    ],
  };

  const lgas = [
    "Ikeja",
    "Kosofe",
    "Surulere",
    "Isolo",
    "Lagos Island",
    "Ebute Metta",
  ];

  const resourceTypes = [
    { id: "all", name: "All Resources", icon: "📦" },
    { id: "blood", name: "Blood Bank", icon: "🩸" },
    { id: "icu", name: "ICU Beds", icon: "🏥" },
    { id: "oxygen", name: "Oxygen", icon: "💨" },
    { id: "antivenom", name: "Anti-venom", icon: "🐍" },
    { id: "medications", name: "Medications", icon: "💊" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-300";
      case "critical":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "unavailable":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🏥 Resource Hub</h1>
        <p className="text-teal-100">
          Real-time availability of medical resources across hospitals
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource Type
            </label>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedResource(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedResource === type.id
                      ? "bg-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LGA
            </label>
            <select
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All LGAs</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blood Bank Section */}
      {(selectedResource === "all" || selectedResource === "blood") && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-red-500 mr-2">🩸</span> Blood Bank
            Availability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    LGA
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Blood Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Last Update
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resources.blood
                  .filter((b) => selectedLGA === "all" || b.lga === selectedLGA)
                  .map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.hospital}</td>
                      <td className="px-4 py-3">{item.lga}</td>
                      <td className="px-4 py-3 font-mono">{item.bloodType}</td>
                      <td className="px-4 py-3">{item.quantity} units</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.lastUpdate}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ICU Beds Section */}
      {(selectedResource === "all" || selectedResource === "icu") && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-blue-500 mr-2">🏥</span> ICU Bed Availability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    LGA
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Available Beds
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Total Beds
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Ventilators
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resources.icu
                  .filter((i) => selectedLGA === "all" || i.lga === selectedLGA)
                  .map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.hospital}</td>
                      <td className="px-4 py-3">{item.lga}</td>
                      <td className="px-4 py-3 font-bold text-blue-600">
                        {item.available}
                      </td>
                      <td className="px-4 py-3">{item.total}</td>
                      <td className="px-4 py-3">{item.ventilators}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Oxygen Section */}
      {(selectedResource === "all" || selectedResource === "oxygen") && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-cyan-500 mr-2">💨</span> Oxygen Supply
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.oxygen
              .filter((o) => selectedLGA === "all" || o.lga === selectedLGA)
              .map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(item.status)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.hospital}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.lga}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Masks</p>
                      <p className="font-bold">{item.masks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cylinders</p>
                      <p className="font-bold">{item.cylinders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Concentrators</p>
                      <p className="font-bold">{item.concentrators}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Anti-venom Section */}
      {(selectedResource === "all" || selectedResource === "antivenom") && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-500 mr-2">🐍</span> Anti-venom
            Availability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    LGA
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Expiry
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resources.antivenom
                  .filter((a) => selectedLGA === "all" || a.lga === selectedLGA)
                  .map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.hospital}</td>
                      <td className="px-4 py-3">{item.lga}</td>
                      <td className="px-4 py-3">{item.type}</td>
                      <td className="px-4 py-3">{item.quantity} vials</td>
                      <td className="px-4 py-3 text-sm">
                        {item.expiry || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <button className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg">
          🚑 Emergency Request
        </button>
        <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg">
          📋 Resource Alert
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg">
          📊 View All Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceHub;
