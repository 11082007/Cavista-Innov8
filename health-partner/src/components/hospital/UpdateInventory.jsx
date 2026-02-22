import { useState } from "react";

const UpdateInventory = () => {
  const [inventory, setInventory] = useState({
    blood: {
      "A+": 12,
      "A-": 5,
      "B+": 8,
      "B-": 3,
      "O+": 15,
      "O-": 4,
      "AB+": 6,
      "AB-": 2,
    },
    icu: { available: 8, total: 15 },
    oxygen: { masks: 34, cylinders: 12 },
    antiVenom: {
      snake: true,
      spider: false,
      scorpion: true,
    },
    rareMedications: [
      { name: "Hydroxyurea (Sickle Cell)", quantity: 45, unit: "doses" },
      { name: "ART (HIV)", quantity: 120, unit: "packs" },
      { name: "Insulin", quantity: 60, unit: "vials" },
      { name: "Morphine", quantity: 30, unit: "ampules" },
    ],
  });

  const [pendingUpdates, setPendingUpdates] = useState([]);

  const handleBloodUpdate = (type, value) => {
    setInventory((prev) => ({
      ...prev,
      blood: { ...prev.blood, [type]: parseInt(value) || 0 },
    }));

    // Add to sync queue
    setPendingUpdates((prev) => [
      ...prev,
      {
        type: "blood",
        item: type,
        value,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleRareMedUpdate = (index, field, value) => {
    const updated = [...inventory.rareMedications];
    updated[index][field] = value;
    setInventory((prev) => ({ ...prev, rareMedications: updated }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Update Hospital Inventory
      </h2>

      {/* Blood Bank Section */}
      <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-red-500 mr-2">🩸</span> Blood Bank Inventory
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(inventory.blood).map(([type, quantity]) => (
            <div key={type} className="bg-red-50 rounded-lg p-3">
              <label className="text-sm font-medium text-red-800">
                Type {type}
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleBloodUpdate(type, e.target.value)}
                className="w-full mt-1 px-2 py-1 border border-red-200 rounded focus:ring-2 focus:ring-red-500"
                min="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ICU & Oxygen */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-teal-500 mr-2">🏥</span> ICU Beds
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">
                Available Beds
              </label>
              <input
                type="number"
                value={inventory.icu.available}
                onChange={(e) =>
                  setInventory((prev) => ({
                    ...prev,
                    icu: {
                      ...prev.icu,
                      available: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Total Beds</label>
              <input
                type="number"
                value={inventory.icu.total}
                onChange={(e) =>
                  setInventory((prev) => ({
                    ...prev,
                    icu: { ...prev.icu, total: parseInt(e.target.value) || 0 },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-blue-500 mr-2">💨</span> Oxygen & Equipment
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">
                Oxygen Masks
              </label>
              <input
                type="number"
                value={inventory.oxygen.masks}
                onChange={(e) =>
                  setInventory((prev) => ({
                    ...prev,
                    oxygen: {
                      ...prev.oxygen,
                      masks: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Oxygen Cylinders
              </label>
              <input
                type="number"
                value={inventory.oxygen.cylinders}
                onChange={(e) =>
                  setInventory((prev) => ({
                    ...prev,
                    oxygen: {
                      ...prev.oxygen,
                      cylinders: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Anti-Venom Section */}
      <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-purple-500 mr-2">🐍</span> Anti-Venom
          Availability
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(inventory.antiVenom).map(([type, available]) => (
            <label
              key={type}
              className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={available}
                onChange={(e) =>
                  setInventory((prev) => ({
                    ...prev,
                    antiVenom: { ...prev.antiVenom, [type]: e.target.checked },
                  }))
                }
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="capitalize">{type} Anti-Venom</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rare Medications */}
      <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-orange-500 mr-2">💊</span> Rare Medications
        </h3>
        <div className="space-y-4">
          {inventory.rareMedications.map((med, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg"
            >
              <div className="flex-1">
                <span className="font-medium">{med.name}</span>
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={med.quantity}
                  onChange={(e) =>
                    handleRareMedUpdate(
                      index,
                      "quantity",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-2 py-1 border border-orange-200 rounded"
                />
              </div>
              <span className="text-sm text-gray-600 w-16">{med.unit}</span>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 border-2 border-dashed border-teal-300 rounded-lg w-full text-teal-600 hover:bg-teal-50 transition-colors">
            + Add Rare Medication
          </button>
        </div>
      </div>

      {/* Sync Status */}
      {pendingUpdates.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-yellow-800">
                Pending Updates: {pendingUpdates.length}
              </span>
              <p className="text-sm text-yellow-600">
                Changes will sync when online
              </p>
            </div>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Sync Now
            </button>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateInventory;
