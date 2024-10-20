// src/components/IdentityPrompt.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const IdentityPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-10 right-10 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg animate-bounce z-50">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <h3 className="text-xl font-bold">Create Your On-Chain Identity</h3>
              <p className="text-sm mb-4">Secure your identity on the blockchain using BASE!</p>
              
            </div>
            <button
              onClick={handleClose}
              className="ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IdentityPrompt;