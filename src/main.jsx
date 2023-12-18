import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ViewContextProvider } from "./contexts/ViewContext.jsx";
import { AuthProvider } from "@asgardeo/auth-react";
import { default as config } from "./config.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <ViewContextProvider>
        <App />
      </ViewContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
