import { useState, useEffect } from "react";
// import { vytalHub } from "../services";
import { vytalHub } from "./services";

const HealthHub = ({ userId, phone }) => {
  const [healthSummary, setHealthSummary] = useState(null);
  const [bpForm, setBpForm] = useState({ systolic: "", diastolic: "" });

  useEffect(() => {
    // Load user's health summary
    vytalHub.getUserHealthSummary(userId).then(setHealthSummary);

    // Listen for events from ALL services
    const handlers = {
      "bp-reading-added": (e) => console.log("BP logged:", e.detail),
      emergency: (e) => console.log("Emergency:", e.detail),
      "medication-reminder": (e) => console.log("Med reminder:", e.detail),
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [userId]);

  const logBloodPressure = (e) => {
    e.preventDefault();
    const systolic = parseInt(bpForm.systolic);
    const diastolic = parseInt(bpForm.diastolic);

    if (isNaN(systolic) || isNaN(diastolic)) return;

    // This SINGLE event triggers ALL services:
    // - WhatsApp bot sends confirmation
    // - USSD stores for next session
    // - Voice speaks result
    // - Notification pops up
    // - AI analyzes
    // - Database saves
    window.dispatchEvent(
      new CustomEvent("bp-reading-added", {
        detail: {
          reading: { systolic, diastolic, source: "web" },
          userId,
          phone,
        },
      }),
    );

    setBpForm({ systolic: "", diastolic: "" });
  };

  const triggerEmergency = () => {
    window.dispatchEvent(
      new CustomEvent("emergency", {
        detail: { userId, phone, type: "user-triggered" },
      }),
    );
  };

  const testVoice = async () => {
    await vytalHub.voice.speak(
      "Testing voice integration. All systems working.",
    );
  };

  const testWhatsApp = () => {
    vytalHub.whatsapp.sendMessage(phone, "Test message from VYTAL");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🩺 VYTAL Health Hub</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* BP Logger */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Log Blood Pressure</h2>
          <form onSubmit={logBloodPressure}>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Systolic"
                value={bpForm.systolic}
                onChange={(e) =>
                  setBpForm({ ...bpForm, systolic: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Diastolic"
                value={bpForm.diastolic}
                onChange={(e) =>
                  setBpForm({ ...bpForm, diastolic: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Log Reading (Triggers ALL Services)
              </button>
            </div>
          </form>
        </div>

        {/* Service Tests */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Integrations</h2>
          <div className="space-y-3">
            <button
              onClick={triggerEmergency}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
            >
              🚨 Test Emergency (All Channels)
            </button>
            <button
              onClick={testVoice}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              🎤 Test Voice
            </button>
            <button
              onClick={testWhatsApp}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              📱 Test WhatsApp
            </button>
          </div>
        </div>

        {/* Health Summary */}
        {healthSummary && (
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Health Summary</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Recent BP</p>
                <p className="text-2xl font-bold">
                  {healthSummary.readings?.[0]?.systolic || "--"}/
                  {healthSummary.readings?.[0]?.diastolic || "--"}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600">Medications</p>
                <p className="text-2xl font-bold">
                  {healthSummary.medications?.length || 0}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600">AI Risk Score</p>
                <p className="text-2xl font-bold">
                  {healthSummary.aiAnalysis?.riskScore || "--"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthHub;
