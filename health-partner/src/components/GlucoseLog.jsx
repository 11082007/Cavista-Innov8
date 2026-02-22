// // src/components/GlucoseLog.jsx
// import React, { useState } from "react";

// const GlucoseLog = ({ onAdd }) => {
//   const [glucose, setGlucose] = useState("");
//   const [time, setTime] = useState("fasting");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!glucose) return;

//     onAdd({
//       type: "glucose",
//       value: parseInt(glucose),
//       time,
//       date: new Date().toISOString(),
//     });

//     setGlucose("");
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//       <h2 className="text-lg font-semibold mb-4">🩸 Log Blood Glucose</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Glucose (mg/dL)
//             </label>
//             <input
//               type="number"
//               value={glucose}
//               onChange={(e) => setGlucose(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               placeholder="120"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Time</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//             >
//               <option value="fasting">Fasting</option>
//               <option value="before-meal">Before Meal</option>
//               <option value="after-meal">After Meal</option>
//               <option value="bedtime">Bedtime</option>
//             </select>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Save Reading
//         </button>
//       </form>

//       {/* Quick tips */}
//       <div className="mt-4 text-xs text-gray-500">
//         <span className="font-medium">Target ranges:</span> Fasting: 70-100 •
//         After meals: {"<"}140
//       </div>
//     </div>
//   );
// };

// export default GlucoseLog;
import React, { useState } from "react";

const GlucoseLog = ({ onAdd }) => {
  const [glucose, setGlucose] = useState("");
  const [time, setTime] = useState("fasting");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!glucose) return;

    onAdd({
      type: "glucose",
      value: parseInt(glucose),
      time,
      date: new Date().toISOString(),
    });

    setGlucose("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">🩸 Log Blood Glucose</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Glucose (mg/dL)
            </label>
            <input
              type="number"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="120"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="fasting">Fasting</option>
              <option value="before-meal">Before Meal</option>
              <option value="after-meal">After Meal</option>
              <option value="bedtime">Bedtime</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Reading
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <span className="font-medium">Target ranges:</span> Fasting: 70-100 •
        After meals: {"<"}140
      </div>
    </div>
  );
};

export default GlucoseLog;
