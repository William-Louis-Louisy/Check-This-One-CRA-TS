import React from "react";
import ReactDOM from "react-dom/client";
import { ToastProvider } from "react-toast-notifications";
import "../src/styles/index.css";
import App from "./App";
import AppProvider from "./contexts/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider placement="top-right">
      <AppProvider>
        <App />
      </AppProvider>
    </ToastProvider>
  </React.StrictMode>
);
