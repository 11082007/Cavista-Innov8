import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
// import { vytalDB } from "./db/indexedDB";
import { vytalDB } from "./components/db/indexedDB";
import { syncService } from "./components/db/syncService";
// import { syncService } from "./db/syncService";
// import { notificationService } from "./services/notificationService";
import { notificationService } from "./components/services/notificationService";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Landing Components
import Landing from "./components/landing/Landing";
import FocusAreas from "./components/landing/FocusAreas";

// Health Seeker Components
import HealthSeekerDashboard from "./components/health-seeker/HealthSeekerDashboard";
import EmergencyResponse from "./components/health-seeker/EmergencyResponse";
import FindMedication from "./components/health-seeker/FindMedication";
import InsuranceAid from "./components/health-seeker/InsuranceAid";
import ResourceHub from "./components/health-seeker/ResourceHub";
import AIDiagnosis from "./components/health-seeker/AIDiagnosis";
// import NearbyHospitals from "./components/health-seeker/NearbyHospitals";
import NearbyHospitals from "./components/NearbyHospitals";
// import FamilyTree from "./components/health-seeker/FamilyTree";
import FamilyTree from "./components/health-seeker/FamilyTree";

// Hospital Components
import HospitalDashboard from "./components/hospital/HospitalDashboard";
import UpdateInventory from "./components/hospital/UpdateInventory";
import ResourceManagement from "./components/hospital/ResourceManagement";
import EmergencyAlerts from "./components/hospital/EmergencyAlerts";

// Admin Components
import SystemAdminDashboard from "./components/admin/SystemAdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import HospitalVerification from "./components/admin/HospitalVerification";
// import Analytics from "./components/admin/Analytics";
import Analytics from "./components/admin/Analystics";
import SystemHealth from "./components/admin/SystemHealth";

// Dashboard Components
import HypertensionDashboard from "./components/dashboards/HypertensionDashboard";
// import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";
import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";

// Marketplace Components
import Marketplace from "./components/Marketplace";
import HospitalCard from "./components/HospitalCard";
import HospitalMap from "./components/HospitalMap";
import HospitalTable from "./components/HospitalTable";

// Common Components
import Navbar from "./components/common/Navbar";
import ProtectedRoute, {
  PatientRoute,
  HospitalRoute,
  AdminRoute,
} from "./components/common/ProtectedRoute";
import OfflineBanner from "./components/OfflineBanner";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem("vytalUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // Initialize database
    vytalDB.initDB();

    // Network status listeners
    const handleOnline = () => {
      setIsOnline(true);
      notificationService.sendNotification("📶 Connection Restored", {
        body: "Syncing your health data...",
      });
      syncService.syncNow();
    };

    const handleOffline = () => {
      setIsOnline(false);
      notificationService.sendNotification("📴 Offline Mode", {
        body: "You are offline. Changes will sync when connection returns.",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check sync status periodically
    const interval = setInterval(async () => {
      const status = await syncService.getSyncStatus();
      setPendingSync(status.pendingCount);
    }, 30000);

    // Request notification permission
    notificationService.requestPermission();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vytalUser");
    setUser(null);
    notificationService.sendNotification("👋 Goodbye!", {
      body: "You have been logged out successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading VYTAL...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        {/* Offline Banner */}
        <OfflineBanner isOnline={isOnline} pendingCount={pendingSync} />

        {/* Navbar - only show on certain routes */}
        {!window.location.pathname.includes("/auth") &&
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/signup") && (
            <Navbar user={user} onLogout={handleLogout} />
          )}

        {/* Main Content */}
        <div className={window.location.pathname === "/" ? "" : "pt-16"}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/focus-areas" element={<FocusAreas />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />

            {/* Health Seeker Routes */}
            <Route
              path="/health-seeker"
              element={
                <PatientRoute>
                  <HealthSeekerDashboard />
                </PatientRoute>
              }
            >
              <Route path="emergency" element={<EmergencyResponse />} />
              <Route path="medication" element={<FindMedication />} />
              <Route path="insurance" element={<InsuranceAid />} />
              <Route path="resources" element={<ResourceHub />} />
              <Route path="ai-diagnosis" element={<AIDiagnosis />} />
              <Route path="nearby" element={<NearbyHospitals />} />
              <Route path="family-tree" element={<FamilyTree />} />
              <Route path="bp-log" element={<HypertensionDashboard />} />
              <Route path="glucose-log" element={<DiabetesDashboard />} />
            </Route>

            {/* Hospital Routes */}
            <Route
              path="/hospital"
              element={
                <HospitalRoute>
                  <HospitalDashboard />
                </HospitalRoute>
              }
            >
              <Route path="inventory" element={<UpdateInventory />} />
              <Route path="resources" element={<ResourceManagement />} />
              <Route path="alerts" element={<EmergencyAlerts />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <SystemAdminDashboard />
                </AdminRoute>
              }
            >
              <Route path="users" element={<UserManagement />} />
              <Route path="verifications" element={<HospitalVerification />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="health" element={<SystemHealth />} />
            </Route>

            {/* Marketplace Routes */}
            <Route
              path="/marketplace"
              element={<Marketplace userConditions={user?.conditions} />}
            />
            <Route path="/hospital/:id" element={<HospitalCard />} />
            <Route path="/map" element={<HospitalMap />} />
            <Route path="/hospitals" element={<HospitalTable />} />

            {/* Disease-specific dashboards */}
            <Route
              path="/dashboard/hypertension"
              element={
                <PatientRoute>
                  <HypertensionDashboard />
                </PatientRoute>
              }
            />
            <Route
              path="/dashboard/diabetes"
              element={
                <PatientRoute>
                  <DiabetesDashboard />
                </PatientRoute>
              }
            />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
