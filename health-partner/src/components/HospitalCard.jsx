const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden hover:shadow-xl transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-white">
              {hospital.name}
            </h3>
            <p className="text-indigo-100 text-sm">{hospital.lga}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white text-sm font-medium">
              AI Match: {hospital.aiMatch}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Address */}
        <div className="flex items-start space-x-2 text-sm text-gray-600 mb-4">
          <span>📍</span>
          <span>{hospital.address}</span>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Specialties</div>
          <div className="flex flex-wrap gap-1">
            {hospital.specialties?.map((s) => (
              <span
                key={s}
                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-4 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-red-600">Emergency</div>
              <a
                href={`tel:${hospital.emergency}`}
                className="text-red-700 font-semibold"
              >
                {hospital.emergency}
              </a>
            </div>
            <span className="text-2xl">🚑</span>
          </div>
        </div>

        {/* Insurance Info */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Accepted Insurance</div>
          <div className="flex flex-wrap gap-1">
            {hospital.insurance?.map((i) => (
              <span
                key={i}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        {/* Prevention Programs */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Prevention Programs</div>
          <div className="space-y-2">
            {hospital.programs?.map((program) => (
              <div
                key={program.name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-700">{program.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    program.availability === "Available"
                      ? "bg-green-100 text-green-700"
                      : program.availability === "Limited"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {program.availability}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            Schedule Checkup
          </button>
          <button className="px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-indigo-700">
            📋 Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
