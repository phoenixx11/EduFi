// src/app/dashboard/page.tsx
'use client'

import React from 'react';
import ServiceCard from '../../components/ServiceCard';
import TransactionHistory from '../../components/TransactionHistory';
import useOnchain from '../../hooks/useOnchain';

const Dashboard: React.FC = () => {
  useOnchain(); // Initialize OnchainKit

  const services = [
    {
      title: 'Healthcare Aid',
      description: 'Access various healthcare services and aid programs.',
      link: '/services/healthcare-aid',
      icon: '🏥', // Replace with actual icons or images
    },
    {
      title: 'Education Scholarship',
      description: 'Apply for education scholarships to support your studies.',
      link: '/services/education-scholarship',
      icon: '🎓',
    },
    {
      title: 'Banking Services',
      description: 'Manage your funds with our secure banking services.',
      link: '/services/banking-services',
      icon: '🏦',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">Welcome, [Basename]</h2>
        <p className="text-gray-600">Manage your community services below.</p>
      </div>

      {/* Services */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Services</h3>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* Transaction History */}
      <section>
        <h3 className="text-2xl font-semibold mb-6">Transaction History</h3>
        <TransactionHistory />
      </section>
    </div>
  );
};

export default Dashboard;

