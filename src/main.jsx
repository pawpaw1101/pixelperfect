import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./index.css";
import App from "./App";

function RoutedApp() {
  const location = useLocation();

  return (
    <App routeKey={location.pathname}>
      <Routes>
        <Route path="/" element={<App.Home />} />
        <Route path="/services" element={<App.ServicesPage />} />
        <Route path="/portfolio" element={<App.PortfolioPage />} />
        <Route path="/portfolio/nestle" element={<App.PortfolioNestlePage />} />
        <Route path="/portfolio/swat" element={<App.PortfolioSwatPage />} />
        <Route path="/portfolio/meta" element={<App.PortfolioMetaPage />} />
        <Route path="/campus-masters" element={<App.CampusMastersShell />} />
      </Routes>
    </App>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <RoutedApp />
    </BrowserRouter>
  </React.StrictMode>,
);
