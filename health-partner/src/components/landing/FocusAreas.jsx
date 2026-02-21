import { useState } from "react";
import { Link } from "react-router-dom";

const FocusAreas = () => {
  const [activeTab, setActiveTab] = useState("chronic");

  const categories = {
    chronic: {
      title: "Chronic Diseases",
      icon: "📋",
      color: "orange",
      conditions: [
        { name: "Hypertension", icon: "❤️", patients: "12K+", color: "red" },
        { name: "Diabetes", icon: "🩸", patients: "15K+", color: "blue" },
        { name: "Cancer", icon: "🎗️", patients: "8K+", color: "purple" },
        { name: "Tuberculosis", icon: "🫁", patients: "5K+", color: "yellow" },
      ],
    },
    genetic: {
      title: "Genetic Disorders",
      icon: "🧬",
      color: "purple",
      conditions: [
        { name: "Sickle Cell", icon: "🔴", patients: "7K+", color: "red" },
        { name: "Hemophilia", icon: "🩸", patients: "2K+", color: "blue" },
        { name: "Cystic Fibrosis", icon: "🫁", patients: "1K+", color: "teal" },
      ],
    },
    nonCommunicable: {
      title: "Non-Communicable Diseases",
      icon: "🏥",
      color: "emerald",
      conditions: [
        { name: "Cardiovascular", icon: "❤️", patients: "20K+", color: "red" },
        { name: "Respiratory", icon: "🫁", patients: "10K+", color: "blue" },
        { name: "Autoimmune", icon: "🛡️", patients: "4K+", color: "purple" },
      ],
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Specialized Care for{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Every Condition
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We focus on conditions that need continuous monitoring and quick
            access to resources
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === key
                  ? `bg-${category.color}-500 text-white shadow-lg`
                  : `bg-${category.color}-50 text-${category.color}-700 hover:bg-${category.color}-100`
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        {/* Conditions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories[activeTab].conditions.map((condition, i) => (
            <Link
              key={i}
              to={`/condition/${condition.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`text-4xl mb-4`}>{condition.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{condition.name}</h3>
              <div className="flex justify-between items-center">
                <span className={`text-${condition.color}-600 font-medium`}>
                  {condition.patients} patients
                </span>
                <span className="text-gray-400">→</span>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 bg-teal-50 text-teal-600 rounded-full text-xs">
                  Find Hospitals
                </span>
                <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                  Support Groups
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats for each condition */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">24/7</div>
              <div className="text-sm text-gray-600">Specialist Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">156</div>
              <div className="text-sm text-gray-600">Specialized Centers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">89%</div>
              <div className="text-sm text-gray-600">Medication Success</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
