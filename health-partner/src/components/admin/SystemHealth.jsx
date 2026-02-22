import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SystemHealth = () => {
  const [healthMetrics, setHealthMetrics] = useState({
    cpu: 45,
    memory: 62,
    storage: 78,
    apiLatency: 234,
    activeConnections: 1245,
    errorRate: 0.23,
    uptime: "99.98%",
    lastBackup: "2024-01-15 03:00 AM",
  });

  const [services, setServices] = useState([
    {
      name: "API Gateway",
      status: "operational",
      latency: "45ms",
      uptime: "99.99%",
    },
    {
      name: "Database",
      status: "operational",
      latency: "23ms",
      uptime: "100%",
    },
    {
      name: "Authentication",
      status: "operational",
      latency: "67ms",
      uptime: "99.98%",
    },
    {
      name: "AI Service",
      status: "degraded",
      latency: "234ms",
      uptime: "99.95%",
    },
    {
      name: "Notification Service",
      status: "operational",
      latency: "89ms",
      uptime: "99.97%",
    },
    {
      name: "WebSocket Server",
      status: "operational",
      latency: "34ms",
      uptime: "99.99%",
    },
    {
      name: "WhatsApp Bot",
      status: "operational",
      latency: "123ms",
      uptime: "99.96%",
    },
    {
      name: "USSD Gateway",
      status: "maintenance",
      latency: "N/A",
      uptime: "99.90%",
    },
  ]);

  const [performanceData, setPerformanceData] = useState([
    { time: "00:00", responseTime: 120, errorRate: 0.1 },
    { time: "02:00", responseTime: 98, errorRate: 0.05 },
    { time: "04:00", responseTime: 87, errorRate: 0.03 },
    { time: "06:00", responseTime: 145, errorRate: 0.15 },
    { time: "08:00", responseTime: 234, errorRate: 0.25 },
    { time: "10:00", responseTime: 267, errorRate: 0.28 },
    { time: "12:00", responseTime: 289, errorRate: 0.32 },
    { time: "14:00", responseTime: 278, errorRate: 0.3 },
    { time: "16:00", responseTime: 256, errorRate: 0.27 },
    { time: "18:00", responseTime: 245, errorRate: 0.24 },
    { time: "20:00", responseTime: 198, errorRate: 0.18 },
    { time: "22:00", responseTime: 156, errorRate: 0.12 },
  ]);

  const [logs, setLogs] = useState([
    {
      timestamp: "2024-01-15 14:32:45",
      level: "info",
      service: "API",
      message: "Request processed successfully",
    },
    {
      timestamp: "2024-01-15 14:31:22",
      level: "warning",
      service: "Database",
      message: "Slow query detected (2.3s)",
    },
    {
      timestamp: "2024-01-15 14:30:15",
      level: "error",
      service: "AI",
      message: "Model inference timeout",
    },
    {
      timestamp: "2024-01-15 14:28:56",
      level: "info",
      service: "Auth",
      message: "User login successful",
    },
    {
      timestamp: "2024-01-15 14:25:34",
      level: "info",
      service: "Notification",
      message: "Push notification sent",
    },
  ]);

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setHealthMetrics((prev) => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 55,
        activeConnections: Math.floor(Math.random() * 500) + 1000,
        errorRate: Number((Math.random() * 0.3).toFixed(2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-700";
      case "degraded":
        return "bg-yellow-100 text-yellow-700";
      case "maintenance":
        return "bg-blue-100 text-blue-700";
      case "down":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return "✅";
      case "degraded":
        return "⚠️";
      case "maintenance":
        return "🔧";
      case "down":
        return "❌";
      default:
        return "❓";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
          <p className="text-gray-600 mt-1">
            Monitor platform performance and services
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded"
            />
            <span className="text-sm text-gray-600">Auto-refresh (5s)</span>
          </label>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            🔄 Refresh Now
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">CPU Usage</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {healthMetrics.cpu}%
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                healthMetrics.cpu < 50
                  ? "bg-green-100"
                  : healthMetrics.cpu < 75
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                healthMetrics.cpu < 50
                  ? "bg-green-500"
                  : healthMetrics.cpu < 75
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${healthMetrics.cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Memory Usage</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {healthMetrics.memory}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💾</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${healthMetrics.memory}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Storage</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {healthMetrics.storage}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💽</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${healthMetrics.storage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Error Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {healthMetrics.errorRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${healthMetrics.errorRate * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
          <p className="text-sm text-teal-600">API Latency</p>
          <p className="text-2xl font-bold text-teal-700">
            {healthMetrics.apiLatency}ms
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-600">Active Connections</p>
          <p className="text-2xl font-bold text-blue-700">
            {healthMetrics.activeConnections}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <p className="text-sm text-green-600">Uptime</p>
          <p className="text-2xl font-bold text-green-700">
            {healthMetrics.uptime}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <p className="text-sm text-purple-600">Last Backup</p>
          <p className="text-2xl font-bold text-purple-700 text-sm">
            {healthMetrics.lastBackup}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Performance Metrics (24h)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="responseTime"
                stroke="#0d9488"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="errorRate"
                stroke="#f43f5e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Services Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className={`p-4 rounded-lg border-2 ${
                service.status === "operational"
                  ? "border-green-200 bg-green-50"
                  : service.status === "degraded"
                    ? "border-yellow-200 bg-yellow-50"
                    : service.status === "maintenance"
                      ? "border-blue-200 bg-blue-50"
                      : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)} {service.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{service.latency}</p>
                  <p className="text-xs text-gray-500">{service.uptime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent System Logs</h3>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg font-mono text-sm"
            >
              <span className="text-gray-400">{log.timestamp}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  log.level === "error"
                    ? "bg-red-100 text-red-700"
                    : log.level === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {log.level}
              </span>
              <span className="text-gray-600">[{log.service}]</span>
              <span className="text-gray-800">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg">
          🔄 Restart All Services
        </button>
        <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg">
          💾 Trigger Backup Now
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg">
          📊 Download System Report
        </button>
      </div>
    </div>
  );
};

export default SystemHealth;
