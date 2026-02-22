import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-xl shadow-lg flex items-center justify-center">
             <span className="text-white font-bold text-xl">V</span>
           </div>
           <span className="text-2xl font-extrabold text-blue-900 tracking-tight">VYTAL</span>
        </div>
        <div className="space-x-4 flex items-center">
          <button 
           onClick={() => navigate('/login')}
           className="text-blue-700 font-semibold hover:text-blue-900 transition-colors"
          >
            Log In
          </button>
          <button 
           onClick={() => navigate('/signup')}
           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-1.5 rounded-full text-sm border border-blue-200">
             ✨ AI as your Health Partner
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            From Data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Prevention.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Actively manage non-communicable diseases through predictive AI. We are transforming healthcare by catching complications before they happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
               onClick={() => navigate('/signup')}
               className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
             >
               Join VYTAL Now
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

        {/* Hero Visuals (Abstract UI representation) */}
        <div className="relative animate-pulse-slow">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-indigo-200 rounded-full blur-3xl opacity-30"></div>
           <div className="relative bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-2xl">
              <div className="space-y-4">
                 {/* Visual Mockup Items */}
                 <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
                    <div>
                      <p className="font-bold text-blue-900">Active Monitoring</p>
                      <p className="text-sm text-blue-600">Track complications</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-2xl transform translate-x-4">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                    <div>
                      <p className="font-bold text-purple-900">Genetic Risks</p>
                      <p className="text-sm text-purple-600">Family tree risk analysis</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-2xl transform translate-x-8">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></div>
                    <div>
                      <p className="font-bold text-orange-900">Pre-Disease Education</p>
                      <p className="text-sm text-orange-600">Targeted patient education</p>
                    </div>
                 </div>
              </div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Layer 1: Preventive Education</h3>
              <p className="text-gray-600 leading-relaxed leading-relaxed mb-6">
                Education is the first defense against chronic diseases. Learn critical disease interactions, like why an AS and AS genetic match needs specialized counseling before marriage.
              </p>
            </div>

             {/* Secondary */}
             <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 8-8 5-8-5V6l8 5 8-5m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Layer 2: Genetic & Family Risks</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Upload your family tree. Our AI analyzes your medical records to identify autosomal and x-linked inheritance risks, catching probabilities of conditions like hemophilia or breast cancer early.
              </p>
            </div>

             {/* Tertiary */}
             <div className="bg-blue-600 text-white p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Layer 3: Active Disease Monitoring</h3>
              <p className="text-blue-50 leading-relaxed mb-6">
                For patients with existing chronic conditions. We log your daily metrics—from glucose to unexplained allergic reactions—and our AI finds the invisible trends before a crisis hits.
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
           className="bg-blue-500 hover:bg-blue-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
         >
           Create Your VYTAL Account
         </button>
      </footer>
    </div>
  );
};

export default Landing;
