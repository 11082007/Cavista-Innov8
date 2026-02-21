import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load notifications
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications([
      {
        id: 1,
        type: "emergency",
        message: "Ambulance requested at LUTH",
        time: "2 mins ago",
        read: false,
      },
      {
        id: 2,
        type: "update",
        message: "Blood inventory updated at Gbagada",
        time: "10 mins ago",
        read: false,
      },
      {
        id: 3,
        type: "reminder",
        message: "Time to log your blood pressure",
        time: "1 hour ago",
        read: true,
      },
    ]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "emergency":
        return "🚨";
      case "update":
        return "📝";
      case "reminder":
        return "🔔";
      default:
        return "📌";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">vytal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/marketplace"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              Find Hospitals
            </Link>
            <Link
              to="/health-seeker"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              My Health
            </Link>
            <Link
              to="/resources"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Emergency Button */}
            <Link
              to="/health-seeker/emergency"
              className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors animate-pulse"
            >
              🚨 Emergency
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-teal-600 rounded-lg hover:bg-gray-100"
              >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-xs text-teal-600 hover:text-teal-700">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notif.read ? "bg-teal-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-xl">
                            {getNotificationIcon(notif.type)}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notif.time}
                            </p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-medium">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.name?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      ⚙️ Settings
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        📊 Admin
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onLogout?.();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-teal-600"
            >
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/marketplace"
                className="text-gray-700 hover:text-teal-600 px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Find Hospitals
              </Link>
              <Link
                to="/health-seeker"
                className="text-gray-700 hover:text-teal-600 px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                My Health
              </Link>
              <Link
                to="/resources"
                className="text-gray-700 hover:text-teal-600 px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/health-seeker/emergency"
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                🚨 Emergency
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
