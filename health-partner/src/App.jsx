
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
            className="bg-red-900/80 backdrop-blur text-white px-4 py-2 rounded-xl border border-red-700 shadow-lg flex items-center gap-2 hover:bg-red-800 transition-all font-bold"
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
