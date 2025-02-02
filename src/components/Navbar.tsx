import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false); // Mobile "Company" dropdown

  const [isDropdownOpenDesktop, setIsDropdownOpenDesktop] = useState(false); // Desktop "Company" dropdown
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="bg-primary text-accent flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-50"
        initial={{ y: 0 }}
        animate={{ y: isNavbarVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img
            src="/logo22.png"
            alt="Marketing Agency Logo"
            className="h-10 w-auto ml-4"
          />
        </a>

        {/* =============== Desktop Menu (with Company Dropdown) =============== */}
        <div className="hidden md:flex items-center gap-4">
          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpenDesktop(true)}
            onMouseLeave={() => setIsDropdownOpenDesktop(false)}
          >
            <button
              className="hover:text-secondary transition-colors flex items-center gap-1"
              aria-label="Company Dropdown"
            >
              Company
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {isDropdownOpenDesktop && (
                <motion.div
                  key="desktop-dropdown"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full w-44 mt-2 bg-[#d3c7b6] shadow-xl rounded-md z-40"
                >
                  {/* Arrowhead */}
                  <div className="absolute top-0 left-6 w-3 h-3 bg-[#d3c7b6] transform rotate-45 -translate-y-1/2"></div>

                  <ul className="flex flex-col gap-2 p-4 pt-4">
                    <li>
                      <a
                        href="#why-us"
                        className="flex items-center gap-2 hover:text-secondary transition-colors"
                      >
                        <span className="h-2 w-2 bg-secondary rounded-full"></span>
                        Why Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#who-we-serve"
                        className="flex items-center gap-2 hover:text-secondary transition-colors"
                      >
                        <span className="h-2 w-2 bg-secondary rounded-full"></span>
                        Who We Serve
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Desktop Links */}
          <a href="#case-studies" className="hover:text-secondary transition-colors">
            Case Studies
          </a>
          <a href="#portfolio" className="hover:text-secondary transition-colors">
            Portfolio
          </a>
          <a href="#contact-us" className="hover:text-secondary transition-colors">
            Contact Us
          </a>
        </div>

        {/* =============== Mobile Menu Toggle Button =============== */}
        <button
          className="block md:hidden text-accent"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* =============== Mobile Dropdown Menu =============== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              className="flex flex-col items-start bg-primary w-full absolute top-full left-0 p-6 md:hidden gap-5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Company Dropdown for Mobile */}
              <li>
                <button
                  className="flex items-center gap-3 font-bold w-full text-left hover:text-secondary"
                  onClick={() => setIsDropdownOpenMobile((prev) => !prev)}
                >
                  <span className="h-3 w-3 bg-secondary rounded-full"></span>
                  Company <ChevronDown size={18} />
                </button>
                <AnimatePresence>
                  {isDropdownOpenMobile && (
                    <motion.ul
                      className="p-4 w-full"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {["why-us", "who-we-serve"].map((link) => (
                        <li key={link}>
                          <a
                            href={`#${link}`}
                            className="flex items-center gap-3 font-bold hover:text-secondary transition-colors text-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="h-2 w-2 bg-secondary rounded-full"></span>
                            {link
                              .replace("-", " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Other Links (Mobile) */}
              {["case-studies", "portfolio", "contact-us"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="flex items-center gap-3 font-bold hover:text-secondary transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="h-3 w-3 bg-secondary rounded-full"></span>
                    {link
                      .replace("-", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Push page content down so navbar doesn't overlap */}
      <div className="h-[72px] md:h-[80px]" />
    </>
  );
};

export default Navbar;
