import React from 'react';
import { useNavigate } from 'react-router-dom';
import USSDMockup from './USSDMockup';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 text-gray-800">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-block bg-purple-100 text-purple-800 font-semibold px-4 py-1.5 rounded-full text-sm border border-purple-200">
             ✨ Your AI Partner for Proactive Health Management
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            From Data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-400">Prevention.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Transforming healthcare from reactive treatment to proactive prevention. We continuously analyze your personal health data to detect early warning signs before complications happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
               onClick={() => navigate('/signup')}
               className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
             >
               Join VYVON Now
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
             </button>
             <button 
                onClick={() => document.getElementById('layers').scrollIntoView({ behavior: 'smooth' })}
               className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center"
             >
               Explore The Layers
             </button>
          </div>
        </div>

         {/* Hero Visuals (Abstract UI representation + USSD) */}
         <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 to-teal-100 rounded-full blur-3xl opacity-30 transform scale-150"></div>
            
            {/* The USSD Mockup Component */}
            <div className="relative z-20 transform hover:scale-105 transition-transform duration-500">
               <div className="absolute -top-6 -right-6 bg-rose-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-xl transform rotate-12 animate-pulse whitespace-nowrap">
                 For the 40% without Smartphones!
               </div>
               <USSDMockup />
            </div>
         </div>
      </main>

      {/* The 3 Layers Section */}
      <section id="layers" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built Around Three Pillars of Prevention</h2>
            <p className="text-lg text-gray-600">
              Most diseases are preventable with early intervention. We track everything from your genetics to your daily habits to build a protective shield around your health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Primary */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Layer 1: Primary Prevention</h3>
              <p className="text-sm font-bold text-orange-600 mb-4 uppercase tracking-wider">Stop it before it starts</p>
              <p className="text-gray-600 leading-relaxed leading-relaxed mb-6">
                Provides personalized preventive education based on your unique profile. Guides you on lifestyle choices to reduce the risk of developing chronic diseases in the first place.
              </p>
            </div>

             {/* Secondary */}
             <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 8-8 5-8-5V6l8 5 8-5m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Layer 2: Secondary Prevention</h3>
              <p className="text-sm font-bold text-purple-600 mb-4 uppercase tracking-wider">Catch it early</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your genetic risk analyst. Analyzes inheritance patterns (autosomal, X-linked) to calculate probabilities and proactively alerts you to specific signs enabling early screening.
              </p>
            </div>

             {/* Tertiary */}
             <div className="bg-purple-600 text-white p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Layer 3: Tertiary Prevention</h3>
              <p className="text-sm font-bold text-purple-200 mb-4 uppercase tracking-wider">Manage & prevent complications</p>
              <p className="text-purple-50 leading-relaxed mb-6">
                AI-driven trend detection to identify invisible triggers. We track your daily metrics and correlate them over time to foresee and prevent a crisis before it ever hits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <footer className="bg-gray-900 text-center py-16 px-8">
         <h2 className="text-3xl font-bold text-white mb-6">Ready to take control of your health data?</h2>
         <button 
           onClick={() => navigate('/signup')}
           className="bg-purple-500 hover:bg-purple-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
         >
           Create Your VYVON Account
         </button>
      </footer>
    </div>
  );
};

export default Landing;
