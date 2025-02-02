import React, { useState } from "react";
import CaseStudyCard from "../components/CaseStudyCard";
import CaseStudyModal from "../components/CaseStudyModal";

const caseStudies = [
  {
    title: "FLAIR Boosts OzParty's Bucks Bookings by 36%",
    description:
      "A series of landing page redesigns targeting increased conversions allowed FLAIR to boost bookings by 36% for Sydney event planner OzParty.",
    image: "/case-studies/case1.png",
  },
  {
    title: "FLAIR's Successful Google Analytics 4 Implementation for Convertr",
    description:
      "FLAIR’s Google Analytics 4 rollout for Convertr transformed their data analytics, ensuring accurate lead attribution and effective ad spend.",
    image: "/case-studies/case2.png",
  },
  {
    title: "TASK Group's Merger with Plexure - Maintaining Visibility in Search",
    description:
      "FLAIR navigated the TASK Group merger, uniting Plexure and TASK websites into one cohesive digital identity, preserving search performance.",
    image: "/case-studies/case3.png",
  },
  {
    title: "Khoros and FLAIR Case Study",
    description:
      "Khoros is a leading provider of digital customer engagement solutions for enterprise businesses.",
    image: "/case-studies/case4.jpg",
  },
];

const CaseStudies: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);

  return (
    <section className="relative w-full bg-primary text-secondary py-16 px-6 md:px-28">
      {/* Top Section */}
      <div className="border-t-2 border-secondary w-full mb-6"></div>
      <div className="mb-10">
        <h2 className="text-4xl font-light">Case Studies</h2>
        <p className="text-accent mt-2 font-bold">
          Companies That Trust Us Get These Results...
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyCard
            key={index}
            index={index}
            title={caseStudy.title}
            description={caseStudy.description}
            image={caseStudy.image}
            onClick={() => setSelectedCaseStudy(caseStudy)} // Open modal on click
          />
        ))}
      </div>

      {/* Modal */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        title={selectedCaseStudy?.title || ""}
        description={selectedCaseStudy?.description || ""}
        image={selectedCaseStudy?.image || ""}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};

export default CaseStudies;
