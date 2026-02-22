import { useState } from "react";

const ResourceManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [resources, setResources] = useState({
    blood: {
      "A+": { current: 12, critical: 5, max: 30 },
      "A-": { current: 5, critical: 3, max: 20 },
      "B+": { current: 8, critical: 5, max: 25 },
      "B-": { current: 3, critical: 2, max: 15 },
      "O+": { current: 15, critical: 8, max: 40 },
      "O-": { current: 4, critical: 2, max: 20 },
      "AB+": { current: 6, critical: 3, max: 15 },
      "AB-": { current: 2, critical: 1, max: 10 },
    },
    icu: {
      beds: { current: 8, total: 15, critical: 3 },
      ventilators: { current: 6, total: 10, critical: 2 },
      dialysis: { current: 2, total: 4, critical: 1 },
    },
    oxygen: {
      masks: { current: 45, total: 100, critical: 20 },
      cylinders: { current: 23, total: 50, critical: 10 },
      concentrators: { current: 8, total: 15, critical: 3 },
    },
    medications: [
      {
        id: 1,
        name: "Hydroxyurea",
        condition: "Sickle Cell",
        current: 45,
        critical: 10,
        unit: "capsules",
      },
      {
        id: 2,
        name: "Insulin",
        condition: "Diabetes",
        current: 60,
        critical: 15,
        unit: "vials",
      },
      {
        id: 3,
        name: "Lisinopril",
        condition: "Hypertension",
        current: 120,
        critical: 30,
        unit: "tablets",
      },
      {
        id: 4,
        name: "Tamoxifen",
        condition: "Breast Cancer",
        current: 34,
        critical: 10,
        unit: "tablets",
      },
    ],
    equipment: [
      {
        name: "X-Ray Machine",
        status: "operational",
        lastMaintenance: "2024-01-15",
      },
      {
        name: "CT Scanner",
        status: "operational",
        lastMaintenance: "2024-01-10",
      },
      {
        name: "Ultrasound",
        status: "maintenance",
        lastMaintenance: "2024-01-05",
      },
      {
        name: "ECG Machine",
        status: "operational",
        lastMaintenance: "2024-01-12",
      },
    ],
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      resource: "O- Blood",
      message: "Below critical level",
      time: "10 mins ago",
    },
    {
      id: 2,
      type: "warning",
      resource: "ICU Beds",
      message: "Only 2 beds left",
      time: "25 mins ago",
    },
    {
      id: 3,
      type: "info",
      resource: "Oxygen",
      message: "50% remaining",
      time: "1 hour ago",
    },
  ]);

  const getStatusColor = (current, critical, max) => {
    if (current === 0) return "bg-red-100 text-red-700";
    if (current <= critical) return "bg-orange-100 text-orange-700";
    if (current <= max * 0.3) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const getProgressColor = (current, critical, max) => {
    if (current === 0) return "bg-red-500";
    if (current <= critical) return "bg-orange-500";
    if (current <= max * 0.3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">📊 Resource Management</h1>
        <p className="text-teal-100">
          Monitor and manage hospital resources in real-time
        </p>
      </div>

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-800">
                  Critical Alerts ({alerts.length})
                </h3>
                <p className="text-sm text-red-600">
                  Resources below threshold
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              View All Alerts
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 mb-8">
        {[
          { id: "overview", label: "Overview", icon: "📊" },
          { id: "blood", label: "Blood Bank", icon: "🩸" },
          { id: "icu", label: "ICU", icon: "🏥" },
          { id: "oxygen", label: "Oxygen", icon: "💨" },
          { id: "medications", label: "Medications", icon: "💊" },
          { id: "equipment", label: "Equipment", icon: "⚕️" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <p className="text-sm text-gray-500">Total Blood Units</p>
              <p className="text-3xl font-bold text-gray-900">
                {Object.values(resources.blood).reduce(
                  (sum, b) => sum + b.current,
                  0,
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <p className="text-sm text-gray-500">ICU Beds Available</p>
              <p className="text-3xl font-bold text-blue-600">
                {resources.icu.beds.current}/{resources.icu.beds.total}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <p className="text-sm text-gray-500">Oxygen Masks</p>
              <p className="text-3xl font-bold text-cyan-600">
                {resources.oxygen.masks.current}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <p className="text-sm text-gray-500">Medications</p>
              <p className="text-3xl font-bold text-purple-600">
                {resources.medications.length}
              </p>
            </div>
          </div>

          {/* Critical Items */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">⚠️ Critical Items</h3>
            <div className="space-y-3">
              {Object.entries(resources.blood)
                .filter(([_, data]) => data.current <= data.critical)
                .map(([type, data]) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-red-600">🩸</span>
                      <span className="font-medium">Blood Type {type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-red-600 font-bold">
                        {data.current} units
                      </span>
                      <span className="text-sm text-gray-500">
                        Critical: {data.critical}
                      </span>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm">
                        Order
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xl ${
                        alert.type === "critical"
                          ? "text-red-500"
                          : alert.type === "warning"
                            ? "text-orange-500"
                            : "text-blue-500"
                      }`}
                    >
                      {alert.type === "critical"
                        ? "🚨"
                        : alert.type === "warning"
                          ? "⚠️"
                          : "ℹ️"}
                    </span>
                    <div>
                      <p className="font-medium">{alert.resource}</p>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blood Bank Tab */}
      {activeTab === "blood" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Blood Bank Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(resources.blood).map(([type, data]) => (
              <div
                key={type}
                className={`p-4 rounded-lg border-2 ${getStatusColor(data.current, data.critical, data.max)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">Type {type}</h4>
                  <span className="text-sm">
                    {data.current}/{data.max}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(data.current, data.critical, data.max)}`}
                    style={{ width: `${(data.current / data.max) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Critical: {data.critical}</span>
                  <button className="text-teal-600 hover:text-teal-700">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ICU Tab */}
      {activeTab === "icu" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">ICU Resources</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-3">ICU Beds</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {resources.icu.beds.current}
                </span>
                <span className="text-gray-500">
                  / {resources.icu.beds.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.icu.beds.current / resources.icu.beds.total) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Critical: {resources.icu.beds.critical}
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg">
              <h4 className="font-medium mb-3">Ventilators</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-purple-600">
                  {resources.icu.ventilators.current}
                </span>
                <span className="text-gray-500">
                  / {resources.icu.ventilators.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.icu.ventilators.current / resources.icu.ventilators.total) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Critical: {resources.icu.ventilators.critical}
              </p>
            </div>

            <div className="p-6 bg-indigo-50 rounded-lg">
              <h4 className="font-medium mb-3">Dialysis Machines</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-indigo-600">
                  {resources.icu.dialysis.current}
                </span>
                <span className="text-gray-500">
                  / {resources.icu.dialysis.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.icu.dialysis.current / resources.icu.dialysis.total) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Critical: {resources.icu.dialysis.critical}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Oxygen Tab */}
      {activeTab === "oxygen" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Oxygen Supply</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-cyan-50 rounded-lg">
              <h4 className="font-medium mb-3">Oxygen Masks</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-cyan-600">
                  {resources.oxygen.masks.current}
                </span>
                <span className="text-gray-500">
                  / {resources.oxygen.masks.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.oxygen.masks.current / resources.oxygen.masks.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-3">Oxygen Cylinders</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {resources.oxygen.cylinders.current}
                </span>
                <span className="text-gray-500">
                  / {resources.oxygen.cylinders.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.oxygen.cylinders.current / resources.oxygen.cylinders.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="p-6 bg-teal-50 rounded-lg">
              <h4 className="font-medium mb-3">Concentrators</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-teal-600">
                  {resources.oxygen.concentrators.current}
                </span>
                <span className="text-gray-500">
                  / {resources.oxygen.concentrators.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{
                    width: `${(resources.oxygen.concentrators.current / resources.oxygen.concentrators.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medications Tab */}
      {activeTab === "medications" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Medication Inventory</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Medication</th>
                  <th className="px-4 py-3 text-left">Condition</th>
                  <th className="px-4 py-3 text-left">Current Stock</th>
                  <th className="px-4 py-3 text-left">Critical Level</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resources.medications.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{med.name}</td>
                    <td className="px-4 py-3">{med.condition}</td>
                    <td className="px-4 py-3">
                      {med.current} {med.unit}
                    </td>
                    <td className="px-4 py-3">
                      {med.critical} {med.unit}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          med.current === 0
                            ? "bg-red-100 text-red-700"
                            : med.current <= med.critical
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {med.current === 0
                          ? "Out"
                          : med.current <= med.critical
                            ? "Critical"
                            : "Good"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;
