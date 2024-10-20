'use client';
import React from 'react';
import { FaGraduationCap, FaGlobe, FaCoins } from 'react-icons/fa'; // Icons for design consistency
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to EduFi</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          At EduFi, we are on a mission to make blockchain and decentralized finance accessible to everyone. Whether you're completely new to the space or already have some knowledge, we offer structured learning paths to guide you from beginner to expert.
        </p>

        {/* Two Paths Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Two Paths, One Goal: Blockchain for Everyone</h2>
          <p className="text-center max-w-2xl mx-auto">
            Our platform caters to two groups: <span className="font-bold">beginners</span> who know nothing about blockchain, and <span className="font-bold">intermediate learners</span> who want to deepen their understanding. Wherever you're starting from, we have the resources you need to succeed.
          </p>
        </div>

        {/* Journey into Blockchain Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Your Journey into Blockchain: Three Levels to Mastery</h2>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 text-center">
            
            {/* Seedling Stage */}
            <div className="flex-1 bg-blue-50 p-6 rounded-md shadow-md">
              <FaGraduationCap className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Seedling Stage</h3>
              <p>Perfect for beginners with no prior knowledge of blockchain. Start from the basics till you start making transactions onchain.</p>
            </div>

            {/* Explorer Stage */}
            <div className="flex-1 bg-green-50 p-6 rounded-md shadow-md">
              <FaCoins className="text-4xl mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Explorer Stage</h3>
              <p>For learners with basic blockchain understanding. Dive deeper into the mechanics of blockchain and DeFi.</p>
            </div>

            {/* Pioneer Stage */}
            <div className="flex-1 bg-yellow-50 p-6 rounded-md shadow-md">
              <FaGlobe className="text-4xl mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Pioneer Stage</h3>
              <p>Advanced courses for those ready to apply their skills and become devs/leaders in the blockchain space.</p>
            </div>
          </div>
        </div>

        {/* Bilingual Accessibility Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Learn in Hindi or English</h2>
          <p className="text-center max-w-2xl mx-auto">
            Whether you prefer to learn in English or Hindi, we've got you covered. Our courses are available in both languages to ensure that language is never a barrier to education.
          </p>
        </div>

        {/* Free Courses for Beginners Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Free Courses for Beginners</h2>
          <p className="text-center max-w-2xl mx-auto">
            We believe in making education accessible. Our beginner courses are completely free, so you can start learning without any financial commitment.
          </p>
          <div className="text-center mt-4">
            {/* Updated Link without nested anchor tag */}
            <Link href="/learn" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
              Start Learning Now
            </Link>
          </div>
        </div>

        {/* Unlock Your Future Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Unlock Your Future with Web3 and DeFi</h2>
          <p className="text-center max-w-2xl mx-auto">
            With the knowledge you gain, you'll be prepared to take part in the revolutionary world of Web3. From earning certifications to exploring decentralized finance, your journey starts here.
          </p>
        </div>

        {/* Join the Community Section */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Join the Community</h2>
          <p className="max-w-2xl mx-auto mb-6">Connect with fellow learners, collaborate on projects, and grow together. Our community is here to support your journey.</p>
          {/* Updated Link without nested anchor tag */}
          <Link href="/community" className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200">
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
