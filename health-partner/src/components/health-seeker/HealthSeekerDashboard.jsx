import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserConditions } from "../../JS/utils";

const HealthSeekerDashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCondition, setActiveCondition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setUser(userData);
    setActiveCondition(userData.primaryCondition || userData.conditions?.[0]);
  }, []);

  const menuItems = [
    {
      category: "Emergency",
      icon: "🚨",
      items: [
        {
          icon: "🚑",
          name: "Emergency Response",
          path: "emergency",
          description: "Nearest ambulances & ER",
          color: "red",
        },
        {
          icon: "📍",
          name: "Nearby Hospitals",
          path: "nearby",
          description: "Find hospitals near you",
          color: "blue",
        },
      ],
    },
    {
      category: "My Health",
      icon: "📊",
      items: [
        {
          icon: "❤️",
          name: "Blood Pressure",
          path: "bp-log",
          description: "Track your BP",
          condition: "hypertension",
          color: "red",
        },
        {
          icon: "🩸",
          name: "Blood Sugar",
          path: "glucose-log",
          description: "Track your glucose",
          condition: "diabetes",
          color: "blue",
        },
        {
          icon: "🔴",
          name: "Sickle Cell",
          path: "sickle-cell",
          description: "Pain & crisis tracking",
          condition: "sickle-cell",
          color: "purple",
        },
        {
          icon: "🎗️",
          name: "Cancer Care",
          path: "cancer",
          description: "Treatment & screening",
          condition: "cancer",
          color: "pink",
        },
      ],
    },
    {
      category: "Resources",
      icon: "🏥",
      items: [
        {
          icon: "💊",
          name: "Find Medication",
          path: "medication",
          description: "Rare drugs & treatments",
          color: "green",
        },
        {
          icon: "🩸",
          name: "Blood Bank",
          path: "blood-bank",
          description: "Real-time blood availability",
          color: "red",
        },
        {
          icon: "🐍",
          name: "Anti-venom",
          path: "antivenom",
          description: "Hospitals with anti-venom",
          color: "purple",
        },
        {
          icon: "💨",
          name: "Oxygen",
          path: "oxygen",
          description: "Oxygen & ICU beds",
          color: "blue",
        },
      ],
    },
    {
      category: "AI Services",
      icon: "🤖",
      items: [
        {
          icon: "🔍",
          name: "AI Diagnosis",
          path: "ai-diagnosis",
          description: "Symptom checker",
          color: "teal",
        },
        {
          icon: "🧬",
          name: "Family Tree",
          path: "family-tree",
          description: "Genetic risk calculator",
          color: "purple",
        },
        {
          icon: "📋",
          name: "Insurance Aid",
          path: "insurance",
          description: "Coverage & support",
          color: "green",
        },
      ],
    },
    {
      category: "Reminders",
      icon: "🔔",
      items: [
        {
          icon: "🎀",
          name: "Pap Smear",
          path: "pap-smear",
          description: "Cervical cancer screening",
          condition: "female",
          color: "pink",
        },
        {
          icon: "👨",
          name: "PSA Test",
          path: "psa",
          description: "Prostate screening",
          condition: "male",
          color: "blue",
        },
        {
          icon: "🫁",
          name: "Mammogram",
          path: "mammogram",
          description: "Breast cancer screening",
          condition: "female",
          color: "pink",
        },
      ],
    },
  ];

  // Filter menu items based on user's conditions
  const filteredMenuItems = menuItems
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        // If item has condition requirement, check if user has it
        if (item.condition) {
          if (item.condition === "female") return user?.gender === "female";
          if (item.condition === "male") return user?.gender === "male";
          return user?.conditions?.includes(item.condition);
        }
        return true;
      }),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-80" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 fixed h-full overflow-y-auto`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              {sidebarOpen && (
                <span className="font-bold text-gray-900">vytal</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-gray-600"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          </div>

          {/* User Profile */}
          {sidebarOpen && user && (
            <div className="mb-6 p-4 bg-teal-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 text-xl">
                    {user.fullName?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-teal-600">
                    {activeCondition?.replace("-", " ") || "Preventive Care"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="space-y-6">
            {filteredMenuItems.map((section, idx) => (
              <div key={idx}>
                {sidebarOpen && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{section.icon}</span>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section.category}
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        sidebarOpen ? "justify-start" : "justify-center"
                      } ${
                        location.pathname.includes(item.path)
                          ? `bg-${item.color}-50 text-${item.color}-600`
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className={`text-xl text-${item.color}-500`}>
                        {item.icon}
                      </span>
                      {sidebarOpen && (
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? "ml-80" : "ml-20"} transition-all duration-300`}
      >
        <Outlet context={{ user, activeCondition }} />
      </div>
    </div>
  );
};

export default HealthSeekerDashboard;
