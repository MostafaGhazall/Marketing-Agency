import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

// Counter Component
const Counter = React.memo(function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const step = Math.ceil(value / 80);
      const interval = setInterval(() => {
        if (start < value) {
          start += step;
          if (start > value) start = value;
          setDisplayValue(start);
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      className="text-4xl sm:text-5xl md:text-7xl font-bold text-secondary"
    >
      {displayValue}+ 
    </motion.span>
  );
});

// Slide Component
interface SlideProps {
  image: string;
  active: boolean;
  next: boolean;
  onClick: () => void;
}
const Slide = React.memo(function Slide({ image, active, next, onClick }: SlideProps) {
  const zIndex = active ? 10 : next ? 5 : 1;
  const scale = active ? 1 : 0.9;
  const translateX = active ? "0px" : next ? "-40px" : "40px";
  const rotate = active ? "0deg" : next ? "-10deg" : "10deg";

  return (
    <motion.div
      className="absolute w-full h-full bg-cover bg-center rounded-xl shadow-xl cursor-pointer"
      style={{
        backgroundImage: `url(${image})`,
        zIndex,
        willChange: "transform",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      animate={{
        transform: `translateZ(0) scale(${scale}) translateX(${translateX}) rotate(${rotate})`,
      }}
      transition={{ duration: 0.6 }}
      onClick={onClick} // Make cards clickable
    />
  );
});

// Slide Data
const slides = [
  {
    image: "/whyus/whyus1.jpg",
    text: "We provide top-tier marketing solutions tailored to your business needs.",
  },
  {
    image: "/whyus/whyus2.jpg",
    text: "Our team of experts ensures a seamless and effective digital experience.",
  },
  {
    image: "/whyus/whyus3.jpg",
    text: "We drive growth with a strategic, data-driven approach for measurable success.",
  },
];

const WhyUs: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Precompute active/next for each slide
  const slidesWithStates = useMemo(() => {
    return slides.map((slide, i) => ({
      ...slide,
      active: i === index,
      next: i === (index + 1) % slides.length,
    }));
  }, [index]);

  return (
    <section
      className="relative w-full bg-primary text-white py-16 px-6 md:px-28 flex justify-center items-center"
      style={{ willChange: "transform", backfaceVisibility: "hidden" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-28 w-full max-w-[1200px]">
        {/* Left Side - Stacked Cards */}
        <div
          className="relative w-[90%] max-w-sm md:w-[450px] md:max-w-none h-[350px] md:h-[600px] mx-auto md:mx-0 flex justify-center items-center"
          style={{
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Slide Cards (Now Clickable) */}
          {slidesWithStates.map((slide, i) => (
            <Slide
              key={i}
              image={slide.image}
              active={slide.active}
              next={slide.next}
              onClick={() => setIndex(i)} // Clicking a card switches to that slide
            />
          ))}

          {/* Dot Indicators (Now Above the Cards) */}
          <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-secondary scale-125" : "bg-accent"
                } transition-all duration-300`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Text + Counters */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Why Us Heading */}
          <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide text-secondary mb-2">
            Why Us
          </h3>

          {/* Changing Text */}
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, translateZ: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight will-change-transform"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {slides[index].text}
          </motion.h2>

          {/* Counter Section */}
          <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-10">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase text-accent">Working Hours</p>
              <Counter value={9000} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm uppercase text-accent">Happy Clients</p>
              <Counter value={50} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm uppercase text-accent">
                Years of Experience
              </p>
              <Counter value={12} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyUs);
