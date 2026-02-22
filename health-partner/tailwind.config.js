/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emergency: {
          critical: "#ef4444",
          warning: "#f59e0b",
          safe: "#10b981",
        },
      },
      animation: {
        "pulse-critical": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-blue-500",
    "text-red-600",
    "text-green-600",
    "text-yellow-600",
    "border-red-200",
    "border-green-200",
    "border-yellow-200",
  ],
};
