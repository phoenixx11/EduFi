import React from 'react';
import { FaVideo, FaChartBar, FaBook } from 'react-icons/fa';
import Link from 'next/link'; // Import Link from Next.js

const EducationComponent: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Learn About Web3</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Interactive Tutorials */}
          <div className="flex-1 bg-blue-50 p-6 rounded-md shadow-md text-center">
            <FaBook className="text-4xl mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Interactive Tutorials</h3>
            <p className="text-gray-600">
              Engage with step-by-step modules to understand the basics of Web3 and blockchain technology.
            </p>
          </div>

          {/* Video Content */}
          <div className="flex-1 bg-green-50 p-6 rounded-md shadow-md text-center">
            <FaVideo className="text-4xl mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Video Content</h3>
            <p className="text-gray-600">
              Watch simple explainer videos tailored to your understanding level, making complex concepts easy to grasp.
            </p>
          </div>

          {/* Infographics */}
          <div className="flex-1 bg-yellow-50 p-6 rounded-md shadow-md text-center">
            <FaChartBar className="text-4xl mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Infographics</h3>
            <p className="text-gray-600">
              Visual representations of how blockchain benefits your community, enhancing comprehension through visuals.
            </p>
          </div>
        </div>

        {/* Button in Bottom Right Corner */}
        <div className="fixed bottom-4 right-4">
          <Link href="/learn" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EducationComponent;