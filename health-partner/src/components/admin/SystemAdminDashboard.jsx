import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SystemAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("week");
  const [stats, setStats] = useState({
    totalUsers: 15234,
    activeUsers: 8923,
    totalHospitals: 156,
    verifiedHospitals: 142,
    pendingVerifications: 14,
    totalPatients: 14321,
    totalDoctors: 913,
    emergencyCalls: 3456,
    ambulances: 89,
    bloodUnits: 12453,
    rareMedications: 234,
    icuBeds: 456,
    oxygenMasks: 789,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      user: "LUTH Admin",
      action: "Updated blood inventory",
      time: "2 mins ago",
      type: "update",
    },
    {
      id: 2,
      user: "Dr. Adeleke",
      action: "New patient registered",
      time: "5 mins ago",
      type: "patient",
    },
    {
      id: 3,
      user: "Gbagada Hospital",
      action: "Requested ambulance",
      time: "10 mins ago",
      type: "emergency",
    },
    {
      id: 4,
      user: "System",
      action: "AI analysis completed",
      time: "15 mins ago",
      type: "ai",
    },
    {
      id: 5,
      user: "New User",
      action: "Signed up - Sickle Cell",
      time: "20 mins ago",
      type: "signup",
    },
  ]);

  const userGrowthData = [
    { month: "Jan", users: 12000 },
    { month: "Feb", users: 13500 },
    { month: "Mar", users: 14200 },
    { month: "Apr", users: 14800 },
    { month: "May", users: 15100 },
    { month: "Jun", users: 15234 },
  ];

  const diseaseDistribution = [
    { name: "Hypertension", value: 5234, color: "#ef4444" },
    { name: "Diabetes", value: 4321, color: "#3b82f6" },
    { name: "Sickle Cell", value: 2134, color: "#8b5cf6" },
    { name: "Cancer", value: 1234, color: "#ec4899" },
    { name: "HIV/AIDS", value: 987, color: "#f59e0b" },
    { name: "Tuberculosis", value: 654, color: "#10b981" },
  ];

  const hospitalActivity = [
    { name: "LUTH", blood: 45, icu: 12, patients: 234 },
    { name: "Gbagada", blood: 23, icu: 5, patients: 156 },
    { name: "Ikeja", blood: 34, icu: 8, patients: 189 },
    { name: "Isolo", blood: 12, icu: 3, patients: 98 },
    { name: "Surulere", blood: 28, icu: 6, patients: 145 },
  ];

  const menuItems = [
    {
      category: "Overview",
      icon: "📊",
      items: [
        { name: "Dashboard", path: "overview", icon: "📈" },
        { name: "Analytics", path: "analytics", icon: "📉" },
        { name: "Reports", path: "reports", icon: "📑" },
      ],
    },
    {
      category: "User Management",
      icon: "👥",
      items: [
        {
          name: "All Users",
          path: "users",
          icon: "👤",
          count: stats.totalUsers,
        },
        {
          name: "Patients",
          path: "patients",
          icon: "🏥",
          count: stats.totalPatients,
        },
        {
          name: "Hospitals",
          path: "hospitals",
          icon: "🏨",
          count: stats.totalHospitals,
        },
        {
          name: "Doctors",
          path: "doctors",
          icon: "👨‍⚕️",
          count: stats.totalDoctors,
        },
      ],
    },
    {
      category: "Verification",
      icon: "✅",
      items: [
        {
          name: "Pending Verifications",
          path: "verifications",
          icon: "⏳",
          count: stats.pendingVerifications,
        },
        { name: "Hospital Applications", path: "applications", icon: "📝" },
        { name: "Document Reviews", path: "documents", icon: "📄" },
      ],
    },
    {
      category: "Resources",
      icon: "🏥",
      items: [
        {
          name: "Blood Bank",
          path: "blood",
          icon: "🩸",
          count: stats.bloodUnits,
        },
        {
          name: "Rare Medications",
          path: "medications",
          icon: "💊",
          count: stats.rareMedications,
        },
        { name: "ICU Beds", path: "icu", icon: "🏥", count: stats.icuBeds },
        {
          name: "Oxygen Supply",
          path: "oxygen",
          icon: "💨",
          count: stats.oxygenMasks,
        },
        {
          name: "Ambulances",
          path: "ambulances",
          icon: "🚑",
          count: stats.ambulances,
        },
      ],
    },
    {
      category: "System",
      icon: "⚙️",
      items: [
        { name: "AI Monitoring", path: "ai", icon: "🤖" },
        { name: "Notifications", path: "notifications", icon: "🔔" },
        { name: "Logs", path: "logs", icon: "📋" },
        { name: "Backup", path: "backup", icon: "💾" },
        { name: "Settings", path: "settings", icon: "⚙️" },
      ],
    },
    {
      category: "Integrations",
      icon: "🔌",
      items: [
        { name: "WhatsApp Bot", path: "whatsapp", icon: "📱" },
        { name: "USSD Service", path: "ussd", icon: "📞" },
        { name: "Voice Prompts", path: "voice", icon: "🗣️" },
        { name: "Gemini AI", path: "gemini", icon: "🧠" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">vytal</span>
              <span className="text-xs text-teal-600 block">System Admin</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-4 text-white mb-6">
            <div className="text-2xl font-bold">
              {stats.activeUsers.toLocaleString()}
            </div>
            <div className="text-sm text-teal-100">Active Users Today</div>
            <div className="mt-2 text-xs">↑ 12% from yesterday</div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            {menuItems.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">{section.icon}</span>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.category}
                  </p>
                </div>
                <div className="space-y-1">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500">{item.icon}</span>
                        <span className="text-sm text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      {item.count && (
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-600 rounded-full text-xs">
                          {item.count.toLocaleString()}
                        </span>
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
      <div className="flex-1 ml-80 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              System Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor the entire VYTAL platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">superadmin@vytal.com</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center">
                <span className="text-teal-700 font-bold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-2">↑ 234 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Hospitals</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalHospitals}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  {stats.verifiedHospitals} verified
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Emergency Calls</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.emergencyCalls}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  ↑ 45% from yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚑</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">AI Analyses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">3,456</p>
                <p className="text-xs text-purple-600 mt-2">Today: 234</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#0d9488"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Disease Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Disease Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {diseaseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hospital Activity Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold mb-4">Hospital Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Hospital
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Blood Units
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    ICU Beds
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Patients
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {hospitalActivity.map((hospital, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{hospital.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          hospital.blood > 30
                            ? "bg-green-100 text-green-700"
                            : hospital.blood > 15
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {hospital.blood} units
                      </span>
                    </td>
                    <td className="py-3 px-4">{hospital.icu} beds</td>
                    <td className="py-3 px-4">{hospital.patients}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-teal-600 hover:text-teal-700 text-sm mr-3">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "update"
                        ? "bg-blue-100"
                        : activity.type === "patient"
                          ? "bg-green-100"
                          : activity.type === "emergency"
                            ? "bg-red-100"
                            : activity.type === "ai"
                              ? "bg-purple-100"
                              : "bg-yellow-100"
                    }`}
                  >
                    <span
                      className={
                        activity.type === "update"
                          ? "text-blue-600"
                          : activity.type === "patient"
                            ? "text-green-600"
                            : activity.type === "emergency"
                              ? "text-red-600"
                              : activity.type === "ai"
                                ? "text-purple-600"
                                : "text-yellow-600"
                      }
                    >
                      {activity.type === "update"
                        ? "📝"
                        : activity.type === "patient"
                          ? "👤"
                          : activity.type === "emergency"
                            ? "🚨"
                            : activity.type === "ai"
                              ? "🤖"
                              : "✓"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
