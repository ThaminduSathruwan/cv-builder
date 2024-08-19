import React from "react";
import {
  FaUser,
  FaInfoCircle,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaCertificate,
  FaLanguage,
  FaToolbox,
  FaRunning,
} from "react-icons/fa";

const Sidebar = ({ onSelectSection }) => {
  const sections = [
    { name: "Personal Data", icon: <FaUser /> },
    { name: "About Me", icon: <FaInfoCircle /> },
    { name: "Education", icon: <FaGraduationCap /> },
    { name: "Work Experience", icon: <FaBriefcase /> },
    { name: "Projects", icon: <FaProjectDiagram /> },
    { name: "Conference and Certificates", icon: <FaCertificate /> },
    { name: "Languages", icon: <FaLanguage /> },
    { name: "Skills", icon: <FaToolbox /> },
    { name: "Major Involvements", icon: <FaRunning /> },
  ];

  return (
    <div className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
      {sections.map((section) => (
        <div
          key={section.name}
          className="flex flex-col items-center mb-6 cursor-pointer transition-all duration-300 text-gray-400 hover:text-blue-400"
          onClick={() => onSelectSection(section.name)}
        >
          <div className="text-2xl">{section.icon}</div>
          <div className="mt-2 text-sm hidden group-hover:block">
            {section.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
