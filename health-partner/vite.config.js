import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Caches your code for offline
      },
      manifest: {
        name: "AI Health Partner",
        short_name: "HealthAI",
        description: "AI-powered preventive healthcare for LGAs",
        theme_color: "#ffffff",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
        server: {
          port: 3000,
          open: true,
        },
      },
    }),
  ],
});
