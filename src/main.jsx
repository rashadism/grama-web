import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ViewContextProvider } from "./contexts/ViewContext.jsx";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  baseUrl: window.config.baseUrl,
  clientID: window.config.clientID,
  scope: window.config.scope,
  signInRedirectURL: window.config.signInRedirectURL,
  signOutRedirectURL: window.config.signOutRedirectURL,
  
}

console.log(config)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <ViewContextProvider>
        <App />
      </ViewContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
