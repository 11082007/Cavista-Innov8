import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const HospitalDashboard = () => {
  const [hospital] = useState({
    name: "Lagos University Teaching Hospital",
    verified: true,
    lastUpdate: "2 mins ago",
  });

  const menuItems = [
    {
      category: "Resource Management",
      items: [
        {
          icon: "📦",
          name: "Update Inventory",
          path: "inventory",
          description: "Blood, beds, oxygen",
        },
        {
          icon: "🚑",
          name: "Emergency Alerts",
          path: "alerts",
          description: "Respond to emergencies",
        },
        {
          icon: "💊",
          name: "Rare Medications",
          path: "rare-meds",
          description: "Anti-venom, special drugs",
        },
      ],
    },
    {
      category: "Operations",
      items: [
        {
          icon: "📊",
          name: "Analytics",
          path: "analytics",
          description: "Resource usage trends",
        },
        {
          icon: "👥",
          name: "Patient Queue",
          path: "queue",
          description: "Current wait times",
        },
        {
          icon: "📋",
          name: "Reports",
          path: "reports",
          description: "Daily/Weekly reports",
        },
      ],
    },
    {
      category: "Communication",
      items: [
        {
          icon: "📱",
          name: "WhatsApp Updates",
          path: "whatsapp",
          description: "Send bulk updates",
        },
        {
          icon: "🔔",
          name: "Notifications",
          path: "notifications",
          description: "Smart alerts",
        },
        {
          icon: "📍",
          name: "Ambulance Tracking",
          path: "ambulance",
          description: "Track fleet",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hospital Header */}
      <div className="bg-white border-b border-teal-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {hospital.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                  <span className="text-xs text-gray-400">
                    Updated {hospital.lastUpdate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                🚑 Emergency Alert
              </button>
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600">🏥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-100">
            <div className="text-sm text-gray-500">Blood Units</div>
            <div className="text-2xl font-bold text-red-600">42</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-100">
            <div className="text-sm text-gray-500">ICU Beds</div>
            <div className="text-2xl font-bold text-teal-600">8/15</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-100">
            <div className="text-sm text-gray-500">Oxygen Masks</div>
            <div className="text-2xl font-bold text-blue-600">34</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-100">
            <div className="text-sm text-gray-500">Rare Meds</div>
            <div className="text-2xl font-bold text-purple-600">12</div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white rounded-xl shadow-sm border border-teal-100 p-4">
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.category}
                </p>
                <div className="space-y-1">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
