// src/components/UserCertificates.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { learningCertificateABI, learningCertificateAddress } from '../contracts/LearningCertificate';
import Image from 'next/image';
import { ethers } from 'ethers';

interface CertificateMetadata {
  name: string;
  description: string;
  image: string;
  // Additional fields as per your metadata
}

const UserCertificates: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [certificates, setCertificates] = useState<CertificateMetadata[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!isConnected || !address) return;

      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const contract = new ethers.Contract(learningCertificateAddress, learningCertificateABI, provider);

      try {
        // Fetch total number of certificates minted
        const totalCertificates = await contract.tokenCounter();

        const fetchedCertificates: CertificateMetadata[] = [];

        for (let tokenId = 1; tokenId < totalCertificates; tokenId++) {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() === address.toLowerCase()) {
            const tokenURI = await contract.tokenURI(tokenId);
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            fetchedCertificates.push(metadata);
          }
        }

        setCertificates(fetchedCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, [isConnected, address]);

  if (!isConnected) {
    return <p className="text-center">Connect your wallet to view your certificates.</p>;
  }

  if (certificates.length === 0) {
    return <p className="text-center">You have no certificates yet.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Your Certificates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow">
            <Image src={cert.image} alt={cert.name} width={300} height={200} className="rounded-md" />
            <h4 className="text-lg font-semibold mt-2">{cert.name}</h4>
            <p className="text-gray-600">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCertificates;
