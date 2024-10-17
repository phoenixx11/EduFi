// src/components/MintCertificate.tsx
'use client';

import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { learningCertificateABI, learningCertificateAddress } from '../contracts/LearningCertificate';
import { useAccount } from 'wagmi';

const MintCertificate: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const { address, isConnected } = useAccount();

  // Check if the connected user has MINTER_ROLE
  // This requires a contract call; assuming a function hasRole exists
  // You may need to implement a public hasRole function in the contract

  // For simplicity, this example assumes the connected user is an admin
  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: learningCertificateAddress,
    contractInterface: learningCertificateABI,
    functionName: 'createCertificate',
    args: [recipient, tokenURI],
    enabled: isConnected && recipient !== '' && tokenURI !== '',
  });

  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  const handleMint = () => {
    write?.();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Mint Learning Certificate</h3>
      {!isConnected ? (
        <p className="text-red-500">Please connect your wallet as an admin to mint certificates.</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="text"
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={handleMint}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isLoading ? 'Minting...' : 'Mint Certificate'}
          </button>
          {isSuccess && <p className="text-green-500 mt-2">Certificate Minted Successfully!</p>}
          {(error || prepareError) && <p className="text-red-500 mt-2">{error?.message || prepareError.message}</p>}
        </>
      )}
    </div>
  );
};

export default MintCertificate;
