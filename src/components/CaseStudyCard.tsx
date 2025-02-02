import React from "react";
import { motion } from "framer-motion";

interface CaseStudyProps {
  title: string;
  description: string;
  image: string;
  index: number;
  onClick: () => void;
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({ title, description, image, index, onClick }) => {
  return (
    <motion.div
      className={`group relative block overflow-hidden rounded-lg bg-[#2a2a2a] shadow-lg cursor-pointer ${
        index % 2 === 1 ? "md:mt-28" : ""
      }`}
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
      onClick={onClick} // Open modal on click
    >
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      <div className="p-5 transition-colors duration-300">
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#d32222]">
          {title}
        </h3>
        <p className="text-white text-sm mt-2 transition-colors duration-300 group-hover:text-gray-200">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
