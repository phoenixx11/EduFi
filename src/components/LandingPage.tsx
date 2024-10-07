// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import EducationComponent from '../components/EducationComponent';
import Testimonials from '../components/Testimonials';

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Empowering Communities through Blockchain</h1>
          <p className="text-lg mb-8">
            Access healthcare aid, education scholarships, and banking services seamlessly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/learn" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
              Learn More
            </Link>
            <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Component */}
      <EducationComponent />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default LandingPage;
