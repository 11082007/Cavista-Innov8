import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("vytal-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vytal-user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Global Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

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
