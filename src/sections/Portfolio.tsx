import React from "react";
import { motion } from "framer-motion";

// Sample project images
const projects = [
  { id: 1, image: "/portfolio/project1.jpg" },
  { id: 2, image: "/portfolio/project2.png" },
  { id: 3, image: "/portfolio/project3.jpg" },
  { id: 4, image: "/portfolio/project4.jpg" },
  { id: 5, image: "/portfolio/project5.jpg" },
  { id: 6, image: "/portfolio/project6.jpg" },
];

const Portfolio: React.FC = () => {
  return (
    <section className="relative w-full bg-primary text-white">
      {/* Banner Section */}
      <div className="relative w-full h-80">
        <img
          src="/portfolio/banner2.jpg"
          alt="Portfolio Banner"
          className="w-full h-full object-cover"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="relative text-4xl md:text-6xl font-bold inline-block">
            <span className="relative z-10">Portfolio.</span>
            {/* Underline Behind */}
            <span className="absolute left-0 bottom-1 w-full h-[8px] bg-[#eb2525] opacity-90 z-0"></span>
          </h2>
          <p className="text-lg md:text-xl mt-2 max-w-2xl">
            Curious about what we can do? Get a taste of our portfolio here,
            and contact us to see the full version.
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 md:p-20">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`relative overflow-hidden rounded-lg ${
              index % 2 === 1 ? "md:my-10" : ""
            }`}
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
          >
            <img
              src={project.image}
              alt={`Project ${project.id}`}
              className="
                w-full
                h-50 md:h-full
                object-cover
                rounded-lg
                transition-transform duration-300
                hover:scale-105
              "
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
