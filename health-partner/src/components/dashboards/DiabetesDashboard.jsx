import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const DiabetesDashboard = ({ type = 2 }) => {
  const [readings, setReadings] = useState([]);
  const [newReading, setNewReading] = useState({
    value: "",
    timeOfDay: "fasting",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    notes: "",
    mealDescription: "",
  });
  const [analysis, setAnalysis] = useState(null);
  const [showPrevention, setShowPrevention] = useState("primary");
  const [insulinDoses, setInsulinDoses] = useState([]);
  const [showInsulinCalculator, setShowInsulinCalculator] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`diabetes-readings-${type}`);
    if (saved) {
      setReadings(JSON.parse(saved));
    }
  }, [type]);

  const analyzeGlucose = (value, timeOfDay) => {
    const mgdl = parseInt(value);

    // Target ranges based on time of day
    const targets = {
      fasting: { min: 70, max: 130, ideal: "70-130" },
      beforeMeal: { min: 70, max: 130, ideal: "70-130" },
      afterMeal: { min: 100, max: 180, ideal: "<180" },
      bedtime: { min: 100, max: 150, ideal: "100-150" },
    };

    const target = targets[timeOfDay] || targets.fasting;

    // Primary Prevention - Normal range
    if (mgdl >= target.min && mgdl <= target.max) {
      return {
        category: "Normal",
        color: "green",
        message: `✅ Your blood sugar is in target range (${target.ideal}). Good job!`,
        prevention: "primary",
        advice: [
          "Maintain current diet",
          "Continue exercise routine",
          "Stay hydrated",
          "Monitor regularly",
        ],
      };
    }
    // Hypoglycemia - Too low
    else if (mgdl < 54) {
      return {
        category: "SEVERE HYPOGLYCEMIA",
        color: "red",
        message:
          "🚨 CRITICAL: Blood sugar dangerously low! Need immediate treatment!",
        prevention: "emergency",
        advice: [
          "EAT 15g FAST-ACTING CARBS NOW",
          "Glucose tablets, juice, or soda",
          "Recheck in 15 minutes",
          "If unconscious, glucagon injection",
        ],
      };
    } else if (mgdl < target.min) {
      return {
        category: "Hypoglycemia",
        color: "orange",
        message: `⚠️ Blood sugar too low. Target: ${target.ideal}`,
        prevention: "secondary",
        advice: [
          "Eat 15g fast-acting carbs",
          "Recheck in 15 minutes",
          "Have a snack if next meal is far",
          "Check medication timing",
        ],
      };
    }
    // Hyperglycemia - Too high
    else if (mgdl > 250) {
      return {
        category: "SEVERE HYPERGLYCEMIA",
        color: "red",
        message:
          "🚨 CRITICAL: Blood sugar dangerously high! Check for ketones!",
        prevention: "emergency",
        advice: [
          "Check urine ketones",
          "Take correction dose",
          "Drink water",
          "Seek medical help if ketones present",
        ],
      };
    } else if (mgdl > target.max) {
      return {
        category: "Hyperglycemia",
        color: "yellow",
        message: `⚠️ Blood sugar too high. Target: ${target.ideal}`,
        prevention: "secondary",
        advice: [
          "Take correction dose if prescribed",
          "Drink water",
          "Go for a walk",
          "Avoid carbs until next meal",
        ],
      };
    }
  };

  const handleAddReading = () => {
    const value = parseInt(newReading.value);
    if (isNaN(value)) return;

    const glucoseAnalysis = analyzeGlucose(value, newReading.timeOfDay);
    setAnalysis(glucoseAnalysis);

    const reading = {
      ...newReading,
      value,
      analysis: glucoseAnalysis,
      id: Date.now(),
    };

    const updated = [reading, ...readings].slice(0, 30);
    setReadings(updated);
    localStorage.setItem(`diabetes-readings-${type}`, JSON.stringify(updated));

    // Show insulin calculator if high and on insulin
    if (type === 1 && value > 150) {
      setShowInsulinCalculator(true);
    }

    // Emergency alert
    if (glucoseAnalysis.prevention === "emergency") {
      triggerEmergencyAlert(glucoseAnalysis);
    }
  };

  const triggerEmergencyAlert = (analysis) => {
    const alert = document.createElement("div");
    alert.className =
      "fixed top-4 right-4 bg-red-600 text-white p-6 rounded-xl shadow-2xl z-50 max-w-md animate-slide-in";
    alert.innerHTML = `
      <div class="flex items-start space-x-3">
        <span class="text-3xl">🚨</span>
        <div>
          <h3 class="font-bold text-lg">DIABETES EMERGENCY</h3>
          <p class="text-sm mt-1">${analysis.message}</p>
          <div class="mt-3 space-y-2">
            ${analysis.advice.map((a) => `<p class="text-xs text-red-100">• ${a}</p>`).join("")}
          </div>
          <button class="mt-3 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium w-full">
            Call Emergency Services
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 15000);
  };

  const calculateInsulin = (currentGlucose, carbs, targetGlucose = 120) => {
    // Simple insulin calculation (example)
    const insulinSensitivity = 50; // 1 unit drops glucose by 50 mg/dL
    const insulinToCarbRatio = 10; // 1 unit per 10g carbs

    const correctionDose =
      (currentGlucose - targetGlucose) / insulinSensitivity;
    const carbDose = carbs / insulinToCarbRatio;

    return {
      correction: Math.max(0, Math.round(correctionDose * 10) / 10),
      carbs: Math.max(0, Math.round(carbDose * 10) / 10),
      total: Math.max(0, Math.round((correctionDose + carbDose) * 10) / 10),
    };
  };

  const getGlucoseColor = (value, timeOfDay) => {
    const targets = {
      fasting: { min: 70, max: 130 },
      beforeMeal: { min: 70, max: 130 },
      afterMeal: { max: 180 },
      bedtime: { min: 100, max: 150 },
    };
    const target = targets[timeOfDay] || targets.fasting;

    if (value < 54) return "bg-red-100 border-red-600";
    if (value < target.min) return "bg-orange-100 border-orange-500";
    if (value > 250) return "bg-red-100 border-red-600";
    if (value > target.max) return "bg-yellow-100 border-yellow-500";
    return "bg-green-100 border-green-500";
  };

  const chartData = {
    labels: readings
      .slice(0, 7)
      .map((r) => new Date(r.date).toLocaleDateString())
      .reverse(),
    datasets: [
      {
        label: "Blood Glucose (mg/dL)",
        data: readings
          .slice(0, 7)
          .map((r) => r.value)
          .reverse(),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {type === 1 ? "Type 1 Diabetes" : "Type 2 Diabetes"} Management
        </h1>
        <p className="text-blue-100">
          Track, monitor, and prevent complications
        </p>

        {/* Prevention Tabs */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowPrevention("primary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "primary"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🛡️ Primary Prevention
          </button>
          <button
            onClick={() => setShowPrevention("secondary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "secondary"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🔍 Secondary Prevention
          </button>
          <button
            onClick={() => setShowPrevention("tertiary")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              showPrevention === "tertiary"
                ? "bg-white text-blue-600 shadow-lg"
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
            🛡️ Primary Prevention - Preventing Diabetes Onset
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">🥗</span>
              <h3 className="font-medium">Healthy Diet</h3>
              <p className="text-sm text-gray-600 mt-1">
                Low sugar, high fiber
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">🏃</span>
              <h3 className="font-medium">Exercise</h3>
              <p className="text-sm text-gray-600 mt-1">150 mins/week</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h3 className="font-medium">Weight Loss</h3>
              <p className="text-sm text-gray-600 mt-1">5-7% of body weight</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">💧</span>
              <h3 className="font-medium">Hydration</h3>
              <p className="text-sm text-gray-600 mt-1">8+ glasses water</p>
            </div>
          </div>
        </div>
      )}

      {/* Glucose Input Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          🩸 Log Your Blood Glucose
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Glucose (mg/dL)
            </label>
            <input
              type="number"
              value={newReading.value}
              onChange={(e) =>
                setNewReading({ ...newReading, value: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Time of Day
            </label>
            <select
              value={newReading.timeOfDay}
              onChange={(e) =>
                setNewReading({ ...newReading, timeOfDay: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="fasting">Fasting</option>
              <option value="beforeMeal">Before Meal</option>
              <option value="afterMeal">After Meal</option>
              <option value="bedtime">Bedtime</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={newReading.date}
              onChange={(e) =>
                setNewReading({ ...newReading, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              What did you eat? (optional)
            </label>
            <input
              type="text"
              value={newReading.mealDescription}
              onChange={(e) =>
                setNewReading({
                  ...newReading,
                  mealDescription: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="e.g., 2 slices bread, 1 cup rice"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddReading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log Reading
          </button>
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

              {analysis.prevention === "emergency" && (
                <button className="ml-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 animate-pulse">
                  🚑 Emergency
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Insulin Calculator (for Type 1) */}
      {type === 1 && showInsulinCalculator && (
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-8 animate-slide-in">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            💉 Insulin Dose Calculator
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Current Glucose
              </label>
              <input
                type="number"
                value={newReading.value}
                className="w-full px-4 py-2 border border-purple-200 rounded-lg"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Carbs to eat (g)
              </label>
              <input
                type="number"
                id="carbs"
                className="w-full px-4 py-2 border border-purple-200 rounded-lg"
                placeholder="45"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  const carbs =
                    parseInt(document.getElementById("carbs").value) || 0;
                  const dose = calculateInsulin(
                    parseInt(newReading.value),
                    carbs,
                  );
                  alert(
                    `Recommended dose: ${dose.total} units (Correction: ${dose.correction}, Food: ${dose.carbs})`,
                  );
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Calculate Dose
              </button>
            </div>
          </div>
        </div>
      )}

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
              className={`p-4 rounded-lg border-2 ${getGlucoseColor(reading.value, reading.timeOfDay)}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">
                    {reading.value} mg/dL
                  </span>
                  <span className="ml-3 text-sm text-gray-600">
                    {reading.timeOfDay} • {reading.date} at {reading.time}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm bg-white`}>
                  {reading.analysis.category}
                </span>
              </div>
              {reading.mealDescription && (
                <p className="text-sm text-gray-600 mt-2">
                  Meal: {reading.mealDescription}
                </p>
              )}
              {reading.notes && (
                <p className="text-sm text-gray-600 mt-1">{reading.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiabetesDashboard;
