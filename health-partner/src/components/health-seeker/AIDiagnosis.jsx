import { useState } from "react";
// import { geminiAI } from "../../services/geminiAI";
import { geminiAI } from "../services/geminiAI";

const AIDiagnosis = () => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [userInfo, setUserInfo] = useState({
    age: "",
    gender: "",
    duration: "",
    severity: "",
    existingConditions: [],
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Fatigue",
    "Chest Pain",
    "Shortness of Breath",
    "Nausea",
    "Dizziness",
    "Joint Pain",
    "Abdominal Pain",
    "Rash",
    "Sore Throat",
    "Vomiting",
    "Diarrhea",
    "Loss of Appetite",
    "Night Sweats",
    "Weight Loss",
    "Swelling",
    "Blurred Vision",
    "Numbness",
    "Palpitations",
    "Anxiety",
  ];

  const conditions = [
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Sickle Cell",
    "Heart Disease",
    "None",
    "Other",
  ];

  const addSymptom = () => {
    if (currentSymptom && !symptoms.includes(currentSymptom)) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      const result = await geminiAI.analyzeSymptoms(symptoms, userInfo);
      setAnalysis(result);
      setStep(3);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback analysis
      setAnalysis({
        possibleConditions: [
          { name: "Common Cold", probability: 65, urgency: "low" },
          { name: "Influenza", probability: 25, urgency: "medium" },
          { name: "Allergies", probability: 10, urgency: "low" },
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Monitor temperature",
          "Consult doctor if symptoms worsen",
        ],
        urgentCare: false,
      });
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Health Diagnosis</h1>
        <p className="text-purple-100">
          Describe your symptoms for an AI-powered preliminary assessment
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 ${
                  step > s ? "bg-purple-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">
            What symptoms are you experiencing?
          </h2>

          {/* Symptom Input */}
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="Type a symptom..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === "Enter" && addSymptom()}
            />
            <button
              onClick={addSymptom}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add
            </button>
          </div>

          {/* Common Symptoms */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Common symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => {
                    setCurrentSymptom(symptom);
                    setTimeout(() => addSymptom(), 100);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Symptoms */}
          {symptoms.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Your symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{symptom}</span>
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="ml-1 text-purple-500 hover:text-purple-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(2)}
            disabled={symptoms.length === 0}
            className="w-full py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Tell us a bit about yourself
          </h2>

          <div className="space-y-6">
            {/* Age & Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, age: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={userInfo.gender}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How long have you had these symptoms?
              </label>
              <select
                value={userInfo.duration}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, duration: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select duration</option>
                <option value="hours">Few hours</option>
                <option value="days">1-3 days</option>
                <option value="week">About a week</option>
                <option value="weeks">Several weeks</option>
                <option value="months">Months</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How severe are your symptoms?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Mild", "Moderate", "Severe"].map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setUserInfo({ ...userInfo, severity: level })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userInfo.severity === level
                        ? level === "Mild"
                          ? "border-green-500 bg-green-50"
                          : level === "Moderate"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have any existing conditions?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      value={condition}
                      checked={userInfo.existingConditions.includes(condition)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUserInfo({
                            ...userInfo,
                            existingConditions: [
                              ...userInfo.existingConditions,
                              condition,
                            ],
                          });
                        } else {
                          setUserInfo({
                            ...userInfo,
                            existingConditions:
                              userInfo.existingConditions.filter(
                                (c) => c !== condition,
                              ),
                          });
                        }
                      }}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleAnalysis}
                disabled={
                  !userInfo.age ||
                  !userInfo.gender ||
                  !userInfo.duration ||
                  !userInfo.severity
                }
                className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                Analyze Symptoms
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">AI is analyzing your symptoms...</p>
              <p className="text-sm text-gray-400 mt-2">
                This may take a moment
              </p>
            </div>
          ) : (
            analysis && (
              <>
                {/* Urgent Care Alert */}
                {analysis.urgentCare && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 animate-pulse">
                    <div className="flex items-start space-x-4">
                      <span className="text-4xl">🚨</span>
                      <div>
                        <h3 className="text-xl font-bold text-red-800 mb-2">
                          Seek Immediate Medical Attention
                        </h3>
                        <p className="text-red-700">
                          Your symptoms may require urgent care.
                        </p>
                        <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                          Find Nearest Hospital
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Possible Conditions */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    🔍 Possible Conditions
                  </h2>
                  <div className="space-y-4">
                    {analysis.possibleConditions.map((condition, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-200 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {condition.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {condition.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${
                                condition.probability > 70
                                  ? "text-red-600"
                                  : condition.probability > 40
                                    ? "text-orange-600"
                                    : "text-yellow-600"
                              }`}
                            >
                              {condition.probability}%
                            </div>
                            <span
                              className={`text-sm px-3 py-1 rounded-full ${
                                condition.urgency === "high"
                                  ? "bg-red-100 text-red-700"
                                  : condition.urgency === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {condition.urgency} urgency
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Recommendations:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            {condition.recommendations?.map((rec, i) => (
                              <li key={i} className="text-sm text-gray-600">
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* General Recommendations */}
                <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    📋 What to do next
                  </h2>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-purple-600 mt-1">•</span>
                        <span className="text-purple-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-700">
                  <p>
                    ⚠️ This is an AI-generated analysis and not a medical
                    diagnosis. Please consult a healthcare professional.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setStep(1);
                      setSymptoms([]);
                      setAnalysis(null);
                    }}
                    className="flex-1 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Start New Analysis
                  </button>
                  <button className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
                    Find a Doctor
                  </button>
                </div>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AIDiagnosis;
