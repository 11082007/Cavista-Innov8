import React, { useState, useEffect } from "react";
import { calculateRisk } from "../ml/RiskEngine";
import AIExplanationPanel from "./AIExplanationPanel";
import GlucoseLog from "./GlucoseLog";
import BPLog from "./BPLog";
import AllergyTracker from "./AllergyTracker";
import { calculateRisk } from "../ml/RiskEngine";

const PrimaryEducation = ({ condition }) => {
  const content = {
    general: { title: "Daily Health Optimization", text: "Maintain a balanced diet, stay hydrated, and ensure you get 7-8 hours of sleep per night to build a strong baseline defense." },
    hypertension: { title: "Sodium Reduction Strategies", text: "Limit daily sodium intake to under 1,500mg. Focus on the DASH diet: fruits, vegetables, and low-fat dairy." },
    diabetes: { title: "Carbohydrate Management", text: "Pair complex carbohydrates with protein or healthy fats to prevent sudden blood sugar spikes." },
    "sickle-cell": { title: "Genetic Compatibility", text: "Pre-marital genetic counseling is vital. An AS and AS genotype match carries a 25% probability of an SS offspring in every pregnancy." },
    cancer: { title: "Routine Screenings", text: "Early detection saves lives. Schedule regular Pap smears (cervical) and prostate exams in accordance with your age bracket." },
    allergies: { title: "Trigger Identification", text: "Keep a meticulous food and environment diary. Many adult-onset allergies develop over a period of consistent low-grade exposure." }
  };
  
  const current = content[condition] || content.general;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 animate-fadeIn">
      <div className="flex gap-4">
         <div className="w-12 h-12 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
         </div>
         <div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">{current.title}</h3>
            <p className="text-orange-800 leading-relaxed">{current.text}</p>
         </div>
      </div>
    </div>
  );
};

const SecondaryFamilyTree = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6 rounded-2xl border border-purple-100 animate-fadeIn">
      <div className="flex gap-4 items-start mb-6">
         <div className="w-12 h-12 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 8-8 5-8-5V6l8 5 8-5m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
         </div>
         <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-900 mb-2">Genetic Risk Analysis</h3>
            <p className="text-purple-800 text-sm mb-4">Upload your family medical history. Our AI maps autosomal and X-linked inheritance probabilities.</p>
            
            <div className="bg-white/60 p-4 rounded-xl border border-purple-100">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-bold text-gray-700 text-sm">Father's Side</span>
                 <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-600 rounded">Hemophilia Carrier Detected</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="font-bold text-gray-700 text-sm">Mother's Side</span>
                 <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-600 rounded">Clear</span>
               </div>
               <div className="mt-4 pt-3 border-t border-purple-200 flex justify-between items-center">
                 <span className="font-bold text-purple-900">Offspring Probability Warning</span>
                 <span className="text-sm font-bold text-purple-700">X-Linked Recessive: 50% chance for males</span>
               </div>
            </div>
         </div>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm">
        Update Family Tree Records
      </button>
    </div>
  );
};


const Dashboard = () => {
  const [readings, setReadings] = useState([]);
  const [risk, setRisk] = useState(null);
  const [activeTab, setActiveTab] = useState("tertiary");
  const [loggingType, setLoggingType] = useState("glucose");

  // Get user condition
  const user = JSON.parse(localStorage.getItem("vytal-user") || "{}");
  const condition = user.condition || "general";

  useEffect(() => {
    const saved = localStorage.getItem("vytal-readings");
    if (saved) {
      setReadings(JSON.parse(saved));
    } else {
      const demo = [
        { date: "Mon", glucose: 178, systolic: 145, diastolic: 92 },
        { date: "Tue", glucose: 182, systolic: 148, diastolic: 94 },
        { date: "Wed", glucose: 175, systolic: 152, diastolic: 96 },
      ];
      setReadings(demo);
    }
  }, []);

  useEffect(() => {
    if (readings.length === 0) return;
    const glucoseLogs = readings.filter(r => r.glucose !== undefined).map(r => ({ date: r.date, value: r.glucose }));
    const bpLogs = readings.filter(r => r.systolic !== undefined).map(r => ({ date: r.date, systolic: r.systolic, diastolic: r.diastolic }));
    const result = calculateRisk(glucoseLogs, bpLogs);
    setRisk(result);
  }, [readings]);

  const addReading = (newReading) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
    let updated;
    if (newReading.type === "glucose") {
      updated = [...readings, { date: today + " " + Date.now().toString().slice(-4), glucose: newReading.value }];
    } else {
      updated = [...readings, { date: today + " " + Date.now().toString().slice(-4), systolic: newReading.systolic, diastolic: newReading.diastolic }];
    }
    const finalReadings = updated.slice(-7);
    setReadings(finalReadings);
    localStorage.setItem("vytal-readings", JSON.stringify(finalReadings));
  };

  const handleLogout = () => {
    localStorage.removeItem("vytal-user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
         <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">V</div>
               <span className="text-xl font-bold text-blue-900">VYTAL Patient</span>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-sm font-medium text-gray-500 hidden sm:block">Welcome, {user.name || "User"}</span>
               <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">
                 Log Out
               </button>
            </div>
         </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* Layer Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
           <button 
             onClick={() => setActiveTab('primary')}
             className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'primary' ? 'bg-orange-100 text-orange-800' : 'text-gray-500 hover:bg-gray-50'}`}
           >
              1. Pre-Disease Education
           </button>
           <button 
             onClick={() => setActiveTab('secondary')}
             className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'secondary' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-50'}`}
           >
              2. Genetic & Family Risks
           </button>
           <button 
             onClick={() => setActiveTab('tertiary')}
             className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'tertiary' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-50'}`}
           >
              3. Active Tracking
           </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'primary' && <PrimaryEducation condition={condition} />}
        {activeTab === 'secondary' && <SecondaryFamilyTree />}
        
        {activeTab === 'tertiary' && (
          <div className="animate-fadeIn space-y-6">
             {/* Dynamic Layout based on condition */}
             {condition === 'allergies' ? (
                <AllergyTracker />
             ) : (
                <>
                  {/* AI Explanation Panel */}
                  {risk && <AIExplanationPanel riskData={risk} />}

                  {/* Log Form Selectors */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLoggingType("glucose")}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loggingType === "glucose" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"}`}
                    >
                      🩸 Log Glucose
                    </button>
                    <button
                      onClick={() => setLoggingType("bp")}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loggingType === "bp" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"}`}
                    >
                      ❤️ Log Blood Pressure
                    </button>
                  </div>

                  {loggingType === "glucose" ? <GlucoseLog onAdd={addReading} /> : <BPLog onAdd={addReading} />}

                  {/* Recent Readings List */}
                  {readings.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Readings</h2>
                      <div className="space-y-3">
                        {readings.slice().reverse().map((r, i) => (
                          <div key={i} className="flex flex-wrap justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="font-bold text-gray-700 text-sm whitespace-nowrap mr-4">{r.date}</span>
                            <div className="flex gap-4">
                                {r.glucose && (
                                  <span className={`font-semibold text-sm ${r.glucose > 180 ? "text-red-600 font-bold" : r.glucose > 140 ? "text-orange-600" : "text-indigo-600"}`}>
                                    Glucose: {r.glucose}
                                  </span>
                                )}
                                {r.systolic && (
                                  <span className={`font-semibold text-sm ${r.systolic > 140 ? "text-red-600 font-bold" : "text-indigo-600"}`}>
                                    BP: {r.systolic}/{r.diastolic}
                                  </span>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
