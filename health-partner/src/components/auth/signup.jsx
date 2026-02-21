import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    userType: "patient", // patient, caregiver, hospital
    conditions: [],
    primaryCondition: "",
    emergencyContact: "",
    emergencyPhone: "",
    lga: "",
  });

  const navigate = useNavigate();

  const conditions = [
    {
      category: "Cardiovascular",
      color: "red",
      items: [
        {
          id: "hypertension",
          name: "Hypertension",
          icon: "❤️",
          description: "High Blood Pressure",
        },
        {
          id: "heart-disease",
          name: "Heart Disease",
          icon: "🫀",
          description: "Various heart conditions",
        },
      ],
    },
    {
      category: "Metabolic",
      color: "blue",
      items: [
        {
          id: "diabetes-type1",
          name: "Diabetes Type 1",
          icon: "🩸",
          description: "Insulin dependent",
        },
        {
          id: "diabetes-type2",
          name: "Diabetes Type 2",
          icon: "🩸",
          description: "Non-insulin dependent",
        },
        {
          id: "pre-diabetes",
          name: "Pre-Diabetes",
          icon: "⚠️",
          description: "At risk",
        },
      ],
    },
    {
      category: "Genetic",
      color: "purple",
      items: [
        {
          id: "sickle-cell",
          name: "Sickle Cell Disease",
          icon: "🔴",
          description: "Genetic blood disorder",
        },
        {
          id: "sickle-cell-trait",
          name: "Sickle Cell Trait",
          icon: "🟠",
          description: "Carrier",
        },
        {
          id: "down-syndrome",
          name: "Down Syndrome",
          icon: "🧬",
          description: "Genetic condition",
        },
      ],
    },
    {
      category: "Oncological",
      color: "orange",
      items: [
        {
          id: "breast-cancer",
          name: "Breast Cancer",
          icon: "🎀",
          description: "Current/Survivor",
        },
        {
          id: "cervical-cancer",
          name: "Cervical Cancer",
          icon: "🌸",
          description: "Current/Survivor",
        },
        {
          id: "prostate-cancer",
          name: "Prostate Cancer",
          icon: "👨",
          description: "Current/Survivor",
        },
        {
          id: "cancer-survivor",
          name: "Cancer Survivor",
          icon: "🎗️",
          description: "In remission",
        },
      ],
    },
    {
      category: "Respiratory",
      color: "teal",
      items: [
        {
          id: "asthma",
          name: "Asthma",
          icon: "🫁",
          description: "Respiratory condition",
        },
        {
          id: "allergies",
          name: "Severe Allergies",
          icon: "🤧",
          description: "Anaphylaxis risk",
        },
        {
          id: "copd",
          name: "COPD",
          icon: "💨",
          description: "Chronic lung disease",
        },
      ],
    },
    {
      category: "Preventive",
      color: "green",
      items: [
        {
          id: "preventive",
          name: "Preventive Care",
          icon: "🛡️",
          description: "No active condition",
        },
        {
          id: "caregiver",
          name: "I'm a Caregiver",
          icon: "👥",
          description: "Caring for someone",
        },
      ],
    },
  ];

  const handleConditionToggle = (conditionId) => {
    setFormData((prev) => {
      const newConditions = prev.conditions.includes(conditionId)
        ? prev.conditions.filter((c) => c !== conditionId)
        : [...prev.conditions, conditionId];

      // Auto-set primary if first condition
      const newPrimary =
        prev.primaryCondition ||
        (newConditions.length === 1 ? conditionId : prev.primaryCondition);

      return {
        ...prev,
        conditions: newConditions,
        primaryCondition: newPrimary,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data with conditions
    localStorage.setItem("userData", JSON.stringify(formData));
    localStorage.setItem("userRole", "patient");

    // Redirect to disease-specific dashboard
    navigate(`/dashboard/${formData.primaryCondition || "preventive"}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 ${
                    step > s ? "bg-teal-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Vytal Account
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us about yourself so we can personalize your health journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-600">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LGA
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lga}
                      onChange={(e) =>
                        setFormData({ ...formData, lga: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="Ikeja"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-600">
                  Health Profile
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select all conditions that apply to you (this helps us
                  customize your dashboard)
                </p>

                <div className="space-y-6">
                  {conditions.map((category) => (
                    <div key={category.category}>
                      <h4
                        className={`text-md font-medium text-${category.color}-600 mb-3`}
                      >
                        {category.category}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {category.items.map((condition) => (
                          <label
                            key={condition.id}
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              formData.conditions.includes(condition.id)
                                ? `border-${category.color}-500 bg-${category.color}-50`
                                : "border-gray-200 hover:border-teal-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.conditions.includes(
                                condition.id,
                              )}
                              onChange={() =>
                                handleConditionToggle(condition.id)
                              }
                              className="mt-1 w-4 h-4 text-teal-600 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl">
                                  {condition.icon}
                                </span>
                                <span className="font-medium">
                                  {condition.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {condition.description}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {formData.conditions.length > 1 && (
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                    <label className="block text-sm font-medium text-teal-700 mb-2">
                      Primary Condition (Your main dashboard focus)
                    </label>
                    <select
                      value={formData.primaryCondition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryCondition: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select primary condition</option>
                      {formData.conditions.map((c) => {
                        const condition = conditions
                          .flatMap((cat) => cat.items)
                          .find((item) => item.id === c);
                        return (
                          <option key={c} value={c}>
                            {condition?.name || c}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-600">
                  Emergency & Care Team
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Next of kin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.emergencyPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyPhone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>

                {/* Preview of personalized dashboard */}
                {formData.primaryCondition && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Your Personalized Dashboard Preview
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {getDashboardFeatures(formData.primaryCondition).map(
                        (feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-white text-teal-600 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper function to get dashboard features based on condition
const getDashboardFeatures = (condition) => {
  const features = {
    hypertension: [
      "BP Tracking",
      "Medication Reminders",
      "Low-Salt Diet",
      "Exercise Plans",
    ],
    "diabetes-type1": [
      "Glucose Tracking",
      "Insulin Calculator",
      "Carb Counting",
      "Foot Care",
    ],
    "diabetes-type2": [
      "Glucose Tracking",
      "Medication Reminders",
      "Diet Plans",
      "Weight Management",
    ],
    "sickle-cell": [
      "Crisis Prediction",
      "Pain Tracking",
      "Hydration Alerts",
      "Blood Transfusion",
    ],
    "breast-cancer": [
      "Self-Exam Reminders",
      "Mammogram Schedule",
      "Support Groups",
      "Treatment Tracker",
    ],
    "cervical-cancer": [
      "Pap Smear Reminders",
      "HPV Vaccine Info",
      "Symptom Tracker",
      "Treatment Options",
    ],
    "prostate-cancer": [
      "PSA Tracking",
      "Screening Schedule",
      "Treatment Tracker",
      "Support Groups",
    ],
    asthma: [
      "Peak Flow Tracking",
      "Trigger Alerts",
      "Inhaler Reminders",
      "Action Plan",
    ],
    allergies: [
      "Allergen Alerts",
      "EpiPen Expiry",
      "Restaurant Guide",
      "Emergency Protocol",
    ],
  };
  return (
    features[condition] || [
      "Health Tracking",
      "Reminders",
      "Education",
      "Support",
    ]
  );
};

export default Signup;
