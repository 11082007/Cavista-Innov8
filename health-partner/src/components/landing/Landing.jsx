// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Landing = () => {
//   const [animatedStats, setAnimatedStats] = useState({
//     patients: 0,
//     professionals: 0,
//     predictions: 0,
//     communities: 0,
//   });

//   useEffect(() => {
//     // Animate stats on load
//     const targetStats = {
//       patients: 15234,
//       professionals: 892,
//       predictions: 12453,
//       communities: 47,
//     };

//     const interval = setInterval(() => {
//       setAnimatedStats((prev) => ({
//         patients: Math.min(prev.patients + 123, targetStats.patients),
//         professionals: Math.min(
//           prev.professionals + 7,
//           targetStats.professionals,
//         ),
//         predictions: Math.min(prev.predictions + 101, targetStats.predictions),
//         communities: Math.min(prev.communities + 1, targetStats.communities),
//       }));
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50">
//       {/* Navigation */}
//       <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 fixed w-full z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white text-xl">🤖</span>
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                 Health<span className="text-emerald-600">AI</span>
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/login"
//                 className="px-6 py-2 text-gray-600 hover:text-emerald-600 font-medium transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5 font-medium"
//               >
//                 Join HealthAI
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
//                 🤖 AI-Powered Preventive Healthcare
//               </div>
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 From{" "}
//                 <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                   Data
//                 </span>{" "}
//                 to{" "}
//                 <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                   Prevention
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed">
//                 Using AI to predict health risks and connect you with the right
//                 healthcare professionals before issues become emergencies. Your
//                 intelligent health partner for proactive wellness.
//               </p>

//               {/* CTA Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 <Link
//                   to="/signup"
//                   className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1 text-lg"
//                 >
//                   Start Your Health Journey →
//                 </Link>
//                 <Link
//                   to="/marketplace"
//                   className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-emerald-500 transition-all hover:-translate-y-1 text-lg"
//                 >
//                   Explore Health Partners
//                 </Link>
//               </div>

//               {/* Animated Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-emerald-600">
//                     {animatedStats.patients.toLocaleString()}+
//                   </div>
//                   <div className="text-sm text-gray-600">Active Patients</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-emerald-600">
//                     {animatedStats.professionals}+
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Health Professionals
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-emerald-600">
//                     {animatedStats.predictions.toLocaleString()}
//                   </div>
//                   <div className="text-sm text-gray-600">Risk Predictions</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-emerald-600">
//                     {animatedStats.communities}
//                   </div>
//                   <div className="text-sm text-gray-600">Communities</div>
//                 </div>
//               </div>
//             </div>

//             {/* AI Visualization */}
//             <div className="relative">
//               <div className="bg-white rounded-2xl shadow-2xl p-6 border border-emerald-100">
//                 <div className="aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl overflow-hidden relative p-6">
//                   {/* Neural Network Visualization */}
//                   <div className="absolute inset-0">
//                     {[...Array(6)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
//                         style={{
//                           top: `${20 + i * 15}%`,
//                           left: `${30 + i * 8}%`,
//                           animationDelay: `${i * 0.2}s`,
//                         }}
//                       />
//                     ))}
//                     {[...Array(6)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="absolute w-2 h-2 bg-teal-400 rounded-full animate-pulse"
//                         style={{
//                           top: `${25 + i * 12}%`,
//                           left: `${60 - i * 5}%`,
//                           animationDelay: `${i * 0.3}s`,
//                         }}
//                       />
//                     ))}
//                     {/* Connection lines */}
//                     <svg className="absolute inset-0 w-full h-full">
//                       {[...Array(8)].map((_, i) => (
//                         <line
//                           key={i}
//                           x1={`${20 + i * 10}%`}
//                           y1="30%"
//                           x2={`${30 + i * 8}%`}
//                           y2="70%"
//                           stroke="url(#gradient)"
//                           strokeWidth="1"
//                           strokeDasharray="4 4"
//                         />
//                       ))}
//                       <defs>
//                         <linearGradient
//                           id="gradient"
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="0%"
//                         >
//                           <stop offset="0%" stopColor="#10b981" />
//                           <stop offset="100%" stopColor="#14b8a6" />
//                         </linearGradient>
//                       </defs>
//                     </svg>
//                   </div>

//                   {/* Central AI Icon */}
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl animate-float">
//                       <span className="text-white text-5xl">🤖</span>
//                     </div>
//                   </div>

//                   {/* Data Points */}
//                   <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
//                     <div className="text-sm font-medium text-emerald-700">
//                       Health Score
//                     </div>
//                     <div className="text-2xl font-bold text-emerald-600">
//                       94%
//                     </div>
//                   </div>
//                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
//                     <div className="text-sm font-medium text-teal-700">
//                       Risk Level
//                     </div>
//                     <div className="text-2xl font-bold text-teal-600">Low</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Your <span className="text-emerald-600">AI Health Partner</span>{" "}
//               Journey
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               From data collection to proactive prevention - we guide you every
//               step
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Connect",
//                 description:
//                   "Link your health records and devices for comprehensive data",
//                 icon: "📱",
//                 color: "emerald",
//               },
//               {
//                 step: "02",
//                 title: "Analyze",
//                 description:
//                   "AI analyzes patterns to predict potential health risks",
//                 icon: "🤖",
//                 color: "teal",
//               },
//               {
//                 step: "03",
//                 title: "Connect",
//                 description: "Get matched with nearby health professionals",
//                 icon: "🤝",
//                 color: "cyan",
//               },
//               {
//                 step: "04",
//                 title: "Prevent",
//                 description: "Receive personalized prevention plans and alerts",
//                 icon: "🛡️",
//                 color: "emerald",
//               },
//             ].map((item, i) => (
//               <div key={i} className="relative">
//                 {i < 3 && (
//                   <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-teal-200 transform -translate-x-8"></div>
//                 )}
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 relative z-10">
//                   <div
//                     className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-4`}
//                   >
//                     <span className="text-2xl">{item.icon}</span>
//                   </div>
//                   <div className="text-sm font-semibold text-emerald-600 mb-2">
//                     {item.step}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                   <p className="text-gray-600 text-sm">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Powered by{" "}
//               <span className="text-emerald-600">Intelligent Data</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Transforming healthcare from reactive to proactive
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "📊",
//                 title: "Predictive Analytics",
//                 description:
//                   "AI models predict health risks 6 months in advance with 94% accuracy",
//                 metrics: ["124K predictions", "89% prevention rate"],
//               },
//               {
//                 icon: "🫀",
//                 title: "Personalized Risk Scores",
//                 description:
//                   "Real-time health scores based on your unique data profile",
//                 metrics: ["24/7 monitoring", "Instant alerts"],
//               },
//               {
//                 icon: "🏥",
//                 title: "Smart Provider Matching",
//                 description:
//                   "Connect with specialists based on your risk profile and location",
//                 metrics: ["892 specialists", "15min avg response"],
//               },
//               {
//                 icon: "📈",
//                 title: "Community Health Trends",
//                 description:
//                   "Anonymous data shows emerging health patterns in your LGA",
//                 metrics: ["47 communities", "Real-time insights"],
//               },
//               {
//                 icon: "💬",
//                 title: "AI Health Assistant",
//                 description:
//                   "24/7 chat support for health questions and concerns",
//                 metrics: ["Instant answers", "Personalized"],
//               },
//               {
//                 icon: "📋",
//                 title: "Prevention Plans",
//                 description: "Custom action plans based on your risk factors",
//                 metrics: ["Weekly updates", "Progress tracking"],
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all"
//               >
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 mb-4 text-sm">
//                   {feature.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {feature.metrics.map((metric, j) => (
//                     <span
//                       key={j}
//                       className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
//                     >
//                       {metric}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community Impact */}
//       <section className="py-20 bg-emerald-600">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-white mb-8">
//             Bringing Patients Closer to Health Professionals
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 text-white">
//             <div>
//               <div className="text-5xl font-bold mb-2">47</div>
//               <div className="text-emerald-100">Active Communities</div>
//             </div>
//             <div>
//               <div className="text-5xl font-bold mb-2">15min</div>
//               <div className="text-emerald-100">Average Response Time</div>
//             </div>
//             <div>
//               <div className="text-5xl font-bold mb-2">94%</div>
//               <div className="text-emerald-100">Prevention Success Rate</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-white">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Ready for proactive healthcare?
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Join thousands using AI to stay ahead of health issues
//           </p>
//           <Link
//             to="/signup"
//             className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1 text-lg"
//           >
//             Start Your Prevention Journey →
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Landing;

import { Link } from "react-router-dom";
import { useState } from "react";
import FocusAreas from "./FocusAreas";

const Landing = () => {
  const [showAllConditions, setShowAllConditions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-teal-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                vytal<span className="text-teal-600">.</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/for-hospitals"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                For Hospitals
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-teal-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                🏥 Your Health Partner for Life
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Vytal
                </span>{" "}
                Health Companion
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                From emergency response to chronic care management. We connect
                you with hospitals, track rare medications, and provide
                AI-powered health insights.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/health-seeker"
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1 text-lg"
                >
                  I Need Healthcare →
                </Link>
                <Link
                  to="/hospital"
                  className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-teal-500 transition-all hover:-translate-y-1 text-lg"
                >
                  I'm a Hospital
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                <div className="text-3xl mb-2">🏥</div>
                <div className="text-2xl font-bold text-teal-600">156+</div>
                <div className="text-sm text-gray-600">Partner Hospitals</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="text-3xl mb-2">🚑</div>
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Response</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                <div className="text-3xl mb-2">💊</div>
                <div className="text-2xl font-bold text-teal-600">1,234</div>
                <div className="text-sm text-gray-600">Rare Medications</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-2xl font-bold text-emerald-600">AI</div>
                <div className="text-sm text-gray-600">Health Diagnosis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Component */}
      <FocusAreas />
    </div>
  );
};

export default Landing;
