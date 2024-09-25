import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

console.log("CURRENT ENV:", process.env.DOMAIN_URL);
const root = ReactDOM.createRoot(
  document.getElementById("appContainer") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
