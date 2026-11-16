import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

function showStartupError(title, detail) {
  const root = document.getElementById("root");
  if (!root) return;
  const panel = document.createElement("main");
  panel.style.cssText = "max-width:760px;margin:28px auto;padding:24px;border:1px solid #fecaca;border-radius:14px;background:#fff7f7;color:#7f1d1d;font:14px/1.5 Arial,sans-serif;overflow-wrap:anywhere";
  const heading = document.createElement("h2");
  heading.textContent = title;
  const message = document.createElement("pre");
  message.style.cssText = "white-space:pre-wrap;background:white;padding:12px;border-radius:8px";
  message.textContent = String(detail || "Unknown application error");
  const note = document.createElement("p");
  note.textContent = "Please share a screenshot of this error. Your browser data has not been intentionally cleared.";
  panel.append(heading, message, note);
  root.replaceChildren(panel);
}

window.addEventListener("error", (event) => {
  showStartupError("Family Finance Manager – JavaScript error", event.error?.stack || event.message);
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  showStartupError("Family Finance Manager – Loading error", reason?.stack || reason?.message || reason);
});

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Application render error", error, info); }
  render() {
    if (this.state.error) {
      return React.createElement("main", { style: { maxWidth: 760, margin: "28px auto", padding: 24, color: "#7f1d1d", background: "#fff7f7", border: "1px solid #fecaca", borderRadius: 14, fontFamily: "Arial", overflowWrap: "anywhere" } },
        React.createElement("h2", null, "Family Finance Manager could not render"),
        React.createElement("pre", { style: { whiteSpace: "pre-wrap" } }, this.state.error.stack || this.state.error.message || String(this.state.error)),
        React.createElement("p", null, "Please share a screenshot of this error."));
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  showStartupError("Application setup error", "The page is missing the #root element.");
} else {
  try {
    createRoot(rootElement).render(
      React.createElement(AppErrorBoundary, null, React.createElement(App))
    );
  } catch (error) {
    showStartupError("Family Finance Manager could not start", error?.stack || error?.message || error);
  }
}
