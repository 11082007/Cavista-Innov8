// // src/components/BPLog.jsx
// import React, { useState } from "react";

// const BPLog = ({ onAdd }) => {
//   const [systolic, setSystolic] = useState("");
//   const [diastolic, setDiastolic] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!systolic || !diastolic) return;

//     onAdd({
//       type: "bp",
//       systolic: parseInt(systolic),
//       diastolic: parseInt(diastolic),
//       date: new Date().toISOString(),
//     });

//     setSystolic("");
//     setDiastolic("");
//   };

//   const getBPStatus = (sys, dia) => {
//     if (!sys || !dia) return null;
//     if (sys > 180 || dia > 120)
//       return { text: "Crisis", color: "text-purple-600 font-bold" };
//     if (sys > 140 || dia > 90)
//       return { text: "High", color: "text-orange-600" };
//     if (sys < 90 || dia < 60) return { text: "Low", color: "text-purple-600" };
//     return { text: "Normal", color: "text-green-600" };
//   };

//   const status = getBPStatus(systolic, diastolic);

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//       <h2 className="text-lg font-semibold mb-4">❤️ Log Blood Pressure</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Systolic (upper)
//             </label>
//             <input
//               type="number"
//               value={systolic}
//               onChange={(e) => setSystolic(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               placeholder="120"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Diastolic (lower)
//             </label>
//             <input
//               type="number"
//               value={diastolic}
//               onChange={(e) => setDiastolic(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               placeholder="80"
//               required
//             />
//           </div>
//         </div>

//         {/* Live feedback */}
//         {status && (
//           <div
//             className={`p-3 rounded-lg ${status.color.includes("red") ? "bg-purple-50" : "bg-green-50"} text-center`}
//           >
//             <span className={status.color}>{status.text}</span>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Save Reading
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BPLog;
import React, { useState } from "react";

const BPLog = ({ onAdd }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!systolic || !diastolic) return;

    onAdd({
      type: "bp",
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      date: new Date().toISOString(),
    });

    setSystolic("");
    setDiastolic("");
  };

  const getBPStatus = (sys, dia) => {
    if (!sys || !dia) return null;
    if (sys > 180 || dia > 120)
      return { text: "Crisis", color: "text-purple-600 font-bold" };
    if (sys > 140 || dia > 90)
      return { text: "High", color: "text-orange-600" };
    if (sys < 90 || dia < 60) return { text: "Low", color: "text-purple-600" };
    return { text: "Normal", color: "text-green-600" };
  };

  const status = getBPStatus(systolic, diastolic);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">❤️ Log Blood Pressure</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Systolic (upper)
            </label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="120"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Diastolic (lower)
            </label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="80"
              required
            />
          </div>
        </div>

        {status && (
          <div
            className={`p-3 rounded-lg ${status.color.includes("red") ? "bg-purple-50" : "bg-green-50"} text-center`}
          >
            <span className={status.color}>{status.text}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Reading
        </button>
      </form>
    </div>
  );
};

export default BPLog;
