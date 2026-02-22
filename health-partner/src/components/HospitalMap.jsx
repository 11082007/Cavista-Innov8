import { useEffect, useRef } from "react";

const HospitalMap = ({ hospitals, onHospitalSelect }) => {
  const mapRef = useRef(null);

  // Dummy map implementation - In production, use Google Maps or Mapbox
  useEffect(() => {
    if (!mapRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = mapRef.current.clientWidth;
    canvas.height = 400;
    canvas.style.width = "100%";
    canvas.style.height = "400px";
    canvas.style.borderRadius = "12px";

    const ctx = canvas.getContext("2d");

    // Draw base map
    ctx.fillStyle = "#e0f2fe";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#bae6fd";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.strokeStyle = "#bae6fd";
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.strokeStyle = "#bae6fd";
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw hospitals
    hospitals.forEach((hospital, index) => {
      const x = 100 + ((index * 70) % (canvas.width - 200));
      const y = 100 + Math.floor(index / 5) * 80;

      // Determine color based on resource availability
      const hasBlood = hospital.resources?.some(
        (r) => r.type === "blood" && r.quantity > 0,
      );
      const hasICU = hospital.resources?.some(
        (r) => r.type === "icu" && r.quantity > 0,
      );
      const hasAntiVenom = hospital.resources?.some(
        (r) => r.type === "antivenom" && r.available,
      );

      let color = "#ef4444"; // red for critical
      if (hasBlood && hasICU && hasAntiVenom)
        color = "#22c55e"; // green for all available
      else if (hasBlood || hasICU) color = "#eab308"; // yellow for some available

      // Draw hospital marker
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw pulse effect for critical
      if (color === "#ef4444") {
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.fill();
      }

      // Add label
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillStyle = "#1e293b";
      ctx.fillText(hospital.name.substring(0, 15), x - 20, y - 20);
    });

    // Clear and redraw
    mapRef.current.innerHTML = "";
    mapRef.current.appendChild(canvas);
  }, [hospitals]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Hospital Locations</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">All Resources</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Partial</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Critical</span>
          </div>
        </div>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[400px] bg-purple-50 rounded-lg overflow-hidden"
      ></div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        * Interactive map simulation - In production, integrate with Google Maps
      </p>
    </div>
  );
};

export default HospitalMap;
