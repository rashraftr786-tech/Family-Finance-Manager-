import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rootElement = document.getElementById("root");

function showFatalError(title, detail) {
  if (!rootElement) return;
  rootElement.innerHTML = "";
  const panel = document.createElement("section");
  panel.style.cssText = "max-width:760px;margin:32px auto;padding:24px;border:1px solid #fecaca;border-radius:14px;background:#fff7f7;color:#7f1d1d;font:14px/1.5 Arial,sans-serif;overflow-wrap:anywhere";
  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.style.cssText = "margin:0 0 12px;font-size:20px";
  const message = document.createElement("pre");
  message.textContent = String(detail ?? "Unknown error");
  message.style.cssText = "white-space:pre-wrap;margin:0;padding:12px;background:#fff;border-radius:8px";
  const hint = document.createElement("p");
  hint.textContent = "Please take a screenshot of this message and share it with the developer. Do not delete repository files.";
  panel.append(heading, message, hint);
  rootElement.append(panel);
}

window.addEventListener("error", (event) => {
  showFatalError("Family Finance Manager – JavaScript error", event.error?.stack || event.message || "Unknown browser error");
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  showFatalError("Family Finance Manager – Loading error", reason?.stack || reason?.message || reason || "Unknown loading error");
});

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("Family Finance Manager render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return React.createElement("div", { style: { maxWidth: 760, margin: "32px auto", padding: 24, color: "#7f1d1d", background: "#fff7f7", border: "1px solid #fecaca", borderRadius: 14, fontFamily: "Arial", overflowWrap: "anywhere" } },
        React.createElement("h2", null, "Family Finance Manager could not render"),
        React.createElement("pre", { style: { whiteSpace: "pre-wrap" } }, this.state.error.stack || this.state.error.message || String(this.state.error)),
        React.createElement("p", null, "Please share a screenshot of this error. Your saved browser data has not been intentionally cleared by this error screen.")
      );
    }
    return this.props.children;
  }
}

if (!rootElement) {
  showFatalError("Application setup error", "The HTML page does not contain an element with id=\"root\".");
} else {
  const root = createRoot(rootElement);
  import("./App.jsx")
    .then(({ default: App }) => {
      root.render(React.createElement(AppErrorBoundary, null, React.createElement(App)));
    })
    .catch((error) => {
      console.error("Family Finance Manager module loading failed:", error);
      showFatalError("Family Finance Manager could not load", error?.stack || error?.message || error);
    });
}
