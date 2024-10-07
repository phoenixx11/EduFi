// src/components/EducationComponent.tsx
import React from 'react';

const EducationComponent: React.FC = () => {
  const topics = [
    {
      title: 'What is Web3?',
      description: 'An introduction to Web3 and its applications in empowering communities.',
    },
    {
      title: 'Why Blockchain Matters',
      description: 'Understanding the importance of blockchain in ensuring transparency and security.',
    },
    {
      title: 'How to Use a Wallet',
      description: 'A simple guide to setting up and using your digital wallet.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Learn About Web3 and Blockchain</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {topics.map((topic, index) => (
            <div key={index} className="flex-1 border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationComponent;
