import { useState, useEffect } from "react";

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    responding: 0,
    resolved: 0,
  });

  useEffect(() => {
    // Load emergency alerts
    loadAlerts();

    // Simulate real-time updates
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = () => {
    const mockAlerts = [
      {
        id: 1,
        type: "cardiac",
        patient: "John Doe",
        age: 65,
        location: "Ikeja",
        hospital: "LUTH",
        distance: "2.3km",
        time: "2 mins ago",
        status: "critical",
        ambulance: { dispatched: true, eta: "5 mins" },
        vitals: { bp: "160/95", hr: 110, spo2: 92 },
      },
      {
        id: 2,
        type: "accident",
        patient: "Unknown",
        location: "Maryland",
        hospital: "Gbagada General",
        distance: "1.5km",
        time: "5 mins ago",
        status: "responding",
        ambulance: { dispatched: true, eta: "3 mins" },
        vitals: { bp: "130/80", hr: 100, spo2: 96 },
      },
      {
        id: 3,
        type: "stroke",
        patient: "Mary Smith",
        age: 58,
        location: "Surulere",
        hospital: "Ikeja Medical",
        distance: "4.1km",
        time: "8 mins ago",
        status: "pending",
        ambulance: { dispatched: false },
      },
      {
        id: 4,
        type: "diabetic",
        patient: "James Brown",
        age: 45,
        location: "Yaba",
        hospital: "LUTH",
        distance: "3.2km",
        time: "12 mins ago",
        status: "resolved",
        ambulance: { dispatched: true, eta: "Arrived" },
      },
    ];

    setAlerts(mockAlerts);

    // Update stats
    setStats({
      total: mockAlerts.length,
      critical: mockAlerts.filter((a) => a.status === "critical").length,
      responding: mockAlerts.filter((a) => a.status === "responding").length,
      resolved: mockAlerts.filter((a) => a.status === "resolved").length,
    });
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "cardiac":
        return "❤️";
      case "accident":
        return "🚗";
      case "stroke":
        return "🧠";
      case "diabetic":
        return "🩸";
      case "respiratory":
        return "🫁";
      default:
        return "🚨";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "responding":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredAlerts = alerts.filter(
    (a) => filter === "all" || a.status === filter,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🚨 Emergency Alerts</h1>
        <p className="text-red-100">Real-time emergency response management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <p className="text-sm text-gray-500">Total Alerts</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 shadow-lg border border-red-100">
          <p className="text-sm text-red-600">Critical</p>
          <p className="text-3xl font-bold text-red-700">{stats.critical}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 shadow-lg border border-yellow-100">
          <p className="text-sm text-yellow-600">Responding</p>
          <p className="text-3xl font-bold text-yellow-700">
            {stats.responding}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 shadow-lg border border-green-100">
          <p className="text-sm text-green-600">Resolved</p>
          <p className="text-3xl font-bold text-green-700">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex space-x-2">
          {["all", "critical", "responding", "pending", "resolved"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-xl shadow-lg p-6 border-l-8 ${
              alert.status === "critical"
                ? "border-l-red-500"
                : alert.status === "responding"
                  ? "border-l-yellow-500"
                  : alert.status === "pending"
                    ? "border-l-orange-500"
                    : "border-l-green-500"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    alert.status === "critical"
                      ? "bg-red-100"
                      : alert.status === "responding"
                        ? "bg-yellow-100"
                        : alert.status === "pending"
                          ? "bg-orange-100"
                          : "bg-green-100"
                  }`}
                >
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}{" "}
                    Emergency
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Patient: {alert.patient} {alert.age && `(${alert.age}yrs)`}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>📍 {alert.location}</span>
                    <span>📏 {alert.distance}</span>
                    <span>⏱️ {alert.time}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}
              >
                {alert.status}
              </span>
            </div>

            {/* Vitals */}
            {alert.vitals && (
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Blood Pressure</p>
                  <p className="font-semibold">{alert.vitals.bp}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Heart Rate</p>
                  <p className="font-semibold">{alert.vitals.hr} bpm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">SpO2</p>
                  <p className="font-semibold">{alert.vitals.spo2}%</p>
                </div>
              </div>
            )}

            {/* Ambulance Status */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚑</span>
                <div>
                  <p className="font-medium">Ambulance Status</p>
                  {alert.ambulance.dispatched ? (
                    <p className="text-sm text-blue-600">
                      ETA: {alert.ambulance.eta}
                    </p>
                  ) : (
                    <p className="text-sm text-orange-600">Awaiting dispatch</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {alert.status !== "resolved" && (
                  <>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Track Ambulance
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Mark Resolved
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            {alert.status !== "resolved" && (
              <div className="mt-4 flex space-x-3">
                <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  🚨 Emergency Call
                </button>
                <button className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  📞 Contact Hospital
                </button>
                <button className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  📋 Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
