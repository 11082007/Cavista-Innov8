// // const CACHE_NAME = "vytal-v1";
// // const API_CACHE_NAME = "vytal-api-v1";
// // const OFFLINE_URL = "/offline.html";

// // // Assets to cache on install
// // const STATIC_ASSETS = [
// //   "/",
// //   "/index.html",
// //   "/manifest.json",
// //   "/offline.html",
// //   "/src/main.jsx",
// //   "/src/index.css",
// //   "/icons/icon-72x72.png",
// //   "/icons/icon-96x96.png",
// //   "/icons/icon-128x128.png",
// //   "/icons/icon-144x144.png",
// //   "/icons/icon-152x152.png",
// //   "/icons/icon-192x192.png",
// //   "/icons/icon-384x384.png",
// //   "/icons/icon-512x512.png",
// // ];

// // // Install event - cache static assets
// // self.addEventListener("install", (event) => {
// //   console.log("Service Worker installing...");
// //   event.waitUntil(
// //     caches
// //       .open(CACHE_NAME)
// //       .then((cache) => cache.addAll(STATIC_ASSETS))
// //       .then(() => self.skipWaiting()),
// //   );
// // });

// // // Activate event - clean up old caches
// // self.addEventListener("activate", (event) => {
// //   console.log("Service Worker activating...");
// //   event.waitUntil(
// //     caches
// //       .keys()
// //       .then((cacheNames) => {
// //         return Promise.all(
// //           cacheNames.map((cacheName) => {
// //             if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
// //               return caches.delete(cacheName);
// //             }
// //           }),
// //         );
// //       })
// //       .then(() => self.clients.claim()),
// //   );
// // });

// // // Fetch event - handle offline requests
// // self.addEventListener("fetch", (event) => {
// //   const url = new URL(event.request.url);

// //   // API requests - Network first, then cache
// //   if (url.pathname.startsWith("/api/")) {
// //     event.respondWith(
// //       fetch(event.request)
// //         .then((response) => {
// //           // Cache successful API responses
// //           if (response.status === 200) {
// //             const responseClone = response.clone();
// //             caches.open(API_CACHE_NAME).then((cache) => {
// //               cache.put(event.request, responseClone);
// //             });
// //           }
// //           return response;
// //         })
// //         .catch(() => {
// //           // Return cached response if offline
// //           return caches.match(event.request).then((cachedResponse) => {
// //             if (cachedResponse) {
// //               return cachedResponse;
// //             }
// //             // Return offline fallback for HTML requests
// //             if (event.request.headers.get("Accept").includes("text/html")) {
// //               return caches.match("/offline.html");
// //             }
// //             return new Response(
// //               JSON.stringify({
// //                 error: "offline",
// //                 message: "You are offline. Showing cached data.",
// //               }),
// //               {
// //                 status: 503,
// //                 headers: { "Content-Type": "application/json" },
// //               },
// //             );
// //           });
// //         }),
// //     );
// //   }
// //   // Static assets - Cache first, then network
// //   else {
// //     event.respondWith(
// //       caches.match(event.request).then((cachedResponse) => {
// //         return (
// //           cachedResponse ||
// //           fetch(event.request).then((response) => {
// //             // Cache new static assets
// //             if (response.status === 200) {
// //               const responseClone = response.clone();
// //               caches.open(CACHE_NAME).then((cache) => {
// //                 cache.put(event.request, responseClone);
// //               });
// //             }
// //             return response;
// //           })
// //         );
// //       }),
// //     );
// //   }
// // });

// // // Background sync for offline updates
// // self.addEventListener("sync", (event) => {
// //   if (event.tag === "sync-updates") {
// //     event.waitUntil(syncPendingUpdates());
// //   }
// // });

// // async function syncPendingUpdates() {
// //   try {
// //     const clients = await self.clients.matchAll();
// //     clients.forEach((client) => {
// //       client.postMessage({
// //         type: "SYNC_TRIGGERED",
// //         timestamp: Date.now(),
// //       });
// //     });
// //   } catch (error) {
// //     console.error("Background sync failed:", error);
// //   }
// // }

// // // Push notifications
// // self.addEventListener("push", (event) => {
// //   const data = event.data.json();

// //   const options = {
// //     body: data.body,
// //     icon: "/icons/icon-192x192.png",
// //     badge: "/icons/icon-72x72.png",
// //     vibrate: [200, 100, 200],
// //     data: {
// //       url: data.url || "/",
// //     },
// //     actions: [
// //       {
// //         action: "open",
// //         title: "Open VYTAL",
// //       },
// //       {
// //         action: "dismiss",
// //         title: "Dismiss",
// //       },
// //     ],
// //   };

// //   event.waitUntil(self.registration.showNotification(data.title, options));
// // });

// // // Notification click handler
// // self.addEventListener("notificationclick", (event) => {
// //   event.notification.close();

// //   if (event.action === "dismiss") {
// //     return;
// //   }

// //   event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
// // });
// const CACHE_NAME = "vytal-v1";
// const urlsToCache = ["/", "/index.html", "/manifest.json"];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => response || fetch(event.request)),
//   );
// });
const CACHE_NAME = "vytal-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
  });
});
