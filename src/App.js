// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from './components/Header'; // Make sure this is imported!

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import EducationProgram from "./pages/EducationProgram";
import HealthcareInitiatives from "./pages/HealthcareInitiatives";
import FoodDistribution from "./pages/FoodDistribution";
import DisasterRelief from "./pages/DisasterRelief";
import WomenEmpowerment from "./pages/WomenEmpowerment";
import ElderlyCare from "./pages/ElderlyCare";
import Blog from "./pages/Blog";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import "./App.css";

const AppLayout = () => {
  const location = useLocation();

  // 🟡 Define routes where Header and Footer should be hidden
  const hideLayout = ['/', '/login', '/signup', '/forgot-password', '/admin'].includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!hideLayout && <Header />}
      <div style={{ paddingTop: !hideLayout ? "70px" : 0 }}>
        <Routes>
          {/* Auth/Admin pages */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          {/* Main site pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/education-programs" element={<EducationProgram />} />
          <Route path="/healthcare-initiatives" element={<HealthcareInitiatives />} />
          <Route path="/food-distribution" element={<FoodDistribution />} />
          <Route path="/disaster-relief" element={<DisasterRelief />} />
          <Route path="/women-empowerment" element={<WomenEmpowerment />} />
          <Route path="/elderly-care" element={<ElderlyCare />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/blog3" element={<Blog3 />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppLayout />
      </Router>
    </LanguageProvider>
  );
}

export default App;
