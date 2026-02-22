import React, { useState } from 'react';

const USSDMockup = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (step === 0 && input === '*347#') {
      setStep(1);
    } else if (step === 1) {
      if (input === '1') setStep(2); // Emergency
      if (input === '2') setStep(3); // Health Log
      if (input === '3') setStep(4); // Chat with Doctor
    } else if (step === 2) {
      setStep(5); // Emergency Dispatch Confirmed
    } else {
      setStep(0); // Reset or back to main menu loop
    }
    setInput('');
  };

  const getScreenContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="text-left font-mono text-[13px] leading-tight text-gray-800">
            <p className="mb-2 opacity-60">Enter USSD Code:</p>
            <div className="border-b-2 border-green-500 pb-1 mb-2 text-xl tracking-widest">{input}<span className="animate-pulse">_</span></div>
            <p className="text-gray-400 text-xs">Try *347#</p>
          </div>
        );
      case 1:
        return (
          <div className="text-left font-mono text-[11px] leading-snug text-gray-800">
            <p className="font-bold border-b border-gray-300 pb-1 mb-1">Welcome to VYTAL</p>
            <p>1. Emergency Hub</p>
            <p>2. Log Vitals (BP/Sugar)</p>
            <p>3. Ask Healthcare Agent</p>
            <p>4. Check Sub Status</p>
            <div className="mt-2 border-b-2 border-green-500 pb-1 text-sm tracking-widest">{input}<span className="animate-pulse">_</span></div>
          </div>
        );
      case 2:
        return (
          <div className="text-left font-mono text-[11px] leading-snug text-gray-800">
            <p className="font-bold text-red-600 border-b border-gray-300 pb-1 mb-1">EMERGENCY DISPATCH</p>
            <p>Detecting Location...</p>
            <p className="text-gray-600 mt-1">Lagos, Oshodi-Isolo</p>
            <p className="mt-2">Enter '1' to confirm Ambulance dispatch.</p>
            <div className="mt-2 border-b-2 border-green-500 pb-1 text-sm tracking-widest">{input}<span className="animate-pulse">_</span></div>
          </div>
        );
      case 3:
        return (
          <div className="text-left font-mono text-[11px] leading-snug text-gray-800">
            <p className="font-bold border-b border-gray-300 pb-1 mb-1">Log Vitals</p>
            <p>Format: SYS/DIA</p>
            <p>Example: 120/80</p>
            <div className="mt-2 border-b-2 border-green-500 pb-1 text-sm tracking-widest">{input}<span className="animate-pulse">_</span></div>
          </div>
        );
      case 5:
        return (
          <div className="text-left font-mono text-[11px] leading-snug text-gray-800">
            <p className="font-bold text-green-700">DISPATCH CONFIRMED</p>
            <p className="mt-2">An ambulance from LUTH is 4 mins away.</p>
            <p className="mt-2">Driver: +234 812 345 6789</p>
            <p className="mt-4 text-center opacity-50">Press Cancel to exit</p>
          </div>
        );
      default:
        return <p>Session Ended.</p>;
    }
  };

  return (
    <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[8px] border-gray-800 overflow-hidden flex flex-col pt-8 pb-4 px-4">
      {/* Speaker Grill */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-700 rounded-full"></div>
      
      {/* Screen Area */}
      <div className="h-48 bg-emerald-50 rounded-xl p-3 shadow-inner border-[3px] border-emerald-900 flex flex-col">
         {/* Status Bar */}
         <div className="flex justify-between items-center mb-2 pb-1 border-b border-emerald-200/50">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>
           <span className="text-[9px] font-bold text-gray-800 font-mono">12:30 PM</span>
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>
         </div>
         {/* Content */}
         <div className="flex-1 overflow-hidden">
            {getScreenContent()}
         </div>
      </div>

      {/* Button Interactions */}
      <div className="mt-4 flex justify-between px-2">
         <button onClick={() => setStep(0)} className="text-white text-xs font-bold px-3 py-1 bg-red-600 rounded-full active:bg-red-700">CANCEL</button>
         <button onClick={handleSend} className="text-white text-xs font-bold px-3 py-1 bg-green-600 rounded-full active:bg-green-700">SEND</button>
      </div>

      {/* Keypad */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-1 flex-1">
         {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
           <button 
             key={key} 
             onClick={() => setInput(prev => prev + key)}
             className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg flex flex-col items-center justify-center font-bold text-lg active:bg-gray-600 transition-colors shadow-sm border-b-[3px] border-gray-950"
             style={{ minHeight: '40px' }}
           >
             {key}
           </button>
         ))}
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Vytal Mobile</span>
      </div>
    </div>
  );
};

export default USSDMockup;
