import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const words = ["Strategic", "Impactful", "Reliable", "Dynamic"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const waveVariants = {
    hidden: (i: number) => ({
      y: "100%",
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
    visible: (i: number) => ({
      y: "-3%",
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
    exit: (i: number) => ({
      y: "-102%",
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section
      id="home"
      className="
        relative
        md:h-screen min-h-screen
        flex items-center
        text-white
        -mt-[4rem]
        bg-no-repeat
        bg-cover
        bg-right              /* Default: small screens => background anchored on the right */
        bg-[url('/home-mobile.png')]  /* Small screen background image */
        md:bg-[url('/home.png')]       /* Override on medium screens and up */
        md:bg-[center_75%]            /* Preserve existing desktop setting for md */
        lg:bg-[center_right]          /* Preserve existing setting for lg */
      "
    >
      {/* Content */}
      <div className="relative z-10 text-left px-6 md:ml-[10%]">
        {/* Wave Animation for Each Character */}
        <div className="overflow-hidden h-[80px] sm:h-[100px] md:h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              className="flex"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {words[currentWord].split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                  custom={index}
                  variants={waveVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Supporting Text */}
        <p className="text-xl sm:text-3xl md:text-6xl text-white font-bold sm:text-[#dcd4c7]">
          marketing
        </p>
        <p className="text-xl sm:text-3xl md:text-6xl mt-2 text-white font-bold sm:text-[#dcd4c7]">
          made simple
        </p>

        {/* Call-to-Action Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeS3v9kfWhn_yZnsOf17oZjCtn168kh1WuoaxMvOnfy09ZCOQ/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm sm:text-lg md:text-xl font-medium text-white group hover:text-[#1e1f21] transition"
        >
          Book a Call →
        </a>
      </div>
    </section>
  );
};

export default Home;
