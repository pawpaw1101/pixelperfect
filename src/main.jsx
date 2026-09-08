import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./index.css";
import App from "./App";

function RoutedApp() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <App routeKey={location.pathname}>
      <Routes>
        <Route path="/" element={<App.Home />} />
        <Route path="/services" element={<App.ServicesPage />} />
        <Route path="/portfolio" element={<App.PortfolioPage />} />
        <Route path="/portfolio/nestle" element={<App.PortfolioNestlePage />} />
        <Route path="/portfolio/swat" element={<App.PortfolioSwatPage />} />
        <Route path="/portfolio/buy-win-crosstrek-2025" element={<App.PortfolioCrosstrekPage />} />
        <Route path="/portfolio/buy-win-magnite-2025" element={<App.PortfolioMagnitePage />} />
        <Route path="/portfolio/kitkat-hazelnut-cereals" element={<App.PortfolioKitKatPage />} />
        <Route path="/portfolio/nestle-dubai-it" element={<App.PortfolioNestleDubaiItPage />} />
        <Route path="/portfolio/uae-swat-challenge-game" element={<App.PortfolioUaeSwatChallengeGamePage />} />
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
