// src/app/learn/page.tsx
'use client'; // Ensure this is a Client Component

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBook, FaVideo, FaChartBar, FaPlus, FaMinus } from 'react-icons/fa';
import { ethers } from 'ethers';

interface Tutorial {
  title: string;
  description: string;
  image: string; // Path to image (e.g., '/images/tutorial1.jpg')
}

interface Video {
  title: string;
  description: string;
  videoUrl: string; // Embed URL (e.g., YouTube)
  thumbnail: string; // Path to thumbnail image
}

interface Infographic {
  title: string;
  description: string;
  image: string; // Path to infographic image
}

interface FAQItem {
  question: string;
  answer: string;
}

const LearnPage: React.FC = () => {
  // State for FAQ toggle
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Toggle FAQ visibility
  const toggleFAQ = (index: number) => {
    if (activeFAQ === index) {
      setActiveFAQ(null);
    } else {
      setActiveFAQ(index);
    }
  };

  // Sample Data for Tutorials
  const tutorials: Tutorial[] = [
    {
      title: 'Getting Started with Blockchain',
      description:
        'Learn the fundamentals of blockchain technology, including how it works and its various applications.',
      image: '/images/tutorial1.jpg',
    },
    {
      title: 'Smart Contracts 101',
      description:
        'Understand what smart contracts are, how they function, and their role in decentralized applications.',
      image: '/images/tutorial2.jpg',
    },
    // Add more tutorials as needed
  ];

  // Sample Data for Videos
  const videos: Video[] = [
    {
      title: 'Introduction to Web3',
      description:
        'A comprehensive introduction to Web3, exploring its principles and how it differs from traditional web paradigms.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URLs
      thumbnail: '/images/video1.jpg',
    },
    {
      title: 'Building Decentralized Applications',
      description:
        'Learn how to build decentralized applications (dApps) using popular blockchain platforms and tools.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/video2.jpg',
    },
    // Add more videos as needed
  ];

  // Sample Data for Infographics
  const infographics: Infographic[] = [
    {
      title: 'Blockchain Benefits',
      description:
        'Visual breakdown of how blockchain technology benefits various industries and communities.',
      image: '/images/infographic1.jpg',
    },
    {
      title: 'Decentralized Finance (DeFi)',
      description:
        'An infographic explaining the fundamentals of DeFi and its impact on traditional financial systems.',
      image: '/images/infographic2.jpg',
    },
    // Add more infographics as needed
  ];

  // Sample Data for FAQs
  const faqs: FAQItem[] = [
    {
      question: 'What is Web3?',
      answer:
        'Web3 is the next generation of the internet, leveraging blockchain technology to create decentralized applications (dApps) that empower users with greater control over their data and digital assets.',
    },
    {
      question: 'How can I get started with Web3?',
      answer:
        'Start by learning the basics of blockchain technology, create a cryptocurrency wallet, and engage with dApps to understand how decentralized systems operate.',
    },
    {
      question: 'What are the benefits of using CommunityWallet?',
      answer:
        'CommunityWallet offers seamless wallet integration, access to educational resources, and tools to manage your digital assets efficiently and securely.',
    },
    // Add more FAQs as needed
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlock the World of Web3</h1>
          <p className="text-lg md:text-xl mb-8">
            Dive into interactive tutorials, insightful videos, and engaging infographics to master blockchain technology.
          </p>
          <Link
            href="#education"
            className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-200"
          >
            You are enrolled for Beginner course
          </Link>
        </div>
      </section>

      {/* Interactive Tutorials Section */}
      <section id="education" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Interactive Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-md shadow-md hover:bg-blue-100 transition duration-200"
              >
                <div className="flex items-center justify-center mb-4">
                  <FaBook className="text-blue-500 text-3xl" />
                </div>
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600">{tutorial.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Video Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-md shadow-md hover:shadow-lg transition duration-200"
              >
                <div className="flex items-center justify-center mb-4">
                  <FaVideo className="text-green-500 text-3xl" />
                </div>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infographics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Infographics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infographics.map((infographic, index) => (
              <div
                key={index}
                className="bg-yellow-50 p-6 rounded-md shadow-md hover:bg-yellow-100 transition duration-200"
              >
                <div className="flex items-center justify-center mb-4">
                  <FaChartBar className="text-yellow-500 text-3xl" />
                </div>
                <Image
                  src={infographic.image}
                  alt={infographic.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{infographic.title}</h3>
                <p className="text-gray-600">{infographic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Extra) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <button
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-xl">
                    {activeFAQ === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                {activeFAQ === index && (
                  <p id={`faq-answer-${index}`} className="mt-2 text-gray-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated with the Latest in Web3</h3>
          <p className="text-gray-700 mb-6">
            Subscribe to our newsletter to receive the latest tutorials, videos, and insights directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EduFi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnPage;



