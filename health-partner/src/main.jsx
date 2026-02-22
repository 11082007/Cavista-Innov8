// // // // // import { StrictMode } from "react";
// // // // // import { createRoot } from "react-dom/client";

// // // // // import App from "./App.jsx";

// // // // // createRoot(document.getElementById("root")).render(
// // // // //   <StrictMode>
// // // // //     <App />
// // // // //   </StrictMode>,
// // // // // );
// // // // // main.jsx
// // // // import React from "react";
// // // // import ReactDOM from "react-dom/client";
// // // // import App from "./App";
// // // // import "./index.css";

// // // // ReactDOM.createRoot(document.getElementById("root")).render(
// // // //   <React.StrictMode>
// // // //     <App />
// // // //   </React.StrictMode>,
// // // // );

// // // import React from "react";
// // // import ReactDOM from "react-dom/client";
// // // import App from "./App";
// // // import "./index.css";

// // // // Register service worker
// // // if ("serviceWorker" in navigator) {
// // //   window.addEventListener("load", () => {
// // //     navigator.serviceWorker
// // //       .register("/sw.js")
// // //       .then((registration) => {
// // //         console.log("SW registered: ", registration);
// // //       })
// // //       .catch((error) => {
// // //         console.log("SW registration failed: ", error);
// // //       });
// // //   });
// // // }

// // // ReactDOM.createRoot(document.getElementById("root")).render(
// // //   <React.StrictMode>
// // //     <App />
// // //   </React.StrictMode>,
// // // );
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import App from "./App";
// // import "./index.css";

// // // PWA registration
// // if ("serviceWorker" in navigator) {
// //   window.addEventListener("load", () => {
// //     navigator.serviceWorker.register("/sw.js");
// //   });
// // }

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// // );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("✅ PWA registered successfully");
      })
      .catch((error) => {
        console.log("❌ PWA registration failed:", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
