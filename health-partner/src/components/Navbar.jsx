import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-4 px-8 w-full fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          {/* Bigger V icon as requested */}
          <div className="w-12 h-12 bg-gradient-to-tr from-red-600 to-rose-500 rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-all">
            <span className="text-white font-black text-3xl">V</span>
          </div>
          <span className="text-2xl font-extrabold text-red-900 tracking-tight group-hover:text-red-700 transition-colors">VYTAL</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/" className="font-semibold text-gray-700 hover:text-red-600 transition">Dashboard</Link>
              {/* Added back Marketplace and Resource Hub links */}
              <Link to="/marketplace" className="font-semibold text-gray-700 hover:text-red-600 transition">Emergency Hub</Link>
              <Link to="/admin" className="font-semibold text-gray-700 hover:text-red-600 transition">Resource Hub (Admin)</Link>
              <button 
                onClick={() => {
                  onLogout();
                  navigate('/');
                }}
                className="bg-red-50 hover:bg-red-100 text-red-700 px-5 py-2 rounded-full font-bold transition-colors ml-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
              onClick={() => navigate('/login')}
              className="text-red-700 font-semibold hover:text-red-900 transition-colors"
              >
                Log In
              </button>
              <button 
              onClick={() => navigate('/signup')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
