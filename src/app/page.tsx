// src/app/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import EducationComponent from '../components/EducationComponent';
import Testimonials from '../components/Testimonials';
//import WalletConnectButton from '../components/WalletConnectButton';
import { useAccount } from 'wagmi';
import  WalletWrapper  from '../components/WalletWrapper'; 

const LandingPage: React.FC = () => {
  const { isConnected } = useAccount();

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
            <Link href="/learn" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
              Learn More
            </Link>
            <Link href="/register" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Component */}
      <EducationComponent />

      {/* Wallet Connection Section */}
      <div className="container mx-auto px-4 py-12">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-8">Wallet Connection</h2>
          {isConnected ? (
            // If connected, show wallet information or relevant content
            <p className="text-center">You are connected!</p> 
          ) : (
            // If not connected, show the WalletWrapper for connecting
            <WalletWrapper 
              className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
              text="Connect Your Wallet"
              withWalletAggregator={true} // Optional: set to true if you want to use wallet aggregator feature
            />
          )}
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
};

export default LandingPage;





