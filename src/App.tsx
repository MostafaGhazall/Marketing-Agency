import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import WhyUs from "./sections/WhyUs";
import WhoWeServe from "./sections/WhoWeServe";
import CaseStudies from "./sections/CaseStudies";
import Portfolio from "./sections/Portfolio";
import ContactUs from "./sections/ContactUs";
import BookingPage from "./components/BookingPage";

const App: React.FC = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="font-sans">
      {/* Hide Navbar only on the Booking Page */}
      {location.pathname !== "/booking" && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Home />
              </section>
              <section id="why-us">
                <WhyUs />
              </section>
              <section id="who-we-serve">
                <WhoWeServe />
              </section>
              <section id="case-studies">
                <CaseStudies />
              </section>
              <section id="portfolio">
                <Portfolio />
              </section>
              <section id="contact-us">
                <ContactUs />
              </section>
            </>
          }
        />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
