import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      category: "Main",
      items: [
        { path: "/dashboard", icon: "📊", label: "Dashboard" },
        { path: "/profile", icon: "👤", label: "Profile" },
        { path: "/notifications", icon: "🔔", label: "Notifications" },
      ],
    },
    {
      category: "Health",
      items: [
        { path: "/health-seeker", icon: "🏥", label: "Health Dashboard" },
        { path: "/health-seeker/bp-log", icon: "❤️", label: "Blood Pressure" },
        {
          path: "/health-seeker/glucose-log",
          icon: "🩸",
          label: "Blood Sugar",
        },
        { path: "/health-seeker/medication", icon: "💊", label: "Medications" },
      ],
    },
    {
      category: "Resources",
      items: [
        { path: "/marketplace", icon: "🏨", label: "Find Hospitals" },
        { path: "/health-seeker/blood-bank", icon: "🩸", label: "Blood Bank" },
        { path: "/health-seeker/medication", icon: "💊", label: "Rare Meds" },
        { path: "/health-seeker/insurance", icon: "📋", label: "Insurance" },
      ],
    },
    {
      category: "AI Services",
      items: [
        {
          path: "/health-seeker/ai-diagnosis",
          icon: "🤖",
          label: "AI Diagnosis",
        },
        {
          path: "/health-seeker/family-tree",
          icon: "🧬",
          label: "Family Tree",
        },
      ],
    },
  ];

  // Add role-specific items
  if (user?.role === "hospital" || user?.role === "hospital_admin") {
    menuItems.push({
      category: "Hospital",
      items: [
        { path: "/hospital", icon: "🏥", label: "Dashboard" },
        { path: "/hospital/inventory", icon: "📦", label: "Inventory" },
        { path: "/hospital/updates", icon: "📝", label: "Updates" },
        { path: "/hospital/alerts", icon: "🚨", label: "Emergency Alerts" },
      ],
    });
  }

  if (user?.role === "admin") {
    menuItems.push({
      category: "Admin",
      items: [
        { path: "/admin", icon: "⚙️", label: "Dashboard" },
        { path: "/admin/users", icon: "👥", label: "Users" },
        { path: "/admin/hospitals", icon: "🏥", label: "Hospitals" },
        { path: "/admin/analytics", icon: "📊", label: "Analytics" },
        { path: "/admin/health", icon: "❤️", label: "System Health" },
      ],
    });
  }

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4">
        {/* User Profile */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            {!collapsed && (
              <div>
                <p className="font-medium text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-teal-600"
        >
          {collapsed ? "→" : "←"}
        </button>

        {/* Navigation */}
        <div className="space-y-6">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              {!collapsed && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.category}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-teal-50 text-teal-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!collapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              localStorage.removeItem("userData");
              window.location.href = "/";
            }}
            className={`flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <span className="text-xl">🚪</span>
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
