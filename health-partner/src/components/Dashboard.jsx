import React, { useState, useEffect } from "react";
import { calculateRisk } from "../ml/riskEngine";
import AIExplanationPanel from "./AIExplanationPanel";
import GlucoseLog from "./GlucoseLog";
import BPLog from "./BPLog";
import AllergyTracker from "./AllergyTracker";

const PrimaryEducation = ({ condition }) => {
  const content = {
    general: { title: "Daily Health Optimization", text: "Maintain a balanced diet, stay hydrated, and ensure you get 7-8 hours of sleep per night to build a strong baseline defense.", note: "Daily Note: A 30-minute walk lowers cardiovascular risk by 18%." },
    hypertension: { title: "Sodium Reduction Strategies", text: "Limit daily sodium intake to under 1,500mg. Focus on the DASH diet: fruits, vegetables, and low-fat dairy.", note: "Daily Note: Check your BP at the same time every morning before coffee." },
    diabetes: { title: "Carbohydrate Management", text: "Pair complex carbohydrates with protein or healthy fats to prevent sudden blood sugar spikes.", note: "Daily Note: A 15-minute walk after meals significantly reduces glucose spikes." },
    "sickle-cell": { title: "Genetic Compatibility & Hydration", text: "Pre-marital genetic counseling is vital. An AS and AS genotype match carries a 25% probability of an SS offspring in every pregnancy.", note: "Daily Note: Drink at least 3-4 liters of water today to prevent sickling and avoid extreme temperatures." },
    cancer: { title: "Routine Screenings", text: "Early detection saves lives. Schedule regular Pap smears (cervical) and prostate exams in accordance with your age bracket.", note: "Daily Note: Focus on nutrient-dense foods to maintain energy levels and immune support." },
    allergies: { title: "Trigger Identification", text: "Keep a meticulous food and environment diary. Many adult-onset allergies develop over a period of consistent low-grade exposure.", note: "Daily Note: Review ingredients in every new food item before eating." }
  };
  
  const current = content[condition] || content.general;

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200 animate-fadeIn mb-6">
      <div className="flex gap-4">
         <div className="w-12 h-12 bg-teal-200 text-teal-800 rounded-full flex items-center justify-center shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
         </div>
         <div>
            <h3 className="text-xl font-bold text-teal-900 mb-2">{current.title}</h3>
            <p className="text-teal-800 leading-relaxed mb-4">{current.text}</p>
            <div className="bg-white/60 p-3 rounded-xl border border-teal-200 flex items-start gap-3">
              <span className="text-teal-600 font-bold">💡</span>
              <p className="text-teal-900 font-semibold text-sm">{current.note}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const SecondaryFamilyTree = () => {
  const [records, setRecords] = useState({ father: "Hemophilia Carrier", mother: "Clear", sibling: "Clear" });
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(records);

  const save = () => {
    setRecords(temp);
    setIsEditing(false);
  };

  const getRisk = () => {
    const f = records.father.toLowerCase();
    const m = records.mother.toLowerCase();
    if (f.includes('sickle') && m.includes('sickle')) {
      return { msg: "SS Offspring: 25% chance", color: "text-purple-700 bg-purple-100" };
    }
    if (f.includes('hemophilia') || m.includes('hemophilia')) {
      return { msg: "X-Linked Recessive: 50% chance for males", color: "text-purple-700 bg-purple-100" };
    }
    if (f.includes('cancer') || m.includes('cancer')) {
      return { msg: "Elevated Risk. Screen 10 years early.", color: "text-orange-700 bg-orange-100" };
    }
    return { msg: "Standard Baseline Risk", color: "text-green-700 bg-green-100" };
  };

  const risk = getRisk();

  return (
    <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-6 rounded-2xl border border-purple-100 animate-fadeIn">
      <div className="flex gap-4 items-start mb-6">
         <div className="w-12 h-12 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 8-8 5-8-5V6l8 5 8-5m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
         </div>
         <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-900 mb-2">Genetic Risk Analysis</h3>
            <p className="text-purple-800 text-sm mb-4">Upload your family medical history. Our AI maps autosomal and X-linked inheritance probabilities.</p>
            
            {!isEditing ? (
              <div className="bg-white/60 p-4 rounded-xl border border-purple-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700 text-sm">Father's Side</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${records.father.toLowerCase() !== 'clear' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>{records.father}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700 text-sm">Mother's Side</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${records.mother.toLowerCase() !== 'clear' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>{records.mother}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700 text-sm">Sibling</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${records.sibling.toLowerCase() !== 'clear' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>{records.sibling}</span>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-200 flex justify-between items-center">
                  <span className="font-bold text-purple-900">Offspring Probability</span>
                  <span className={`text-sm font-bold px-2 py-1 rounded ${risk.color}`}>{risk.msg}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 p-4 rounded-xl border border-purple-200 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600">Father's Side</label>
                  <input type="text" value={temp.father} onChange={e=>setTemp({...temp, father: e.target.value})} className="w-full text-sm p-2 border border-gray-200 rounded-lg outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600">Mother's Side</label>
                  <input type="text" value={temp.mother} onChange={e=>setTemp({...temp, mother: e.target.value})} className="w-full text-sm p-2 border border-gray-200 rounded-lg outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600">Sibling History</label>
                  <input type="text" value={temp.sibling} onChange={e=>setTemp({...temp, sibling: e.target.value})} className="w-full text-sm p-2 border border-gray-200 rounded-lg outline-none focus:border-purple-500" />
                </div>
              </div>
            )}
         </div>
      </div>
      <button 
        onClick={isEditing ? save : () => setIsEditing(true)} 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm mt-4"
      >
        {isEditing ? 'Save Family Records' : 'Update Family Tree Records'}
      </button>
    </div>
  );
};

const SickleCellLog = ({ onAdd }) => {
  const [pain, setPain] = useState(1);
  const [water, setWater] = useState(4);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Log Daily Sickle Cell Metrics</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Pain Level (1-10)</label>
          <input type="number" min="1" max="10" value={pain} onChange={e=>setPain(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Water Classes (Cups)</label>
          <input type="number" min="0" value={water} onChange={e=>setWater(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
      </div>
      <button onClick={() => onAdd({ type: 'sickle-cell', pain, water })} className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95">Save Metrics</button>
    </div>
  );
};

const CancerLog = ({ onAdd }) => {
  const [symptom, setSymptom] = useState("");
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Log Daily Symptoms / Adherence</h3>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-1">New Symptom / Note</label>
        <input type="text" value={symptom} onChange={e=>setSymptom(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. fatigue, nausea" />
      </div>
      <button onClick={() => { onAdd({ type: 'cancer', symptom }); setSymptom(''); }} className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95">Save Log</button>
    </div>
  );
};

const getReadingFeedback = (r) => {
  if (r.glucose) {
    if (r.glucose > 180) return <span className="text-red-600 font-bold sm:ml-2 bg-red-100 px-2 py-0.5 rounded text-xs">CRITICAL HIGH - Visit Hospital!</span>;
    if (r.glucose < 70) return <span className="text-orange-600 font-bold sm:ml-2 bg-orange-100 px-2 py-0.5 rounded text-xs">LOW - Consume fast sugar!</span>;
    if (r.glucose > 140) return <span className="text-orange-600 font-bold sm:ml-2 bg-orange-100 px-2 py-0.5 rounded text-xs">Slightly High.</span>;
    return <span className="text-green-600 font-bold sm:ml-2 bg-green-100 px-2 py-0.5 rounded text-xs">Normal.</span>;
  }
  if (r.systolic) {
    if (r.systolic >= 180 || r.diastolic >= 120) return <span className="text-red-600 font-bold sm:ml-2 bg-red-100 px-2 py-0.5 rounded text-xs">HYPERTENSIVE CRISIS - Emergency!</span>;
    if (r.systolic >= 140 || r.diastolic >= 90) return <span className="text-purple-600 font-bold sm:ml-2 bg-purple-100 px-2 py-0.5 rounded text-xs">High BP - Consult Doctor.</span>;
    return <span className="text-green-600 font-bold sm:ml-2 bg-green-100 px-2 py-0.5 rounded text-xs">Normal BP.</span>;
  }
  if (r.type === 'sickle-cell') {
    if (r.pain >= 8) return <span className="text-red-600 font-bold sm:ml-2 bg-red-100 px-2 py-0.5 rounded text-xs">CRISIS LEVEL - Use Emergency Hub!</span>;
    if (r.water < 4) return <span className="text-orange-600 font-bold sm:ml-2 bg-orange-100 px-2 py-0.5 rounded text-xs">Dehydrated - Drink water!</span>;
    return <span className="text-green-600 font-bold sm:ml-2 bg-green-100 px-2 py-0.5 rounded text-xs">Stable.</span>;
  }
  return null;
}

const Dashboard = () => {
  const [readings, setReadings] = useState([]);
  const [risk, setRisk] = useState(null);
  const [activeTab, setActiveTab] = useState("tertiary");
  
  // Get user condition from local storage
  const user = JSON.parse(localStorage.getItem("vytal-user") || "{}");
  const condition = user.condition || "general";
  
  // Conditionally set loggingType
  const [loggingType, setLoggingType] = useState(() => {
    if (condition === 'diabetes') return 'glucose';
    if (condition === 'hypertension') return 'bp';
    if (condition === 'sickle-cell') return 'sickle';
    if (condition === 'cancer') return 'cancer';
    return 'glucose'; // Fallback
  });

  useEffect(() => {
    const saved = localStorage.getItem("vytal-readings");
    if (saved) {
      setReadings(JSON.parse(saved));
    } else {
      const demo = [
        { date: "Mon", glucose: 95, systolic: 115, diastolic: 75 },
        { date: "Tue", glucose: 98, systolic: 118, diastolic: 78 },
        { date: "Wed", glucose: 92, systolic: 112, diastolic: 72 },
      ];
      setReadings(demo);
    }
  }, []);

  useEffect(() => {
    // Only calculate ML Risk score for BP/Glucose right now
    if (readings.length === 0) return;
    const glucoseLogs = readings.filter(r => r.glucose !== undefined).map(r => ({ date: r.date, value: r.glucose }));
    const bpLogs = readings.filter(r => r.systolic !== undefined).map(r => ({ date: r.date, systolic: r.systolic, diastolic: r.diastolic }));
    const result = calculateRisk(glucoseLogs, bpLogs);
    setRisk(result);
  }, [readings]);

  const addReading = (newReading) => {
    const timeString = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    let updated;
    if (newReading.type === "glucose") {
      updated = [...readings, { date: timeString, glucose: newReading.value }];
    } else if (newReading.type === "bp") {
      updated = [...readings, { date: timeString, systolic: newReading.systolic, diastolic: newReading.diastolic }];
    } else {
      updated = [...readings, { date: timeString, ...newReading }];
    }
    const finalReadings = updated.slice(-10); // keep last 10
    setReadings(finalReadings);
    localStorage.setItem("vytal-readings", JSON.stringify(finalReadings));
  };

  const handleLogout = () => {
    localStorage.removeItem("vytal-user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* Dynamic Condition Banner */}
        <div className="mb-6 flex items-center justify-between bg-white border border-gray-200 py-3 px-5 rounded-xl shadow-sm">
           <span className="font-bold text-gray-800">Your Dashboard Profile:</span>
           <span className="bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wider">
             {condition.replace('-', ' ')}
           </span>
        </div>

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
             className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'tertiary' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-50'}`}
           >
              3. Active Tracking
           </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'primary' && <PrimaryEducation condition={condition} />}
        {activeTab === 'secondary' && <SecondaryFamilyTree />}
        
        {activeTab === 'tertiary' && (
          <div className="animate-fadeIn space-y-6">
             {condition === 'allergies' ? (
                <AllergyTracker />
             ) : (
                <>
                  {/* AI Explanation Panel for metabolic risks */}
                  {(condition === 'general' || condition === 'hypertension' || condition === 'diabetes') && risk && (
                    <AIExplanationPanel riskData={risk} />
                  )}

                  {/* Log Forms Based on Condition */}
                  {condition === 'sickle-cell' && <SickleCellLog onAdd={addReading} />}
                  {condition === 'cancer' && <CancerLog onAdd={addReading} />}
                  {condition === 'diabetes' && <GlucoseLog onAdd={addReading} />}
                  {condition === 'hypertension' && <BPLog onAdd={addReading} />}
                  
                  {/* General condition shows a tab toggle for BP and Glucose */}
                  {condition === 'general' && (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setLoggingType("glucose")}
                          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${loggingType === "glucose" ? "bg-purple-600 text-white border-purple-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                        >
                          🩸 Log Glucose
                        </button>
                        <button
                          onClick={() => setLoggingType("bp")}
                          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${loggingType === "bp" ? "bg-purple-600 text-white border-purple-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                        >
                          ❤️ Log Blood Pressure
                        </button>
                      </div>
                      {loggingType === "glucose" ? <GlucoseLog onAdd={addReading} /> : <BPLog onAdd={addReading} />}
                    </>
                  )}

                  {/* Enhanced Recent Readings List */}
                  {readings.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex justify-between">
                         Recent Health Logs
                         <span className="text-xs font-medium text-gray-500 uppercase">AI AI Inspected</span>
                      </h2>
                      <div className="space-y-3">
                        {readings.slice().reverse().map((r, i) => (
                          <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-50 rounded-xl border border-gray-100 gap-2">
                            <span className="font-bold text-gray-700 text-sm whitespace-nowrap sm:mr-4">{r.date || 'Today'}</span>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                                {/* Readings Base Value */}
                                {r.glucose && <span className="font-semibold text-sm">Glucose: {r.glucose} mg/dL</span>}
                                {r.systolic && <span className="font-semibold text-sm">BP: {r.systolic}/{r.diastolic}</span>}
                                {r.type === 'sickle-cell' && <span className="font-semibold text-sm">Pain: {r.pain}/10, Hydration: {r.water} cups</span>}
                                {r.type === 'cancer' && <span className="font-semibold text-sm">Note: {r.symptom}</span>}
                                
                                {/* AI Immediate Feedback Component */}
                                {getReadingFeedback(r)}
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
