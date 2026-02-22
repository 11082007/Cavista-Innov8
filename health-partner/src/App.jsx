// // // // import {
// // // //   BrowserRouter as Router,
// // // //   Routes,
// // // //   Route,
// // // //   Navigate,
// // // // } from "react-router-dom";
// // // // import { useState, useEffect } from "react";
// // // // // import { vytalDB } from "./db/indexedDB";
// // // // import { vytalDB } from "./components/db/indexedDB";
// // // // import { syncService } from "./components/db/syncService";
// // // // // import { syncService } from "./db/syncService";
// // // // // import { notificationService } from "./services/notificationService";
// // // // import { notificationService } from "./components/services/notificationService";

// // // // // Auth Components
// // // // import Login from "./components/auth/Login";
// // // // import Signup from "./components/auth/Signup";

// // // // // Landing Components
// // // // import Landing from "./components/landing/Landing";
// // // // import FocusAreas from "./components/landing/FocusAreas";

// // // // // Health Seeker Components
// // // // import HealthSeekerDashboard from "./components/health-seeker/HealthSeekerDashboard";
// // // // import EmergencyResponse from "./components/health-seeker/EmergencyResponse";
// // // // import FindMedication from "./components/health-seeker/FindMedication";
// // // // import InsuranceAid from "./components/health-seeker/InsuranceAid";
// // // // import ResourceHub from "./components/health-seeker/ResourceHub";
// // // // import AIDiagnosis from "./components/health-seeker/AIDiagnosis";
// // // // // import NearbyHospitals from "./components/health-seeker/NearbyHospitals";
// // // // import NearbyHospitals from "./components/NearbyHospitals";
// // // // // import FamilyTree from "./components/health-seeker/FamilyTree";
// // // // import FamilyTree from "./components/health-seeker/FamilyTree";

// // // // // Hospital Components
// // // // import HospitalDashboard from "./components/hospital/HospitalDashboard";
// // // // import UpdateInventory from "./components/hospital/UpdateInventory";
// // // // import ResourceManagement from "./components/hospital/ResourceManagement";
// // // // import EmergencyAlerts from "./components/hospital/EmergencyAlerts";

// // // // // Admin Components
// // // // import SystemAdminDashboard from "./components/admin/SystemAdminDashboard";
// // // // import UserManagement from "./components/admin/UserManagement";
// // // // import HospitalVerification from "./components/admin/HospitalVerification";
// // // // // import Analytics from "./components/admin/Analytics";
// // // // import Analytics from "./components/admin/Analystics";
// // // // import SystemHealth from "./components/admin/SystemHealth";

// // // // // Dashboard Components
// // // // import HypertensionDashboard from "./components/dashboards/HypertensionDashboard";
// // // // // import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";
// // // // import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";

// // // // // Marketplace Components
// // // // import Marketplace from "./components/Marketplace";
// // // // import HospitalCard from "./components/HospitalCard";
// // // // import HospitalMap from "./components/HospitalMap";
// // // // import HospitalTable from "./components/HospitalTable";

// // // // // Common Components
// // // // import Navbar from "./components/common/Navbar";
// // // // import ProtectedRoute, {
// // // //   PatientRoute,
// // // //   HospitalRoute,
// // // //   AdminRoute,
// // // // } from "./components/common/ProtectedRoute";
// // // // import OfflineBanner from "./components/OfflineBanner";

// // // // function App() {
// // // //   const [isOnline, setIsOnline] = useState(navigator.onLine);
// // // //   const [user, setUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [pendingSync, setPendingSync] = useState(0);

// // // //   useEffect(() => {
// // // //     // Check for logged in user
// // // //     const storedUser = localStorage.getItem("vytalUser");
// // // //     if (storedUser) {
// // // //       setUser(JSON.parse(storedUser));
// // // //     }
// // // //     setLoading(false);

// // // //     // Initialize database
// // // //     vytalDB.initDB();

// // // //     // Network status listeners
// // // //     const handleOnline = () => {
// // // //       setIsOnline(true);
// // // //       notificationService.sendNotification("📶 Connection Restored", {
// // // //         body: "Syncing your health data...",
// // // //       });
// // // //       syncService.syncNow();
// // // //     };

// // // //     const handleOffline = () => {
// // // //       setIsOnline(false);
// // // //       notificationService.sendNotification("📴 Offline Mode", {
// // // //         body: "You are offline. Changes will sync when connection returns.",
// // // //       });
// // // //     };

// // // //     window.addEventListener("online", handleOnline);
// // // //     window.addEventListener("offline", handleOffline);

// // // //     // Check sync status periodically
// // // //     const interval = setInterval(async () => {
// // // //       const status = await syncService.getSyncStatus();
// // // //       setPendingSync(status.pendingCount);
// // // //     }, 30000);

// // // //     // Request notification permission
// // // //     notificationService.requestPermission();

// // // //     return () => {
// // // //       window.removeEventListener("online", handleOnline);
// // // //       window.removeEventListener("offline", handleOffline);
// // // //       clearInterval(interval);
// // // //     };
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("vytalUser");
// // // //     setUser(null);
// // // //     notificationService.sendNotification("👋 Goodbye!", {
// // // //       body: "You have been logged out successfully.",
// // // //     });
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <p className="text-gray-600">Loading VYTAL...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Router>
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
// // // //         {/* Offline Banner */}
// // // //         <OfflineBanner isOnline={isOnline} pendingCount={pendingSync} />

// // // //         {/* Navbar - only show on certain routes */}
// // // //         {!window.location.pathname.includes("/auth") &&
// // // //           !window.location.pathname.includes("/login") &&
// // // //           !window.location.pathname.includes("/signup") && (
// // // //             <Navbar user={user} onLogout={handleLogout} />
// // // //           )}

// // // //         {/* Main Content */}
// // // //         <div className={window.location.pathname === "/" ? "" : "pt-16"}>
// // // //           <Routes>
// // // //             {/* Public Routes */}
// // // //             <Route path="/" element={<Landing />} />
// // // //             <Route path="/focus-areas" element={<FocusAreas />} />
// // // //             <Route path="/login" element={<Login setUser={setUser} />} />
// // // //             <Route path="/signup" element={<Signup setUser={setUser} />} />

// // // //             {/* Health Seeker Routes */}
// // // //             <Route
// // // //               path="/health-seeker"
// // // //               element={
// // // //                 <PatientRoute>
// // // //                   <HealthSeekerDashboard />
// // // //                 </PatientRoute>
// // // //               }
// // // //             >
// // // //               <Route path="emergency" element={<EmergencyResponse />} />
// // // //               <Route path="medication" element={<FindMedication />} />
// // // //               <Route path="insurance" element={<InsuranceAid />} />
// // // //               <Route path="resources" element={<ResourceHub />} />
// // // //               <Route path="ai-diagnosis" element={<AIDiagnosis />} />
// // // //               <Route path="nearby" element={<NearbyHospitals />} />
// // // //               <Route path="family-tree" element={<FamilyTree />} />
// // // //               <Route path="bp-log" element={<HypertensionDashboard />} />
// // // //               <Route path="glucose-log" element={<DiabetesDashboard />} />
// // // //             </Route>

// // // //             {/* Hospital Routes */}
// // // //             <Route
// // // //               path="/hospital"
// // // //               element={
// // // //                 <HospitalRoute>
// // // //                   <HospitalDashboard />
// // // //                 </HospitalRoute>
// // // //               }
// // // //             >
// // // //               <Route path="inventory" element={<UpdateInventory />} />
// // // //               <Route path="resources" element={<ResourceManagement />} />
// // // //               <Route path="alerts" element={<EmergencyAlerts />} />
// // // //             </Route>

// // // //             {/* Admin Routes */}
// // // //             <Route
// // // //               path="/admin"
// // // //               element={
// // // //                 <AdminRoute>
// // // //                   <SystemAdminDashboard />
// // // //                 </AdminRoute>
// // // //               }
// // // //             >
// // // //               <Route path="users" element={<UserManagement />} />
// // // //               <Route path="verifications" element={<HospitalVerification />} />
// // // //               <Route path="analytics" element={<Analytics />} />
// // // //               <Route path="health" element={<SystemHealth />} />
// // // //             </Route>

// // // //             {/* Marketplace Routes */}
// // // //             <Route
// // // //               path="/marketplace"
// // // //               element={<Marketplace userConditions={user?.conditions} />}
// // // //             />
// // // //             <Route path="/hospital/:id" element={<HospitalCard />} />
// // // //             <Route path="/map" element={<HospitalMap />} />
// // // //             <Route path="/hospitals" element={<HospitalTable />} />

// // // //             {/* Disease-specific dashboards */}
// // // //             <Route
// // // //               path="/dashboard/hypertension"
// // // //               element={
// // // //                 <PatientRoute>
// // // //                   <HypertensionDashboard />
// // // //                 </PatientRoute>
// // // //               }
// // // //             />
// // // //             <Route
// // // //               path="/dashboard/diabetes"
// // // //               element={
// // // //                 <PatientRoute>
// // // //                   <DiabetesDashboard />
// // // //                 </PatientRoute>
// // // //               }
// // // //             />

// // // //             {/* 404 Redirect */}
// // // //             <Route path="*" element={<Navigate to="/" />} />
// // // //           </Routes>
// // // //         </div>
// // // //       </div>
// // // //     </Router>
// // // //   );
// // // // }

// // // // export default App;
// // // import {
// // //   BrowserRouter as Router,
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // // } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // // import { vytalHub } from "./services";
// // // import { vytalHub } from "./components/services";

// // // // Auth Components
// // // import Login from "./components/auth/Login";
// // // import Signup from "./components/auth/Signup";

// // // // Landing Components
// // // import Landing from "./components/landing/Landing";

// // // // Health Seeker Components
// // // import HealthSeekerDashboard from "./components/health-seeker/HealthSeekerDashboard";
// // // import EmergencyResponse from "./components/health-seeker/EmergencyResponse";
// // // import FindMedication from "./components/health-seeker/FindMedication";
// // // import InsuranceAid from "./components/health-seeker/InsuranceAid";
// // // import ResourceHub from "./components/health-seeker/ResourceHub";
// // // import AIDiagnosis from "./components/health-seeker/AIDiagnosis";
// // // import NearbyHospitals from "./components/NearbyHospitals";
// // // import FamilyTree from "./components/health-seeker/FamilyTree";

// // // // Hospital Components
// // // import HospitalDashboard from "./components/hospital/HospitalDashboard";
// // // import UpdateInventory from "./components/hospital/UpdateInventory";
// // // import ResourceManagement from "./components/hospital/ResourceManagement";
// // // import EmergencyAlerts from "./components/hospital/EmergencyAlerts";

// // // // Admin Components
// // // import SystemAdminDashboard from "./components/admin/SystemAdminDashboard";
// // // import UserManagement from "./components/admin/UserManagement";
// // // import HospitalVerification from "./components/admin/HospitalVerification";
// // // import Analytics from "./components/admin/Analystics";
// // // import SystemHealth from "./components/admin/SystemHealth";

// // // // Dashboard Components
// // // import HypertensionDashboard from "./components/dashboards/HypertensionDashboard";
// // // import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";

// // // // Marketplace Components
// // // import Marketplace from "./components/Marketplace";
// // // import HealthHub from "./components/HealthHub";

// // // // Common Components
// // // import Navbar from "./components/common/Navbar";
// // // import ProtectedRoute, {
// // //   PatientRoute,
// // //   HospitalRoute,
// // //   AdminRoute,
// // // } from "./components/common/ProtectedRoute";
// // // import OfflineBanner from "./components/OfflineBanner";

// // // function App() {
// // //   const [isOnline, setIsOnline] = useState(navigator.onLine);
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [servicesReady, setServicesReady] = useState(false);

// // //   useEffect(() => {
// // //     // Initialize ALL services
// // //     const init = async () => {
// // //       await vytalHub.initialize();
// // //       setServicesReady(true);

// // //       const storedUser = localStorage.getItem("userData");
// // //       if (storedUser) {
// // //         setUser(JSON.parse(storedUser));
// // //       }
// // //       setLoading(false);
// // //     };

// // //     init();

// // //     // Network status
// // //     const handleOnline = () => {
// // //       setIsOnline(true);
// // //       window.dispatchEvent(new CustomEvent("vytal:online"));
// // //     };

// // //     const handleOffline = () => {
// // //       setIsOnline(false);
// // //       window.dispatchEvent(new CustomEvent("vytal:offline"));
// // //     };

// // //     window.addEventListener("online", handleOnline);
// // //     window.addEventListener("offline", handleOffline);

// // //     return () => {
// // //       window.removeEventListener("online", handleOnline);
// // //       window.removeEventListener("offline", handleOffline);
// // //     };
// // //   }, []);

// // //   if (loading || !servicesReady) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Starting VYTAL Services...</p>
// // //           <p className="text-sm text-gray-400 mt-2">
// // //             AI • WhatsApp • Voice • USSD
// // //           </p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <Router>
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
// // //         <OfflineBanner isOnline={isOnline} />

// // //         {!window.location.pathname.includes("/login") &&
// // //           !window.location.pathname.includes("/signup") &&
// // //           window.location.pathname !== "/" && (
// // //             <Navbar user={user} setUser={setUser} />
// // //           )}

// // //         <div className={window.location.pathname === "/" ? "" : "pt-16"}>
// // //           <Routes>
// // //             {/* Public */}
// // //             <Route path="/" element={<Landing />} />
// // //             <Route path="/login" element={<Login setUser={setUser} />} />
// // //             <Route path="/signup" element={<Signup setUser={setUser} />} />

// // //             {/* Health Seeker */}
// // //             <Route
// // //               path="/health-seeker"
// // //               element={
// // //                 <PatientRoute>
// // //                   <HealthSeekerDashboard />
// // //                 </PatientRoute>
// // //               }
// // //             >
// // //               <Route path="emergency" element={<EmergencyResponse />} />
// // //               <Route path="medication" element={<FindMedication />} />
// // //               <Route path="insurance" element={<InsuranceAid />} />
// // //               <Route path="resources" element={<ResourceHub />} />
// // //               <Route path="ai-diagnosis" element={<AIDiagnosis />} />
// // //               <Route path="nearby" element={<NearbyHospitals />} />
// // //               <Route path="family-tree" element={<FamilyTree />} />
// // //             </Route>

// // //             {/* Dashboards */}
// // //             <Route
// // //               path="/bp-log"
// // //               element={
// // //                 <PatientRoute>
// // //                   <HypertensionDashboard />
// // //                 </PatientRoute>
// // //               }
// // //             />
// // //             <Route
// // //               path="/glucose-log"
// // //               element={
// // //                 <PatientRoute>
// // //                   <DiabetesDashboard />
// // //                 </PatientRoute>
// // //               }
// // //             />

// // //             {/* Hospital */}
// // //             <Route
// // //               path="/hospital"
// // //               element={
// // //                 <HospitalRoute>
// // //                   <HospitalDashboard />
// // //                 </HospitalRoute>
// // //               }
// // //             >
// // //               <Route path="inventory" element={<UpdateInventory />} />
// // //               <Route path="resources" element={<ResourceManagement />} />
// // //               <Route path="alerts" element={<EmergencyAlerts />} />
// // //             </Route>

// // //             {/* Admin */}
// // //             <Route
// // //               path="/admin"
// // //               element={
// // //                 <AdminRoute>
// // //                   <SystemAdminDashboard />
// // //                 </AdminRoute>
// // //               }
// // //             >
// // //               <Route path="users" element={<UserManagement />} />
// // //               <Route path="verifications" element={<HospitalVerification />} />
// // //               <Route path="analytics" element={<Analytics />} />
// // //               <Route path="health" element={<SystemHealth />} />
// // //             </Route>

// // //             {/* Marketplace */}
// // //             <Route path="/marketplace" element={<Marketplace />} />
// // //             <Route path="/health-hub" element={<HealthHub />} />

// // //             {/* 404 */}
// // //             <Route path="*" element={<Navigate to="/" />} />
// // //           </Routes>
// // //         </div>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // // import { vytalHub } from "./services";
// // import { vytalHub } from "./components/services";

// // // Auth Components
// // import Login from "./components/auth/Login";
// // import Signup from "./components/auth/Signup";

// // // Landing Components
// // import Landing from "./components/landing/Landing";

// // // Health Seeker Components
// // import HealthSeekerDashboard from "./components/health-seeker/HealthSeekerDashboard";
// // import EmergencyResponse from "./components/health-seeker/EmergencyResponse";
// // import FindMedication from "./components/health-seeker/FindMedication";
// // import InsuranceAid from "./components/health-seeker/InsuranceAid";
// // import ResourceHub from "./components/health-seeker/ResourceHub";
// // import AIDiagnosis from "./components/health-seeker/AIDiagnosis";
// // import NearbyHospitals from "./components/NearbyHospitals";
// // import FamilyTree from "./components/health-seeker/FamilyTree";

// // // Hospital Components
// // import HospitalDashboard from "./components/hospital/HospitalDashboard";
// // import UpdateInventory from "./components/hospital/UpdateInventory";
// // import ResourceManagement from "./components/hospital/ResourceManagement";
// // import EmergencyAlerts from "./components/hospital/EmergencyAlerts";

// // // Admin Components
// // import SystemAdminDashboard from "./components/admin/SystemAdminDashboard";
// // import UserManagement from "./components/admin/UserManagement";
// // import HospitalVerification from "./components/admin/HospitalVerification";
// // import Analytics from "./components/admin/Analystics"; // FIXED: Added this import
// // import SystemHealth from "./components/admin/SystemHealth";

// // // Dashboard Components
// // import HypertensionDashboard from "./components/dashboards/HypertensionDashboard";
// // import DiabetesDashboard from "./components/dashboards/DiabetesDashboard";

// // // Marketplace Components
// // import Marketplace from "./components/Marketplace";
// // import HealthHub from "./components/HealthHub";

// // // Common Components
// // import Navbar from "./components/common/Navbar";
// // import ProtectedRoute, {
// //   PatientRoute,
// //   HospitalRoute,
// //   AdminRoute,
// // } from "./components/common/ProtectedRoute";
// // import OfflineBanner from "./components/OfflineBanner";

// // function App() {
// //   const [isOnline, setIsOnline] = useState(navigator.onLine);
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [servicesReady, setServicesReady] = useState(false);

// //   useEffect(() => {
// //     const init = async () => {
// //       try {
// //         await vytalHub.initialize();
// //         setServicesReady(true);
// //       } catch (error) {
// //         console.error("Service initialization error:", error);
// //         setServicesReady(true); // Still continue even if services fail
// //       }

// //       const storedUser = localStorage.getItem("userData");
// //       if (storedUser) {
// //         setUser(JSON.parse(storedUser));
// //       }
// //       setLoading(false);
// //     };

// //     init();

// //     const handleOnline = () => {
// //       setIsOnline(true);
// //       window.dispatchEvent(new CustomEvent("vytal:online"));
// //     };

// //     const handleOffline = () => {
// //       setIsOnline(false);
// //       window.dispatchEvent(new CustomEvent("vytal:offline"));
// //     };

// //     window.addEventListener("online", handleOnline);
// //     window.addEventListener("offline", handleOffline);

// //     return () => {
// //       window.removeEventListener("online", handleOnline);
// //       window.removeEventListener("offline", handleOffline);
// //     };
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading VYTAL...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
// //         <OfflineBanner isOnline={isOnline} />

// //         {!window.location.pathname.includes("/login") &&
// //           !window.location.pathname.includes("/signup") &&
// //           window.location.pathname !== "/" && (
// //             <Navbar user={user} setUser={setUser} />
// //           )}

// //         <div className={window.location.pathname === "/" ? "" : "pt-16"}>
// //           <Routes>
// //             {/* Public */}
// //             <Route path="/" element={<Landing />} />
// //             <Route path="/login" element={<Login setUser={setUser} />} />
// //             <Route path="/signup" element={<Signup setUser={setUser} />} />

// //             {/* Health Seeker */}
// //             <Route
// //               path="/health-seeker"
// //               element={
// //                 <PatientRoute>
// //                   <HealthSeekerDashboard />
// //                 </PatientRoute>
// //               }
// //             >
// //               <Route path="emergency" element={<EmergencyResponse />} />
// //               <Route path="medication" element={<FindMedication />} />
// //               <Route path="insurance" element={<InsuranceAid />} />
// //               <Route path="resources" element={<ResourceHub />} />
// //               <Route path="ai-diagnosis" element={<AIDiagnosis />} />
// //               <Route path="nearby" element={<NearbyHospitals />} />
// //               <Route path="family-tree" element={<FamilyTree />} />
// //             </Route>

// //             {/* Dashboards */}
// //             <Route
// //               path="/bp-log"
// //               element={
// //                 <PatientRoute>
// //                   <HypertensionDashboard />
// //                 </PatientRoute>
// //               }
// //             />
// //             <Route
// //               path="/glucose-log"
// //               element={
// //                 <PatientRoute>
// //                   <DiabetesDashboard />
// //                 </PatientRoute>
// //               }
// //             />

// //             {/* Hospital */}
// //             <Route
// //               path="/hospital"
// //               element={
// //                 <HospitalRoute>
// //                   <HospitalDashboard />
// //                 </HospitalRoute>
// //               }
// //             >
// //               <Route path="inventory" element={<UpdateInventory />} />
// //               <Route path="resources" element={<ResourceManagement />} />
// //               <Route path="alerts" element={<EmergencyAlerts />} />
// //             </Route>

// //             {/* Admin */}
// //             <Route
// //               path="/admin"
// //               element={
// //                 <AdminRoute>
// //                   <SystemAdminDashboard />
// //                 </AdminRoute>
// //               }
// //             >
// //               <Route path="users" element={<UserManagement />} />
// //               <Route path="verifications" element={<HospitalVerification />} />
// //               <Route path="analytics" element={<Analytics />} />
// //               <Route path="health" element={<SystemHealth />} />
// //             </Route>

// //             {/* Marketplace */}
// //             <Route path="/marketplace" element={<Marketplace />} />
// //             <Route path="/health-hub" element={<HealthHub />} />

// //             {/* 404 */}
// //             <Route path="*" element={<Navigate to="/" />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
// // src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// // import Login from "./components/Login";
// // import Signup from "./components/Signup";
// import Signup from "./components/auth/signup";
// import Login from "./components/auth/Login";
// import Dashboard from "./components/Dashboard";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("vytal-user");
//     if (saved) setUser(JSON.parse(saved));
//   }, []);

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//         <Routes>
//           <Route path="/login" element={<Login setUser={setUser} />} />
//           <Route path="/signup" element={<Signup setUser={setUser} />} />
//           <Route
//             path="/"
//             element={user ? <Dashboard /> : <Login setUser={setUser} />}
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("vytal-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <BrowserRouter>
      {/* 
        For hackathon simplicity, we put the floating marketplace button 
        here so any logged-in user can access it easily from the dashboard.
      */}
      {user && window.location.pathname !== "/marketplace" && window.location.pathname !== "/admin" && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
          
          {/* Admin Demo Button (Hackathon shortcut) */}
          <button 
           onClick={() => window.location.href='/admin'}
           className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 group transition-all text-sm font-bold border border-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            Hospital Admin Portal
          </button>

          <button 
           onClick={() => window.location.href='/marketplace'}
           className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all animate-bounce"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 10v6"/><path d="M7 13h6"/></svg>
            <span className="font-bold hidden group-hover:block transition-all mr-2">Emergency Hub</span>
          </button>
        </div>
      )}

      {(window.location.pathname === "/marketplace" || window.location.pathname === "/admin") && (
         <div className="fixed top-6 left-6 z-50">
           <button 
            onClick={() => window.location.href='/'}
            className="bg-blue-900/80 backdrop-blur text-white px-4 py-2 rounded-xl border border-blue-700 shadow-lg flex items-center gap-2 hover:bg-blue-800 transition-all font-bold"
           >
             ← Back to Patient Dashboard
           </button>
         </div>
      )}

      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/landing" />}
        />
        <Route
          path="/marketplace"
          element={user ? <Marketplace /> : <Navigate to="/landing" />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Navigate to="/landing" />}
        />
        
        {/* Catch all other routes and redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
