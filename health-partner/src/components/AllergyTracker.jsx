import React, { useState } from 'react';

const AllergyTracker = () => {
  const [logs, setLogs] = useState([
    { date: "Yesterday, 8PM", trigger: "Unknown Pizza", reaction: "Swollen tongue, Urticaria", severity: "High" },
    { date: "Oct 12, 1PM", trigger: "Spicy Pasta", reaction: "Swollen palms", severity: "Medium" },
  ]);

  const [newMeal, setNewMeal] = useState("");
  const [newReaction, setNewReaction] = useState("");
  const [severity, setSeverity] = useState("Low");

  const addLog = (e) => {
    e.preventDefault();
    if (!newMeal || !newReaction) return;
    
    setLogs([{
      date: "Just Now",
      trigger: newMeal,
      reaction: newReaction,
      severity
    }, ...logs]);

    setNewMeal("");
    setNewReaction("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Allergy & Reaction Tracker</h2>
      </div>

      {/* AI Insight Panel */}
      <div className="bg-gradient-to-r from-teal-50 to-pink-50 p-4 rounded-xl border border-rose-100 mb-6">
         <div className="flex gap-3">
           <span className="mt-1 text-rose-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></span>
           <div>
             <h4 className="font-bold text-rose-900 text-sm">VYVON AI Insight</h4>
             <p className="text-sm text-rose-800 mt-1">
               Based on your recent logs, <strong className="font-bold">Gluten or specific spices</strong> appear consistently before your severe reactions (Swollen tongue, Urticaria). 
               We recommend avoiding complex carbs for the next 7 days while we monitor your baseline.
             </p>
           </div>
         </div>
      </div>

      <form onSubmit={addLog} className="space-y-4 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">What did you eat?</label>
            <input 
              value={newMeal} onChange={(e) => setNewMeal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none" 
              placeholder="e.g. Seafood Pasta" required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Specific Reaction</label>
            <input 
              value={newReaction} onChange={(e) => setNewReaction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none" 
              placeholder="e.g. Urticaria, Swollen palms" required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Severity</label>
            <select 
               value={severity} onChange={(e) => setSeverity(e.target.value)}
               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none bg-white"
            >
              <option value="Low">Low (Mild discomfort)</option>
              <option value="Medium">Medium (Visible swelling/rash)</option>
              <option value="High">High (Difficulty functioning)</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
          Log Reaction
        </button>
      </form>

      <h3 className="font-bold text-gray-900 mb-3">Recent Logs</h3>
      <div className="space-y-3">
        {logs.map((log, i) => (
          <div key={i} className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div>
               <p className="font-bold text-gray-900">{log.reaction}</p>
               <p className="text-sm text-gray-500">{log.date} • Trigger: {log.trigger}</p>
             </div>
             <span className={`px-3 py-1 rounded-full text-xs font-bold ${
               log.severity === 'High' ? 'bg-purple-100 text-purple-700' :
               log.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
               'bg-yellow-100 text-yellow-700'
             }`}>
               {log.severity} Severity
             </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergyTracker;
