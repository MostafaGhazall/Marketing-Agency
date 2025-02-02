import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Move the client logo list outside to avoid recreating on every render
const clientLogos = Array.from({ length: 10 }).map((_, i) => i + 1);

const WhoWeServe: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const carX = useTransform(scrollYProgress, [0, 1], ["-300%", "1600%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Check if pointer is coarse (touch device) to disable hover effects
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Logo hover/tap variants
  const logoVariants: Variants = {
    initial: {
      scale: 1,
      filter: "grayscale(100%)",
    },
    hover: {
      scale: 1.1,
      filter: "grayscale(0%)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 1,
    },
  };

  return (
    <section
      id="who-we-serve"
      className="relative w-full bg-primary text-white py-16 px-6 md:px-28 flex flex-col items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="
          absolute top-0 left-0 w-full
          h-[30vh] md:h-[50vh]
          bg-cover bg-center
          flex flex-col items-center justify-center
        "
        style={{
          backgroundImage: "url('/whoweserve/whoweserve2.jpg')",
          y: bgY,
          // GPU hints for smoother parallax
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Header Positioned Over the Car */}
        <div className="absolute top-[15%] text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="block text-[#d70e0e] text-2xl tracking-wide">
              GROW YOUR
            </span>
            Business with Confidence
          </h2>
        </div>

        {/* Moving Car */}
        <motion.img
          src="/whoweserve/car.png"
          alt="Moving Car"
          className="absolute bottom-13 left-0 w-[200px] sm:w-[250px] md:w-[350px]"
          style={{
            x: carX,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>

      {/* Content Below */}
      <div className="relative z-10 text-center max-w-3xl mt-[23vh] md:mt-[41vh]">
        <p className="text-base sm:text-lg md:text-base text-accent leading-relaxed">
          FLAIR's comprehensive services are designed to provide support to
          companies seeking expertise in digital marketing and public relations.
          Our primary goal is to help businesses to achieve their growth
          objectives.
          <br />
          <span className="font-semibold text-secondary text-xl">
            Here are some of the clients we've had the privilege to support.
          </span>
        </p>
      </div>

      {/* Client Logos */}
      <motion.div
        className="
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8
          w-full max-w-4xl mx-auto
          justify-items-center items-center mt-12
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {clientLogos.map((num) => (
          <motion.img
            key={num}
            src={`/clients/client${num}.png`}
            alt={`Client ${num}`}
            className="
              w-[120px] sm:w-[140px] md:w-[160px]
              h-[80px] sm:h-[100px] md:h-[100px]
              object-contain
            "
            variants={logoVariants}
            initial="initial"
            // Only animate on hover/tap if not touch
            whileHover={!isTouch ? "hover" : undefined}
            whileTap={!isTouch ? "tap" : undefined}
          />
        ))}
      </motion.div>
    </section>
  );
};

// Memoize the entire component to avoid unnecessary re-renders
export default React.memo(WhoWeServe);
