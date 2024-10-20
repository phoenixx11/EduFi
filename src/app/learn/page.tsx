'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

const Courses: React.FC = () => {
  const recipientAddress = '0xF53d9cd438D245bd7BFf62EA2C2d1FE7Fa413c99'; // Replace with your wallet address

  const courseCategories = [
    {
      title: 'Seedling',
      description: 'Ideal for those with no prior blockchain knowledge.',
      color: 'bg-blue-50',
      levels: [
        {
          name: 'Beginner',
          whoCanWatch: 'Newcomers',
          cost: 'Free',
          content: 'Introduction to blockchain technology, wallets, and basic concepts.',
          isFree: true,
          link: '/courses/blockchain-basics/beginner',
        },
        {
          name: 'Intermediate',
          whoCanWatch: 'Basic understanding',
          cost: 'Free',
          content: 'Smart contracts, decentralized applications (DApps).',
          isFree: true,
          link: '/courses/blockchain-basics/intermediate',
        },
        {
          name: 'Advanced',
          whoCanWatch: 'Experienced',
          cost: 'Free',
          content: 'Advanced DeFi protocols and blockchain development.',
          isFree: true,
          link: '/courses/blockchain-basics/advanced',
        },
      ],
    },
    {
      title: 'Explorer',
      description: 'For those who want to dive into the world of DeFi.',
      color: 'bg-green-50',
      levels: [
        {
          name: 'Beginner',
          whoCanWatch: 'New to DeFi',
          cost: 'Free',
          content: 'Introduction to decentralized finance and its importance.',
          isFree: true,
          link: '/courses/decentralized-finance/beginner',
        },
        {
          name: 'Intermediate',
          whoCanWatch: 'Basic DeFi understanding',
          cost: '0.001Eth',
          content: 'Understanding liquidity pools, staking, and yield farming.',
          isFree: false,
          paymentAmount: '0.001',
        },
        {
          name: 'Advanced',
          whoCanWatch: 'DeFi Enthusiast',
          cost: '0.001Eth',
          content: 'Advanced DeFi strategies and protocol interactions.',
          isFree: false,
          paymentAmount: '0.001',
        },
      ],
    },
    {
      title: 'Pioneer',
      description: 'Perfect for aspiring blockchain developers.',
      color: 'bg-yellow-50',
      levels: [
        {
          name: 'Beginner',
          whoCanWatch: 'Coding beginners',
          cost: 'NA',
          content: 'Basic Solidity and Ethereum concepts.',
          isFree: true,
          link: '/courses/blockchain-basics/advanced',
        },
        {
          name: 'Intermediate',
          whoCanWatch: 'Some coding experience',
          cost: 'NA',
          content: 'Smart contract architecture and development with Github.',
          isFree: true,
          link: '/courses/blockchain-basics/advanced',
        },
        {
          name: 'Advanced',
          whoCanWatch: 'Experienced developers',
          cost: 'NA',
          content: 'Advanced smart contract security and best practices.',
          isFree: true,
          link: '/courses/blockchain-basics/advanced',
        },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center mb-8">Explore Our Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseCategories.map((course, index) => (
            <div key={index} className={`shadow-md p-6 rounded-lg ${course.color}`}>
              <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="space-y-4">
                {course.levels.map((level, levelIndex) => (
                  <div key={levelIndex} className="border-t pt-4">
                    <h3 className="text-lg font-semibold">{level.name}</h3>
                    <p className="text-sm text-gray-500">Who can watch: {level.whoCanWatch}</p>
                    <p className="text-sm text-gray-500">Cost: {level.cost}</p>
                    <p className="text-sm text-gray-500">Content: {level.content}</p>

                    {level.isFree ? (
                      <Link href= "/beginner" className="mt-2 inline-block bg-blue-500 text-white text-center py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200">
                        Enroll Now
                      </Link>
                    ) : (
                      <EnrollButton paymentAmount={level.paymentAmount} recipient={recipientAddress} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Become an Educator Section */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold mb-4">Become an Educator</h2>
          <p className="text-gray-600 mb-4">Join our platform and share your knowledge with the community.</p>
          <Link href="/educator" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
            Become an Educator
          </Link>
        </div>
      </div>
    </section>
  );
};

// EnrollButton Component
const EnrollButton: React.FC<EnrollButtonProps> = ({ paymentAmount, recipient }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handlePayment = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      setIsLoading(true);

      // Request user to connect MetaMask if not already connected
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const transactionParameters = {
        to: recipient, // The recipient's address
        value: ethers.parseUnits(paymentAmount), // Convert paymentAmount (ETH) to Wei
      };

      // Trigger the payment transaction through MetaMask
      const tx = await signer.sendTransaction(transactionParameters);

      await tx.wait(); // Wait for the transaction to be mined

      setIsSuccess(true);
      setError(null);
    } catch (err) {
      setError('Payment failed: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  } else {
    setError('MetaMask is not installed.');
  }
};


  return (
    <div className="mt-2">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="bg-purple-500 text-white py-1 px-3 rounded-md hover:bg-purple-600 transition duration-200"
      >
        {isLoading ? 'Processing...' : `Enroll Now (${paymentAmount} ETH)`}
      </button>
      {isSuccess && <p className="text-green-500 mt-1">Payment Successful!</p>}
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};


export default Courses;
