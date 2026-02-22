import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const HypertensionDashboard = () => {
  const [readings, setReadings] = useState([]);
  const [newReading, setNewReading] = useState({
    systolic: "",
    diastolic: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    notes: "",
  });
  const [analysis, setAnalysis] = useState(null);
  const [showPrevention, setShowPrevention] = useState("primary"); // primary, secondary, tertiary
  const [reminders, setReminders] = useState([
    { id: 1, text: "Take Lisinopril 10mg", time: "08:00", taken: false },
    { id: 2, text: "Take Amlodipine 5mg", time: "20:00", taken: false },
    { id: 3, text: "Measure Blood Pressure", time: "09:00", done: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("hypertension-readings");
    if (saved) {
      setReadings(JSON.parse(saved));
    }
  }, []);

  const analyzeBP = (systolic, diastolic) => {
    // Primary Prevention: Normal range
    if (systolic < 120 && diastolic < 80) {
      return {
        category: "Normal",
        color: "green",
        message:
          "✅ Your blood pressure is normal. Keep up the healthy habits!",
        prevention: "primary",
        advice: [
          "Maintain healthy diet",
          "Exercise regularly",
          "Limit salt intake",
          "Manage stress",
        ],
      };
    }
    // Elevated
    else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      return {
        category: "Elevated",
        color: "yellow",
        message:
          "⚠️ Your blood pressure is elevated. Time to focus on prevention.",
        prevention: "primary",
        advice: [
          "Reduce salt intake",
          "Increase physical activity",
          "Monitor regularly",
          "Consider DASH diet",
        ],
      };
    }
    // Stage 1 Hypertension - Secondary Prevention
    else if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
      return {
        category: "Stage 1 Hypertension",
        color: "orange",
        message:
          "⚠️ You have Stage 1 Hypertension. Schedule a doctor's appointment.",
        prevention: "secondary",
        advice: [
          "Consult your doctor",
          "Start medication if prescribed",
          "Monitor daily",
          "Lifestyle changes crucial",
        ],
      };
    }
    // Stage 2 Hypertension - Tertiary Prevention
    else if (
      (systolic >= 140 && systolic <= 180) ||
      (diastolic >= 90 && diastolic <= 120)
    ) {
      return {
        category: "Stage 2 Hypertension",
        color: "red",
        message:
          "🔴 You have Stage 2 Hypertension. Contact your doctor immediately.",
        prevention: "tertiary",
        advice: [
          "Take medication as prescribed",
          "Monitor BP twice daily",
          "Watch for symptoms",
          "Follow up with doctor",
        ],
      };
    }
    // Hypertensive Crisis - Emergency
    else if (systolic > 180 || diastolic > 120) {
      return {
        category: "HYPERTENSIVE CRISIS",
        color: "red",
        message: "🚨 EMERGENCY! Seek immediate medical attention!",
        prevention: "emergency",
        advice: [
          "CALL EMERGENCY SERVICES",
          "Do not wait",
          "Go to nearest ER",
          "If symptoms: chest pain, shortness of breath",
        ],
      };
    }
  };

  const handleAddReading = () => {
    const systolic = parseInt(newReading.systolic);
    const diastolic = parseInt(newReading.diastolic);

    if (isNaN(systolic) || isNaN(diastolic)) return;

    const bpAnalysis = analyzeBP(systolic, diastolic);
    setAnalysis(bpAnalysis);

    const reading = {
      ...newReading,
      systolic,
      diastolic,
      analysis: bpAnalysis,
      id: Date.now(),
    };

    const updated = [reading, ...readings].slice(0, 30);
    setReadings(updated);
    localStorage.setItem("hypertension-readings", JSON.stringify(updated));

    // Trigger notification if emergency
    if (bpAnalysis.prevention === "emergency") {
      triggerEmergencyAlert(bpAnalysis);
    }
  };

  const triggerEmergencyAlert = (analysis) => {
    // Show alert modal
    const alert = document.createElement("div");
    alert.className =
      "fixed top-4 right-4 bg-red-600 text-white p-6 rounded-xl shadow-2xl z-50 max-w-md animate-slide-in";
    alert.innerHTML = `
      <div class="flex items-start space-x-3">
        <span class="text-3xl">🚨</span>
        <div>
          <h3 class="font-bold text-lg">EMERGENCY</h3>
          <p class="text-sm mt-1">${analysis.message}</p>
          <p class="text-xs mt-2 text-red-100">Call 911 or go to nearest hospital immediately</p>
          <button class="mt-3 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium w-full">
            Call Emergency Services
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 10000);
  };

  const getBPColor = (reading) => {
    if (reading.systolic > 180 || reading.diastolic > 120)
      return "bg-red-100 border-red-500";
    if (reading.systolic > 140 || reading.diastolic > 90)
      return "bg-orange-100 border-orange-500";
    if (reading.systolic > 130 || reading.diastolic > 80)
      return "bg-yellow-100 border-yellow-500";
    return "bg-green-100 border-green-500";
  };

  const chartData = {
    labels: readings
      .slice(0, 7)
      .map((r) => new Date(r.date).toLocaleDateString())
      .reverse(),
    datasets: [
      {
        label: "Systolic",
        data: readings
          .slice(0, 7)
          .map((r) => r.systolic)
          .reverse(),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
      {
        label: "Diastolic",
        data: readings
          .slice(0, 7)
          .map((r) => r.diastolic)
          .reverse(),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Prevention Toggle */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Hypertension Management</h1>
        <p className="text-teal-100">
          Track, monitor, and prevent complications
        </p>

        {/* Prevention Level Tabs */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowPrevention("primary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "primary"
                ? "bg-white text-teal-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🛡️ Primary Prevention
          </button>
          <button
            onClick={() => setShowPrevention("secondary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "secondary"
                ? "bg-white text-teal-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🔍 Secondary Prevention
          </button>
          <button
            onClick={() => setShowPrevention("tertiary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "tertiary"
                ? "bg-white text-teal-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            💊 Tertiary Prevention
          </button>
        </div>
      </div>

      {/* Prevention Content */}
      {showPrevention === "primary" && (
        <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            🛡️ Primary Prevention - Stop It Before It Starts
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">🥗</span>
              <h3 className="font-medium">DASH Diet</h3>
              <p className="text-sm text-gray-600 mt-1">
                Low salt, fruits, vegetables, whole grains
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">🏃</span>
              <h3 className="font-medium">Exercise</h3>
              <p className="text-sm text-gray-600 mt-1">
                30 mins daily, 5 times a week
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h3 className="font-medium">Weight Management</h3>
              <p className="text-sm text-gray-600 mt-1">Maintain healthy BMI</p>
            </div>
          </div>
        </div>
      )}

      {showPrevention === "secondary" && (
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            🔍 Secondary Prevention - Early Detection
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Next Check-up</h3>
                  <p className="text-sm text-gray-600">in 2 weeks</p>
                </div>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm">
                  Schedule
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Last Lab Test</h3>
                  <p className="text-sm text-gray-600">3 months ago</p>
                </div>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm">
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrevention === "tertiary" && (
        <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            💊 Tertiary Prevention - Managing Complications
          </h2>
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="bg-white p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={reminder.taken || reminder.done}
                    onChange={() => {
                      const updated = reminders.map((r) =>
                        r.id === reminder.id ? { ...r, taken: !r.taken } : r,
                      );
                      setReminders(updated);
                    }}
                    className="w-5 h-5 text-teal-600 rounded"
                  />
                  <div>
                    <p className="font-medium">{reminder.text}</p>
                    <p className="text-sm text-gray-500">{reminder.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BP Input Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          📊 Log Your Blood Pressure
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Systolic (upper)
            </label>
            <input
              type="number"
              value={newReading.systolic}
              onChange={(e) =>
                setNewReading({ ...newReading, systolic: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Diastolic (lower)
            </label>
            <input
              type="number"
              value={newReading.diastolic}
              onChange={(e) =>
                setNewReading({ ...newReading, diastolic: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="80"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={newReading.date}
              onChange={(e) =>
                setNewReading({ ...newReading, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddReading}
              className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Log Reading
            </button>
          </div>
        </div>

        {/* Immediate Feedback */}
        {analysis && (
          <div
            className={`mt-4 p-6 rounded-lg bg-${analysis.color}-50 border border-${analysis.color}-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold text-${analysis.color}-800 mb-2`}
                >
                  {analysis.category}
                </h3>
                <p className={`text-${analysis.color}-700`}>
                  {analysis.message}
                </p>

                {/* Advice List */}
                <div className="mt-4">
                  <p
                    className={`text-sm font-medium text-${analysis.color}-700 mb-2`}
                  >
                    What to do:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.advice.map((item, i) => (
                      <li
                        key={i}
                        className={`text-sm text-${analysis.color}-600`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Emergency Button */}
              {analysis.prevention === "emergency" && (
                <button className="ml-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 animate-pulse">
                  🚑 Call Emergency
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      {readings.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📈 7-Day Trend</h2>
          <div className="h-64">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      )}

      {/* Recent Readings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Recent Readings</h2>
        <div className="space-y-3">
          {readings.slice(0, 10).map((reading) => (
            <div
              key={reading.id}
              className={`p-4 rounded-lg border-2 ${getBPColor(reading)}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">
                    {reading.systolic}/{reading.diastolic}
                  </span>
                  <span className="ml-3 text-sm text-gray-600">
                    {reading.date} at {reading.time}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm bg-white`}>
                  {reading.analysis.category}
                </span>
              </div>
              {reading.notes && (
                <p className="text-sm text-gray-600 mt-2">{reading.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HypertensionDashboard;
