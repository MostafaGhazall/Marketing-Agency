import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Close icon

interface CaseStudyModalProps {
  title: string;
  image: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  title,
  image,
  description,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal on click outside
    >
      {/* Modal Content (Prevents click outside from closing when clicking inside) */}
      <motion.div
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto custom-scrollbar"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#d32222] mb-4">{title}</h2>

        {/* Cover Image */}
        <img src={image} alt={title} className="w-full rounded-md mb-6" />

        {/* Case Study Details */}
        <div className="space-y-6 text-gray-700">
          <h3 className="text-xl font-semibold">Client Overview</h3>
          <p>{description}</p>

          <h3 className="text-xl font-semibold">The Challenge</h3>
          <p>Describe the business challenge and the obstacles the client faced.</p>

          <h3 className="text-xl font-semibold">Our Solution</h3>
          <p>Explain how your company provided a solution to the challenge.</p>

          <h3 className="text-xl font-semibold">Key Actions Taken</h3>
          <p>Highlight the key steps and processes that were implemented.</p>

          <h3 className="text-xl font-semibold">The Results</h3>
          <p>Showcase measurable outcomes and successes from the project.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyModal;
