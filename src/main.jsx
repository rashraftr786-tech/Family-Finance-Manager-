import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

window.addEventListener("error", (event) => {
  document.body.innerHTML = `
    <div style="padding:20px;color:#b91c1c;font-family:Arial">
      <h2>Application Error</h2>
      <pre style="white-space:pre-wrap">${event.message}</pre>
    </div>`;
});

window.addEventListener("unhandledrejection", (event) => {
  document.body.innerHTML = `
    <div style="padding:20px;color:#b91c1c;font-family:Arial">
      <h2>Application Loading Error</h2>
      <pre style="white-space:pre-wrap">${event.reason}</pre>
    </div>`;
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
