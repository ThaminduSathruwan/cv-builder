import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 flex justify-center items-center">
      <span className="px-4">
        &copy; {new Date().getFullYear()} Thamindu Sathruwan
      </span>
      <div className="flex space-x-4">
        <a
          href="https://www.linkedin.com/in/thamindu-sathruwan-b0610921b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/ThaminduSathruwan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
