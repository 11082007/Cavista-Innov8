import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState("general"); // Default condition
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // VYTAL Hackathon signup logic
    const userData = { email, name, condition };
    localStorage.setItem("vytal-user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-red-600">
        <h1 className="text-3xl font-extrabold text-red-900 text-center mb-2">VYTAL</h1>
        <p className="text-gray-500 text-center mb-8 font-medium">From Data to Prevention.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Primary Health Area
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-700 font-medium"
            >
              <option value="general">General Prevention</option>
              <option value="hypertension">Hypertension Watch</option>
              <option value="diabetes">Diabetes Management</option>
              <option value="sickle-cell">Sickle Cell Care</option>
              <option value="cancer">Cancer Prevention (Pap Smear/Prostate)</option>
              <option value="allergies">Undiagnosed Allergies</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 font-extrabold shadow-md transition-all active:scale-95"
          >
            Create My AI Health Profile
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 font-medium">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
