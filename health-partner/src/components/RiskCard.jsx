// // src/components/RiskCard.jsx
// import React from "react";

// const RiskCard = ({ risk, showDetails, setShowDetails }) => {
//   const getRiskColor = (level) => {
//     switch (level) {
//       case "HIGH":
//         return "bg-purple-500";
//       case "MEDIUM":
//         return "bg-orange-500";
//       case "LOW":
//         return "bg-green-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getRiskBg = (level) => {
//     switch (level) {
//       case "HIGH":
//         return "bg-purple-50 border-purple-200";
//       case "MEDIUM":
//         return "bg-orange-50 border-orange-200";
//       case "LOW":
//         return "bg-green-50 border-green-200";
//       default:
//         return "bg-gray-50";
//     }
//   };

//   if (!risk) return null;

//   return (
//     <div
//       className={`mb-6 p-6 rounded-xl border-2 ${getRiskBg(risk.level)} transition-all`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Complication Risk</h2>
//         <span
//           className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getRiskColor(risk.level)}`}
//         >
//           {risk.level} RISK
//         </span>
//       </div>

//       {/* Gauge */}
//       <div className="mb-4">
//         <div className="flex justify-between text-sm text-gray-600 mb-1">
//           <span>Low</span>
//           <span>Medium</span>
//           <span>High</span>
//         </div>
//         <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className={`h-full ${getRiskColor(risk.level)} transition-all duration-1000`}
//             style={{ width: `${risk.score}%` }}
//           ></div>
//         </div>
//         <div className="flex justify-between mt-2">
//           <span className="text-2xl font-bold">{risk.score}%</span>
//           <span className="text-gray-500">risk score</span>
//         </div>
//       </div>

//       {/* Explanation Toggle */}
//       <button
//         onClick={() => setShowDetails(!showDetails)}
//         className="text-purple-600 hover:text-purple-800 text-sm font-medium mb-3"
//       >
//         {showDetails ? "▼ Hide details" : "▶ Why this risk?"}
//       </button>

//       {showDetails && risk.factors && risk.factors.length > 0 && (
//         <div className="bg-white p-4 rounded-lg space-y-2 animate-fadeIn">
//           <p className="font-medium text-gray-700">
//             Your risk increased due to:
//           </p>
//           {risk.factors.map((factor, i) => (
//             <div key={i} className="flex items-start gap-2 text-sm">
//               <span className="text-purple-500 mt-1">•</span>
//               <span className="text-gray-700">{factor}</span>
//             </div>
//           ))}

//           <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-800 text-sm font-medium">
//               ⚠️ {risk.recommendation || "Consider consulting a doctor"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RiskCard;
import React from "react";

const RiskCard = ({ risk, showDetails, setShowDetails }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case "HIGH":
        return "bg-purple-500";
      case "MEDIUM":
        return "bg-orange-500";
      case "LOW":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskBg = (level) => {
    switch (level) {
      case "HIGH":
        return "bg-purple-50 border-purple-200";
      case "MEDIUM":
        return "bg-orange-50 border-orange-200";
      case "LOW":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div
      className={`mb-6 p-6 rounded-xl border-2 ${getRiskBg(risk.level)} transition-all`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Complication Risk</h2>
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getRiskColor(risk.level)}`}
        >
          {risk.level} RISK
        </span>
      </div>

      {/* Gauge */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getRiskColor(risk.level)} transition-all duration-1000`}
            style={{ width: `${risk.score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-2xl font-bold">{risk.score}%</span>
          <span className="text-gray-500">risk score</span>
        </div>
      </div>

      {/* Explanation Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-purple-600 hover:text-purple-800 text-sm font-medium mb-3"
      >
        {showDetails ? "▼ Hide details" : "▶ Why this risk?"}
      </button>

      {showDetails && risk.factors && risk.factors.length > 0 && (
        <div className="bg-white p-4 rounded-lg space-y-2">
          <p className="font-medium text-gray-700">
            Your risk increased due to:
          </p>
          {risk.factors.map((factor, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-purple-500 mt-1">•</span>
              <span className="text-gray-700">{factor}</span>
            </div>
          ))}

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">
              ⚠️ {risk.recommendation || "Consider consulting a doctor"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskCard;
