// src/components/ContributionLogger.tsx
'use client';

import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contributionTokenABI, contributionTokenAddress } from '../contracts/ContributionToken';
import { useAccount } from 'wagmi';

const ContributionLogger: React.FC = () => {
  const [hours, setHours] = useState(0);
  const { address, isConnected } = useAccount();

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: contributionTokenAddress,
    contractInterface: contributionTokenABI,
    functionName: 'mint',
    args: [address, hours * 100], // Example: 1 hour = 100 tokens
    enabled: isConnected && hours > 0,
  });

  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  const handleLog = () => {
    write?.();
  };

  return (
    <div className="p-6 bg-green-100 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Log Your Contribution Time</h3>
      {!isConnected ? (
        <p className="text-red-500">Please connect your wallet to log contributions.</p>
      ) : (
        <>
          <input
            type="number"
            placeholder="Hours Contributed"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            min="0"
          />
          <button
            onClick={handleLog}
            disabled={isLoading || !write}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            {isLoading ? 'Logging...' : 'Log Time & Mint Tokens'}
          </button>
          {isSuccess && <p className="text-green-500 mt-2">Tokens Minted Successfully!</p>}
          {(error || prepareError) && <p className="text-red-500 mt-2">{error?.message || prepareError.message}</p>}
        </>
      )}
    </div>
  );
};

export default ContributionLogger;
