import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AboutExante from "./pages/AboutExante/AboutExante";
import AboutRevolut from "./pages/AboutRevolut/AboutRevolut";
import Main from "./pages/Main";

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/revolut-details" element={<AboutRevolut />} />
      <Route path="/exante-details" element={<AboutExante />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default AppRouter;
