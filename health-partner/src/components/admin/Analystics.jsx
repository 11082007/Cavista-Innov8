import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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

const Analytics = () => {
  const [dateRange, setDateRange] = useState("week");
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    diseaseTrends: [],
    hospitalPerformance: [],
    resourceUsage: [],
    emergencyCalls: [],
    aiDiagnosis: [],
  });

  useEffect(() => {
    // Load analytics data
    loadAnalyticsData();
  }, [dateRange]);

  const loadAnalyticsData = () => {
    // Mock data - in production, fetch from API
    setAnalyticsData({
      userGrowth: [
        { date: "Mon", newUsers: 45, activeUsers: 234 },
        { date: "Tue", newUsers: 52, activeUsers: 267 },
        { date: "Wed", newUsers: 48, activeUsers: 289 },
        { date: "Thu", newUsers: 61, activeUsers: 312 },
        { date: "Fri", newUsers: 55, activeUsers: 298 },
        { date: "Sat", newUsers: 38, activeUsers: 245 },
        { date: "Sun", newUsers: 29, activeUsers: 198 },
      ],
      diseaseTrends: [
        { name: "Hypertension", count: 5234, trend: "+12%" },
        { name: "Diabetes", count: 4321, trend: "+8%" },
        { name: "Sickle Cell", count: 2134, trend: "+5%" },
        { name: "Breast Cancer", count: 1234, trend: "+15%" },
        { name: "HIV/AIDS", count: 987, trend: "-2%" },
        { name: "Tuberculosis", count: 654, trend: "-5%" },
      ],
      hospitalPerformance: [
        { name: "LUTH", patients: 234, responseTime: 8, satisfaction: 94 },
        { name: "Gbagada", patients: 156, responseTime: 12, satisfaction: 87 },
        { name: "Ikeja", patients: 189, responseTime: 10, satisfaction: 91 },
        { name: "Isolo", patients: 98, responseTime: 15, satisfaction: 82 },
        { name: "Surulere", patients: 145, responseTime: 11, satisfaction: 89 },
      ],
      resourceUsage: [
        { name: "Blood Units", used: 2345, available: 12453 },
        { name: "ICU Beds", used: 345, available: 456 },
        { name: "Oxygen Masks", used: 567, available: 789 },
        { name: "Ventilators", used: 89, available: 234 },
      ],
      emergencyCalls: [
        { hour: "0-4", calls: 23 },
        { hour: "4-8", calls: 45 },
        { hour: "8-12", calls: 89 },
        { hour: "12-16", calls: 123 },
        { hour: "16-20", calls: 156 },
        { hour: "20-24", calls: 78 },
      ],
      aiDiagnosis: [
        { day: "Mon", count: 234, accuracy: 89 },
        { day: "Tue", count: 267, accuracy: 91 },
        { day: "Wed", count: 289, accuracy: 90 },
        { day: "Thu", count: 312, accuracy: 92 },
        { day: "Fri", count: 298, accuracy: 93 },
        { day: "Sat", count: 245, accuracy: 88 },
        { day: "Sun", count: 198, accuracy: 87 },
      ],
    });
  };

  const COLORS = [
    "#0d9488",
    "#f43f5e",
    "#8b5cf6",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
  ];

  const exportReport = () => {
    // Generate CSV report
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Metric,Value,Trend\n" +
      analyticsData.diseaseTrends
        .map((d) => `${d.name},${d.count},${d.trend}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vytal-analytics-${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Comprehensive platform metrics and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white">
          <p className="text-teal-100 text-sm">Total Users</p>
          <p className="text-3xl font-bold mt-2">15,234</p>
          <p className="text-teal-100 text-sm mt-1">↑ 12% from last period</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-blue-100 text-sm">Active Hospitals</p>
          <p className="text-3xl font-bold mt-2">156</p>
          <p className="text-blue-100 text-sm mt-1">↑ 8 new this month</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-purple-100 text-sm">AI Diagnoses</p>
          <p className="text-3xl font-bold mt-2">3,456</p>
          <p className="text-purple-100 text-sm mt-1">92% accuracy</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <p className="text-orange-100 text-sm">Emergency Calls</p>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-orange-100 text-sm mt-1">8 min avg response</p>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Growth & Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#0d9488"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#f43f5e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Disease Distribution & Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Disease Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.diseaseTrends}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analyticsData.diseaseTrends.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {analyticsData.diseaseTrends.map((disease, index) => (
              <div
                key={disease.name}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm">{disease.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">
                    {disease.count.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs ${
                      disease.trend.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {disease.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Hospital Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.hospitalPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#0d9488" />
                <Bar dataKey="satisfaction" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Usage Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.resourceUsage.map((resource) => (
            <div key={resource.name} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700">{resource.name}</h4>
              <div className="mt-2 flex justify-between items-baseline">
                <span className="text-2xl font-bold text-teal-600">
                  {resource.used}
                </span>
                <span className="text-sm text-gray-500">
                  / {resource.available}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full"
                  style={{
                    width: `${(resource.used / resource.available) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((resource.used / resource.available) * 100).toFixed(1)}%
                utilized
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Calls Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Calls by Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.emergencyCalls}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Diagnosis Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AI Diagnosis Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.aiDiagnosis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="count"
                stroke="#0d9488"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
