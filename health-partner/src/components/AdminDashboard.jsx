import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncs, setPendingSyncs] = useState(0);
  const navigate = useNavigate();

  // Load hospitals from LocalStorage
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('vytal-hospitals');
      if (saved) setHospitals(JSON.parse(saved));
      
      const pending = localStorage.getItem('vytal-pending-syncs');
      if (pending) setPendingSyncs(JSON.parse(pending).length);
    };

    loadData();

    // Offline / Online listeners
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Also listen for cross-tab changes just in case
    window.addEventListener('storage', loadData);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  const syncPendingData = () => {
    const pending = localStorage.getItem('vytal-pending-syncs');
    if (pending) {
      const updates = JSON.parse(pending);
      if (updates.length > 0) {
        // In a real app, this would be an API call `await fetch('/api/sync')`
        // For the hackathon, we simulate a delay for visual effect
        setTimeout(() => {
          localStorage.removeItem('vytal-pending-syncs');
          setPendingSyncs(0);
          
          // Force a storage event to update other tabs immediately
          window.dispatchEvent(new Event('storage'));
          
          alert(`Successfully synced ${updates.length} offline updates to the VYTAL cloud!`);
        }, 1500);
      }
    }
  };

  const updateResource = (hospitalId, resourceName, newCount) => {
    const updatedHospitals = hospitals.map(h => {
      if (h.id === hospitalId) {
        return {
          ...h,
          resources: h.resources.map(r => 
            r.name === resourceName 
              ? { ...r, count: newCount, available: newCount > 0 } 
              : r
          )
        };
      }
      return h;
    });

    setHospitals(updatedHospitals);
    localStorage.setItem('vytal-hospitals', JSON.stringify(updatedHospitals));

    if (!isOnline) {
      // Queue for offline sync
      const pending = JSON.parse(localStorage.getItem('vytal-pending-syncs') || '[]');
      pending.push({
        hospitalId,
        resourceName,
        newCount,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('vytal-pending-syncs', JSON.stringify(pending));
      setPendingSyncs(pending.length);
    } else {
       // Force a storage event to update the other tabs (Marketplace) instantly
       window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Admin Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">V</div>
            <div>
               <h1 className="font-bold text-lg leading-tight">VYTAL Admin Center</h1>
               <p className="text-gray-400 text-xs">Resource Management</p>
            </div>
         </div>
         
         <div className="flex items-center gap-6">
            {/* The Masterpiece: Network Status Indicator */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isOnline ? 'bg-green-900/40 border-green-700 text-green-400' : 'bg-red-900/40 border-red-700 text-red-400 animate-pulse'}`}>
               <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
               <span className="font-bold text-sm tracking-wide">
                 {isOnline ? 'SYSTEM ONLINE' : 'OFFLINE MODE'}
               </span>
            </div>

            {pendingSyncs > 0 && (
               <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                 {pendingSyncs} Pending Syncs
               </div>
            )}
            
            <button onClick={() => navigate('/')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
              Exit Admin
            </button>
         </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {!isOnline && (
           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-sm">
             <div className="flex gap-3">
               <svg className="text-red-500 w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               <div>
                  <h3 className="font-bold text-red-900">Connection Lost: Offline Mode Active</h3>
                  <p className="text-red-800 text-sm mt-1">
                    You can continue updating hospital resources. All changes are being saved locally and will automatically sync to the Marketplace as soon as your internet connection is restored.
                  </p>
               </div>
             </div>
           </div>
        )}

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
           {hospitals.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h2 className="font-extrabold text-gray-900 text-lg mb-1">{hospital.name}</h2>
                    <p className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                       {hospital.lga} Branch
                    </p>
                 </div>
                 
                 <div className="p-4 space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Live Inventory Control</h3>
                    
                    {hospital.resources.map((res, idx) => (
                       <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                          <span className="font-bold text-gray-700">{res.name}</span>
                          
                          <div className="flex items-center gap-3">
                             <button 
                               onClick={() => updateResource(hospital.id, res.name, Math.max(0, res.count - 1))}
                               className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors font-bold"
                             >
                               -
                             </button>
                             <span className={`w-8 text-center font-black ${res.available ? 'text-gray-900' : 'text-red-500'}`}>
                               {res.count}
                             </span>
                             <button 
                               onClick={() => updateResource(hospital.id, res.name, res.count + 1)}
                               className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors font-bold"
                             >
                               +
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">Ambulance</span>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded font-bold text-xs text-gray-700 hover:bg-gray-100">
                      Toggle Status
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
