import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import OfflineBanner from "./components/OfflineBanner";
import VytalAIChatbot from "./components/AIChatbot";

function App() {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const saved = localStorage.getItem("vytal-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }

    // Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vytal-user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Offline Banner for PWA and Sync Engine feedback */}
      <OfflineBanner isOnline={isOnline} />

      {/* Global Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* 24/7 AI Chatbot for authenticated users */}
      {user && <VytalAIChatbot />}

      {/* Main Content Area with padding for fixed Navbar */}
      <div className="pt-20">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
