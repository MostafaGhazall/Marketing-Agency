import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import WhyUs from "./sections/WhyUs";
import WhoWeServe from "./sections/WhoWeServe";
import CaseStudies from "./sections/CaseStudies";
import Portfolio from "./sections/Portfolio";
import ContactUs from "./sections/ContactUs";

const App: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default App;
