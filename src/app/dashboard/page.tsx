'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Material {
  id: string;
  name: string;
  type: string;
  completed: boolean;
}

interface Level {
  id: string;
  name: string;
  materials: Material[];
}

interface Course {
  id: string;
  title: string;
  levels: Level[];
  color: string; // Added color property for visual distinction
}

const initialCourses: Course[] = [
  {
    id: 'blockchain-basics',
    title: 'Blockchain Basics',
    color: 'bg-blue-50', // Tailwind CSS background color
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        materials: [
          { id: 'bb1', name: 'Interactive Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'bb2', name: 'Introduction Video', type: 'Video', completed: false },
          { id: 'bb3', name: 'Basic Quiz', type: 'Quiz', completed: false },
          { id: 'bb4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        materials: [
          { id: 'bi1', name: 'Smart Contracts Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'bi2', name: 'Smart Contracts Video', type: 'Video', completed: false },
          { id: 'bi3', name: 'Intermediate Quiz', type: 'Quiz', completed: false },
          { id: 'bi4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'advanced',
        name: 'Advanced',
        materials: [
          { id: 'ba1', name: 'DeFi Protocols Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'ba2', name: 'DeFi Protocols Video', type: 'Video', completed: false },
          { id: 'ba3', name: 'Advanced Quiz', type: 'Quiz', completed: false },
          { id: 'ba4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
    ],
  },
  {
    id: 'decentralized-finance',
    title: 'Decentralized Finance (DeFi)',
    color: 'bg-green-50',
    levels: [
      {
        id: 'dfb1',
        name: 'Beginner',
        materials: [
          { id: 'dfb1', name: 'DeFi Basics Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'dfb2', name: 'DeFi Basics Video', type: 'Video', completed: false },
          { id: 'dfb3', name: 'DeFi Basics Quiz', type: 'Quiz', completed: false },
          { id: 'dfb4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        materials: [
          { id: 'dfi1', name: 'Liquidity Pools Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'dfi2', name: 'Liquidity Pools Video', type: 'Video', completed: false },
          { id: 'dfi3', name: 'Intermediate DeFi Quiz', type: 'Quiz', completed: false },
          { id: 'dfi4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'advanced',
        name: 'Advanced',
        materials: [
          { id: 'dfa1', name: 'Advanced DeFi Strategies Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'dfa2', name: 'Advanced DeFi Strategies Video', type: 'Video', completed: false },
          { id: 'dfa3', name: 'Advanced DeFi Quiz', type: 'Quiz', completed: false },
          { id: 'dfa4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
    ],
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contract Development',
    color: 'bg-yellow-50',
    levels: [
      {
        id: 'scb1',
        name: 'Beginner',
        materials: [
          { id: 'scb1', name: 'Solidity Basics Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'scb2', name: 'Solidity Basics Video', type: 'Video', completed: false },
          { id: 'scb3', name: 'Solidity Basics Quiz', type: 'Quiz', completed: false },
          { id: 'scb4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        materials: [
          { id: 'sci1', name: 'Smart Contract Architecture Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'sci2', name: 'Smart Contract Architecture Video', type: 'Video', completed: false },
          { id: 'sci3', name: 'Intermediate Solidity Quiz', type: 'Quiz', completed: false },
          { id: 'sci4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
      {
        id: 'advanced',
        name: 'Advanced',
        materials: [
          { id: 'sca1', name: 'Smart Contract Security Tutorial', type: 'Interactive Tutorial', completed: false },
          { id: 'sca2', name: 'Smart Contract Security Video', type: 'Video', completed: false },
          { id: 'sca3', name: 'Advanced Solidity Quiz', type: 'Quiz', completed: false },
          { id: 'sca4', name: 'GitHub Task', type: 'GitHub Task', completed: false },
        ],
      },
    ],
  },
];

const Dashboard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [courses, setCourses] = useState<Course[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<string | undefined>();

  useEffect(() => {
    if (address) {
      const storedCourses = localStorage.getItem(`courses_${address}`);
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        setCourses(initialCourses);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      localStorage.setItem(`courses_${address}`, JSON.stringify(courses));
    }
  }, [courses, address]);

  const handleMaterialToggle = (courseId: string, levelId: string, materialId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              levels: course.levels.map((level) =>
                level.id === levelId
                  ? {
                      ...level,
                      materials: level.materials.map((material) =>
                        material.id === materialId
                          ? { ...material, completed: !material.completed }
                          : material
                      ),
                    }
                  : level
              ),
            }
          : course
      )
    );
    toast.success('Material status updated!');
  };

  const isCourseCompleted = (course: Course) => {
    return course.levels.every((level) =>
      level.materials.every((material) => material.completed)
    );
  };

  // Smart Contract Details
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_LCERT!;
  const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI!);
  const metadataBaseURL = process.env.NEXT_PUBLIC_METADATA_BASE_URL!;

  const handleMintNFT = async (course: Course) => {
    if (!isCourseCompleted(course)) {
      toast.error('Please complete all materials before minting the NFT.');
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI);

      // Define the tokenURI based on the course. Ensure this URL is accessible and points to a valid JSON.
      const tokenURI = `${metadataBaseURL}${course.id}.json`;

      const tx = await contract.createCertificate(address, tokenURI);
      await tx.wait();

      toast.success('NFT Minted Successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(`Error Minting NFT: ${err.message}`);
    }
  };

  const handleEnroll = async () => {
    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      toast.error("Invalid payment amount.");
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(paymentAmount.toString()),
      });
      await tx.wait();
      toast.success("Transaction successful!");
    } catch (err: any) {
      toast.error(`Transaction failed: ${err.message}`);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {!isConnected ? (
        <p>Please connect your wallet to view your dashboard.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className={`p-4 rounded shadow ${course.color}`}>
              <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>

              {course.levels.map((level) => (
                <div key={level.id} className="mb-4">
                  <h3 className="text-xl font-medium mb-2">{level.name}</h3>

                  <ul>
                    {level.materials.map((material) => (
                      <li key={material.id} className="flex items-center justify-between mb-1">
                        <span>{material.name}</span>
                        <button
                          className={`px-2 py-1 text-white rounded ${material.completed ? 'bg-green-600' : 'bg-gray-400'}`}
                          onClick={() => handleMaterialToggle(course.id, level.id, material.id)}
                        >
                          {material.completed ? 'Completed' : 'Incomplete'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <button
                onClick={() => handleMintNFT(course)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Mint NFT
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;






