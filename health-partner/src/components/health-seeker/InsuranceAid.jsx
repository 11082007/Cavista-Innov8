import { useState } from "react";

const InsuranceAid = () => {
  const [activeTab, setActiveTab] = useState("coverage");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const insurancePlans = [
    {
      id: 1,
      name: "NHIS Basic",
      provider: "National Health Insurance Scheme",
      type: "government",
      coverage: ["Outpatient care", "Inpatient care", "Maternity", "Emergency"],
      exclusions: ["Dental", "Optical", "Cosmetic surgery"],
      monthlyPremium: "₦15,000",
      annualLimit: "₦500,000",
      hospitals: 156,
      rating: 4.2,
    },
    {
      id: 2,
      name: "Hygeia HMO",
      provider: "Hygeia Health",
      type: "private",
      coverage: ["Full medical", "Dental", "Optical", "Maternity"],
      exclusions: ["Cosmetic surgery", "Experimental treatment"],
      monthlyPremium: "₦25,000",
      annualLimit: "₦2,000,000",
      hospitals: 234,
      rating: 4.5,
    },
    {
      id: 3,
      name: "AXA Mansard Care",
      provider: "AXA Mansard",
      type: "private",
      coverage: ["Comprehensive", "Dental", "Optical", "Wellness"],
      exclusions: ["Pre-existing conditions (6 months)"],
      monthlyPremium: "₦35,000",
      annualLimit: "₦5,000,000",
      hospitals: 312,
      rating: 4.7,
    },
  ];

  const financialAid = [
    {
      id: 1,
      name: "Sickle Cell Foundation Grant",
      provider: "SCF Nigeria",
      amount: "₦100,000 - ₦500,000",
      eligibility: ["Sickle Cell patients", "Low income"],
      deadline: "2024-03-31",
      type: "grant",
    },
    {
      id: 2,
      name: "Cancer Treatment Support",
      provider: "Seeds of Hope",
      amount: "Up to ₦1,000,000",
      eligibility: ["Cancer patients", "Undergoing treatment"],
      deadline: "2024-04-15",
      type: "grant",
    },
    {
      id: 3,
      name: "Diabetes Care Fund",
      provider: "Diabetes Association",
      amount: "₦50,000 - ₦200,000",
      eligibility: ["Type 1 Diabetes", "Children under 18"],
      deadline: "2024-03-30",
      type: "grant",
    },
  ];

  const hospitalsWithPayLater = [
    {
      name: "Lagos University Teaching Hospital",
      lga: "Ikeja",
      options: ["Pay Later (30 days)", "Installment Plan", "NGO Support"],
      contact: "+234 802 345 6789",
    },
    {
      name: "Gbagada General Hospital",
      lga: "Kosofe",
      options: ["Pay Later (14 days)", "NHIS", "Red Cross Support"],
      contact: "+234 803 456 7890",
    },
    {
      name: "St. Nicholas Hospital",
      lga: "Lagos Island",
      options: ["Installment Plan", "Medical Loan", "Insurance"],
      contact: "+234 804 567 8901",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          📋 Insurance & Financial Aid
        </h1>
        <p className="text-blue-100">
          Find coverage options and financial support for your healthcare
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8">
        {[
          { id: "coverage", label: "Insurance Plans", icon: "📋" },
          { id: "aid", label: "Financial Aid", icon: "🤝" },
          { id: "paylater", label: "Pay Later Options", icon: "💳" },
          { id: "ngo", label: "NGO Support", icon: "❤️" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Insurance Plans */}
      {activeTab === "coverage" && (
        <div className="space-y-6">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h2>
                    <p className="text-blue-600 mt-1">{plan.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Monthly Premium</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {plan.monthlyPremium}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ✅ Covered Services
                    </h3>
                    <ul className="space-y-2">
                      {plan.coverage.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ❌ Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {plan.exclusions.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <span className="text-red-500 mr-2">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Annual Limit</p>
                    <p className="font-semibold">{plan.annualLimit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Partner Hospitals</p>
                    <p className="font-semibold">{plan.hospitals}+</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-semibold text-yellow-500">
                      ⭐ {plan.rating}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Now
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Compare Plans
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Financial Aid */}
      {activeTab === "aid" && (
        <div className="space-y-6">
          {financialAid.map((aid) => (
            <div
              key={aid.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-green-200 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {aid.name}
                  </h2>
                  <p className="text-green-600 mt-1">{aid.provider}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {aid.type}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-semibold text-green-600">{aid.amount}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="font-semibold">
                    {new Date(aid.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Eligibility</p>
                  <p className="font-semibold">
                    {aid.eligibility.length}+ criteria
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Eligibility Requirements:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {aid.eligibility.map((req, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-4 w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Apply for Assistance
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pay Later Options */}
      {activeTab === "paylater" && (
        <div className="space-y-6">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              💳 How Pay Later Works
            </h3>
            <p className="text-yellow-700">
              Get treatment now and pay within 30-60 days. Interest-free for
              qualified patients.
            </p>
          </div>

          {hospitalsWithPayLater.map((hospital, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-yellow-200 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {hospital.name}
                  </h3>
                  <p className="text-gray-600">{hospital.lga}</p>
                </div>
                <a
                  href={`tel:${hospital.contact}`}
                  className="text-yellow-600 font-medium"
                >
                  📞 {hospital.contact}
                </a>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Available Options:
                </p>
                <div className="flex flex-wrap gap-2">
                  {hospital.options.map((option, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                Apply for Pay Later
              </button>
            </div>
          ))}

          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need Emergency Care?</h3>
            <p className="mb-4">
              We can help you find immediate treatment options
            </p>
            <button className="px-6 py-3 bg-white text-yellow-600 rounded-lg font-semibold hover:bg-gray-100">
              Get Emergency Assistance
            </button>
          </div>
        </div>
      )}

      {/* NGO Support */}
      {activeTab === "ngo" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Red Cross Nigeria</h3>
              <p className="text-gray-600 mb-4">
                Emergency assistance, blood donation, disaster relief
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm">📞 +234 800 123 4567</p>
                <p className="text-sm">✉️ support@redcross.ng</p>
              </div>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Contact NGO
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🎗️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seeds of Hope</h3>
              <p className="text-gray-600 mb-4">
                Cancer support, treatment funding, counseling
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm">📞 +234 800 234 5678</p>
                <p className="text-sm">✉️ help@seedsofhope.ng</p>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Contact NGO
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🔴</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sickle Cell Foundation
              </h3>
              <p className="text-gray-600 mb-4">
                Treatment support, counseling, advocacy
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm">📞 +234 800 345 6789</p>
                <p className="text-sm">✉️ info@sicklecellfoundation.ng</p>
              </div>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Contact NGO
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Diabetes Association
              </h3>
              <p className="text-gray-600 mb-4">
                Education, screening, medication support
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm">📞 +234 800 456 7890</p>
                <p className="text-sm">✉️ contact@diabetesassociation.ng</p>
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Contact NGO
              </button>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">
              🤝 Apply for NGO Assistance
            </h3>
            <p className="text-purple-700 mb-4">
              Fill out one application to apply to multiple NGOs
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceAid;
