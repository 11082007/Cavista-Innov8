import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const AIExplanationPanel = ({ riskData }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount or data change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [riskData]);

  if (!riskData) return null;

  const { score, level, panelColor, explanation, reasons } = riskData;

  // Determine icon and theme based on risk level
  const isHighRisk = score >= 11;
  const isMediumRisk = score >= 6 && score < 11;

  const Icon = isHighRisk || isMediumRisk ? AlertTriangleIcon : SparklesIcon;
  
  // Base styling using Tailwind allowing dynamic color interpolation based on pass-in classes
  const containerClasses = `
    w-full rounded-2xl p-6 mb-6 shadow-lg 
    bg-gradient-to-br ${panelColor}
    border-2 ${isHighRisk ? 'border-red-400' : isMediumRisk ? 'border-orange-300' : 'border-red-200'}
    transition-all duration-700 ease-in-out transform
    ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}
  `;

  const headerTextClasses = `
    text-lg font-bold flex items-center gap-2
    ${isHighRisk ? 'text-red-800' : isMediumRisk ? 'text-orange-800' : 'text-red-800'}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Side: Summary and Explanation */}
        <div className="flex-1 space-y-3">
          <div className={headerTextClasses}>
            <span className={`p-2 rounded-full ${isHighRisk ? 'bg-red-200' : isMediumRisk ? 'bg-orange-200' : 'bg-red-200'}`}>
              <Icon />
            </span>
            <span>VYTAL AI Medical Analyst</span>
          </div>
          
          <div className="pl-12">
            <h3 className={`text-xl font-extrabold mb-1 ${isHighRisk ? 'text-red-900' : isMediumRisk ? 'text-orange-900' : 'text-red-900'}`}>
              Risk Score: {score} — {level} Risk
            </h3>
            
            <p className={`text-base font-medium ${isHighRisk ? 'text-red-800' : isMediumRisk ? 'text-orange-800' : 'text-red-800'}`}>
              {explanation}
            </p>

            {(isHighRisk || isMediumRisk) && reasons && reasons.length > 0 && (
               <ul className={`mt-3 space-y-1 text-sm ${isHighRisk ? 'text-red-700' : 'text-orange-700'} list-disc pl-5`}>
                 {reasons.map((reason, idx) => (
                   <li key={idx}><strong>{reason}</strong></li>
                 ))}
               </ul>
            )}
          </div>
        </div>

        {/* Right Side: Actionable Guidance */}
        {(isHighRisk || isMediumRisk) && (
          <div className="w-full md:w-auto bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-sm flex flex-col justify-center items-start min-w-[250px]">
            <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
              <MapPinIcon />
              <span>Nearest Hospital</span>
            </div>
            <p className="text-sm text-gray-800 font-medium mb-1">
              General Hospital Diabetes Clinic
            </p>
            <p className="text-xs text-gray-600 mb-3">
              3.2 km away • Open 24/7
            </p>
            <button 
              onClick={() => navigate('/nearby')}
              className={`w-full py-2 px-4 rounded-lg font-bold text-white transition-colors duration-200 ${isHighRisk ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              Get Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIExplanationPanel;
