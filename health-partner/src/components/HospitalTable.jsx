const HospitalTable = ({ hospitals, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Hospital
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                LGA
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Ambulance
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Blood Bank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                ICU Beds
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Anti-venom
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {hospitals.map((hospital) => {
              const bloodResources =
                hospital.resources?.filter((r) => r.type === "blood") || [];
              const totalBlood = bloodResources.reduce(
                (sum, r) => sum + (r.quantity || 0),
                0,
              );
              const icuResource = hospital.resources?.find(
                (r) => r.type === "icu",
              );
              const hasAntiVenom = hospital.resources?.some(
                (r) => r.type === "antivenom" && r.available,
              );

              const hasBlood = totalBlood > 0;
              const hasICU = icuResource?.quantity > 0;

              let statusColor = "bg-green-100 text-green-800";
              let statusText = "Available";

              if (!hasBlood && !hasICU && !hasAntiVenom) {
                statusColor = "bg-red-100 text-red-800";
                statusText = "Critical";
              } else if (!hasBlood || !hasICU) {
                statusColor = "bg-yellow-100 text-yellow-800";
                statusText = "Limited";
              }

              return (
                <tr
                  key={hospital.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                  onClick={() => onSelect?.(hospital)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {hospital.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hospital.address?.substring(0, 30)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {hospital.lga}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {hospital.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`tel:${hospital.ambulance || hospital.phone}`}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      🚑 {hospital.ambulance || "Call"}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {hasBlood ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {totalBlood} units
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {hasICU ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {icuResource.quantity} beds
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Full
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {hasAntiVenom ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 ${statusColor} rounded-full text-xs font-medium`}
                    >
                      {statusText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalTable;
